import { ForbiddenException } from '@nestjs/common';
import { User } from 'core/entities';
import { ROLE, STATUS } from 'core/enums';

export const searalizeUser = (d: any, role: ROLE, status: STATUS) => {
  const user: User = {
    email: d.email,
    name: d.name,
    gender: d.gender,
    mobile: d.mobile,
    role,
    status,
    password: '',
    cityId: d.cityId,
    image: d.image,
    address: d.address,
  };
  return user;
};

export const deSearalizeUser = (d: any) => {
  return {
    ...d,
    ...d.user,
  };
};

export const deSearalizeUsers = (d: any[]) => {
  d.map((y) => ({
    ...y,
    ...y.user,
  }));
};

export const throwForbiddenException = (data) => {
  if (data) throw new ForbiddenException('Email Address already exsit');
};

export const generatePassword = () => {
  let result = '';
  const characters =
    '!@#~%^&*()_+}{":ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
