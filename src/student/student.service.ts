import { Inject, Injectable } from '@nestjs/common';
import { IStudentRepository } from './interface/IStudentRepository';
import { v4 as uuidv4 } from 'uuid';
import { IStudent } from './interface/IStudent';

@Injectable()
export class StudentService {
  constructor(
    @Inject(IStudentRepository)
    private repository: IStudentRepository,
  ) {}

  isReady = (): string => {
    return 'Student module is ready';
  };

  createStudent = async (student: IStudent): Promise<IStudent> => {
    student.studentId = uuidv4();
    return await this.repository.createStudent(student);
  };

  listStudents = async (): Promise<IStudent[]> => {
    return await this.repository.listStudents();
  };

  getStudent = async (studentId: string): Promise<IStudent> => {
    return await this.repository.getStudent(studentId);
  };
}
