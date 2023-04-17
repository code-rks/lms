import { IStudent } from './IStudent';

export interface IStudentRepository {
  createStudent(student: IStudent): Promise<IStudent>;
  listStudents(): Promise<IStudent[]>;
  getStudent(studentId: string): Promise<IStudent>;
}

export const IStudentRepository = Symbol('IStudentRepository');
