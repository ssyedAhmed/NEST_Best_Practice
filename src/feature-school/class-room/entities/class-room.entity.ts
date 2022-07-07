import { ApiProperty } from "@nestjs/swagger";
import { BaseModel } from "core/BaseModel";
import { Subject } from "feature-school/subject/entities/subject.entity";
import { Teacher } from "feature-school/teacher/entities/teacher.entity";
import { Entity, Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class ClassRoom extends BaseModel {

  @ApiProperty()
  @Column({ nullable: false, length: 40 })
  classCode: string

  @ApiProperty()
  @Column({ })
  dateFrom: Date

  @ApiProperty()
  @Column({ })
  dateTo: Date

  @ManyToOne(() => Teacher, (a) => a.class,{
    eager: true
  })
  teacher: Teacher

  @ApiProperty()
  @Column({nullable: true})
  teacherId: number;

  // @ManyToMany(() => Student, (a) => a.id, {
  //   cascade: true,
  //   // eager: true,
  // })
  // @JoinTable({
  //   name: 'class_student', 
  //   // joinColumn: {name: 'studentId'}
  // })
  // students: Student[]

  @ManyToOne(() => Subject, (a) => a.class, {
    eager: true,
  })
  subject: Subject

  @ApiProperty()
  @Column({nullable: true})
  subjectId: number;
}