import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { IStudent } from './interface/IStudent';

@Controller('student')
export class StudentController {
  constructor(private service: StudentService) {}
  @Get('/ready')
  async isReady(): Promise<any> {
    return {
      msg: this.service.isReady(),
    };
  }

  @Get('/all')
  async listAllStudents(): Promise<IStudent[]> {
    const students = await this.service.listStudents();
    return students;
  }

  @Get()
  async getStudent(@Param('studentId') studentId: string): Promise<IStudent> {
    const student = await this.service.getStudent(studentId);
    return student;
  }

  @Post()
  async createStudent(@Body() student: IStudent): Promise<IStudent> {
    const savedStudent = await this.service.createStudent(student);
    return savedStudent;
  }
}
