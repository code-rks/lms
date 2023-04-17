import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type StudentDocument = Student & Document;

export class Parent {
  @Prop({ required: true })
  name: string; //required

  @Prop()
  emailId: string; //

  @Prop()
  contactNumber: string;

  @Prop()
  occupation: string;
}

@Schema({ collection: 'student', timestamps: true })
export class Student {
  // Student Properties
  @Prop({ index: true, unique: true })
  studentId: string; // required, unique, index

  @Prop({ index: true })
  firstName: string; //required

  @Prop()
  middleName: string; // ??

  @Prop()
  lastName: string; // ?

  @Prop({
    type: String,
    enum: ['PLAYGROUND', 'NURSERY', 'JUNIOR_KG', 'SENIOR_KG'],
    required: true,
  })
  class: string; // required enum Playgroup Nursery Junior KG Senior KG

  @Prop({
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    required: true,
  })
  section: string; //required enum A,B,C //dynamic?

  @Prop({ type: Date, required: true, trim: true })
  dateOfBirth: Date; // date DD-MM-YYYY

  @Prop()
  ageAsOnJoining: string; // Auto calculated based on dateOfbirth and school start date For now school start date will be constant

  @Prop({
    type: String,
    enum: ['MALE', 'FEMALE'],
    required: true,
  })
  gender: string; //enum

  @Prop({
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'AB+', 'AB-'],
  })
  bloodGroup: string; //enum

  @Prop()
  residentialAddress: string;

  @Prop()
  father: Parent;

  @Prop()
  mother: Parent;

  @Prop()
  isTncAccepted: boolean;

  // Meta Info
  @Prop()
  leadId: string; //To be referenced with lead collection

  @Prop()
  userId: string; //To be referenced with auth collection
}

export const StudentSchema = SchemaFactory.createForClass(Student);
