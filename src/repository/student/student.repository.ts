import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILead } from 'src/lead/interface/ILead';
import { BLOOD_GROUP, CLASS, GENDER, SECTION } from 'src/common/types';
import { IStudentRepository } from 'src/student/interface/IStudentRepository';
import { Student, StudentDocument } from './student.schema';
import { IStudent } from 'src/student/interface/IStudent';

@Injectable()
export class MongoStudentRepository implements IStudentRepository {
  constructor(
    @InjectModel(Student.name) private model: Model<StudentDocument>,
  ) {}

  async createStudent(student: IStudent): Promise<IStudent> {
    const document = await this.transformStudentToModel(student);
    const savedDocument = await document.save();
    return await this.transformModelToStudent(savedDocument);
  }
  async listStudents(): Promise<IStudent[]> {
    const students = await this.model.find().lean();
    return await this.transformArrayModelToStudent(students);
  }

  async getStudent(studentId: string): Promise<IStudent> {
    const students = await this.model.findOne({ studentId: studentId }).lean();
    return await this.transformModelToStudent(students);
  }

  async transformStudentToModel(student: IStudent): Promise<StudentDocument> {
    return await this.model.create({
      studentId: student.studentId,
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      class: student.class,
      section: student.section,
      dateOfBirth: student.dateOfBirth,
      ageAsOnJoining: student.ageAsOnJoining,
      gender: student.gender,
      bloodGroup: student.bloodGroup,
      residentialAddress: student.residentialAddress,
      father: student.father,
      mother: student.mother,
      isTncAccepted: student.isTncAccepted,
      leadId: student.leadId,
      userId: student.userId,
    });
  }

  async transformModelToStudent(student: StudentDocument): Promise<IStudent> {
    return {
      studentId: student.studentId,
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      class: CLASS[student.class],
      section: SECTION[student.section],
      dateOfBirth: student.dateOfBirth,
      ageAsOnJoining: student.ageAsOnJoining,
      gender: GENDER[student.gender],
      bloodGroup: BLOOD_GROUP[student.bloodGroup],
      residentialAddress: student.residentialAddress,
      father: student.father,
      mother: student.mother,
      isTncAccepted: student.isTncAccepted,
      leadId: student.leadId,
      userId: student.userId,
    };
  }

  async transformArrayModelToStudent(
    students: StudentDocument[],
  ): Promise<IStudent[]> {
    return Promise.all(
      students.map(
        async (student) => await this.transformModelToStudent(student),
      ),
    );
  }
}
