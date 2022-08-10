import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'auth/dto';
import { JwtPayload, Tokens } from 'auth/types';
import {
  argon,
  deSearalizeUser,
  deSearalizeUsers,
  generatePassword,
  searalizeUser,
  throwForbiddenException,
  ENV
} from 'core/constant';
import { LawyerTeam, User } from 'core/entities';
import { ROLE, STATUS } from 'core/enums';
import { BaseService, CoreService } from 'core/service';
import { any } from 'joi';
import { CreateLawyerTeamDto } from './dto/lawyer-team.dto';

@Injectable()
export class LawyerTeamService extends BaseService {
  constructor(
    private _jwt: JwtService,
  ) {
    super()
  }
  async create(data: CreateLawyerTeamDto, user: JwtPayload) {
    const existUser = await this.repos.user.findOneBy({ email: data.email });
    throwForbiddenException(existUser);
    // TODO:fix this later
    // const lawyer = await this.repos.lawyer.findOneBy({id: data.lawyerId})
    // throwForbiddenException(!lawyer)
    // data.lawyerId = lawyer.id
    const lawyerTeam: LawyerTeam = { 
      lawyerId:user.sub,
      responsibility: data.responsibility,
      timing: data.timing,
      amount: data.amount,
      user: searalizeUser(data, ROLE.TEAM, STATUS.ACTIVE)
    };

    // TODO: WORK HERE SET RANDOM PASSWORD
    const password = await generatePassword();
    const hashResult = await argon.hash(password);
    lawyerTeam.user.password = hashResult;

    try{
      const create = await this.repos.lawyerTeam.create({ ...lawyerTeam });
      // const result = await this.repos.lawyerTeam.save(create).catch((error) => 
      const result: any = await this.repos.lawyerTeam.save(create).then(deSearalizeUser).catch((error) =>{
        console.log({ db_error: error });
        throw new ForbiddenException('Credentials incorrect');
      });    
      await this.mail.teamAccountByLawyer({
        to:result?.email,
        name:result?.name,
        password,
        lawyer:user.name//lawyer?.user?.name,
      })
        // const {email, id, name} =  lawyer.user
        return result 
      

    } catch(e){
      // TODO: ROLED BACK TRANSACTION

    }
    // try{
    //   const lawyer = this.repos.lawyer.create(lawyerResult);
    //   await this.repos.lawyer.save(lawyer)
    //   await this.mail.lawyerAccount({to: data.email, name: data.name})
    //   const {email, id, name} =  lawyer.user
    //   return {email, id, name} 
    //   // return this.returnGeneratedToken(lawyer.user);
    // } catch(e){
    //     // TODO: if mail doesn't sent then drop the data maybe
    // }

  }

  // TODO: NOT WORK CHEQUE THE QUERY BUILDER DOCS
  getLawyerMembers(lawyerId) {
    console.log({ lawyerId });

    return this.repos.lawyerTeam
      .findBy({ lawyerId })
      .then((x) => deSearalizeUsers(x));
  }

  // TODO: NOT WORK CHEQUE THE QUERY BUILDER DOCS
  getLawyerMember(lawyerId, id) {
    return this.repos.lawyerTeam
      .createQueryBuilder('l')
      .where({
        lawyerId,
        id,
      })
      .getOne()
      .then((x) => deSearalizeUser(x));
  }
  // TODO: NOT WORK CHEQUE THE QUERY BUILDER DOCS
  deleteLawyerMember(lawyerId, id) {
    return this.repos.lawyerTeam
      .createQueryBuilder('l')
      .delete()
      .where('id = :id AND lawyerId = :lawyerId', { id, lawyerId });
  }


}
