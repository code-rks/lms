import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
export type LeadDocument = Lead & Document;

export class Visit {
  @Prop({ required: true, unique: true })
  visitId: string;

  @Prop({ required: true })
  visitDate: Date; //timstamp

  @Prop({ required: true })
  notes: string;

  @Prop()
  addressedBy: string; // Possibility link with Masters
}

export class Parent {
  @Prop({ required: true })
  name: string; //required

  @Prop()
  emailId: string; //

  @Prop({ required: true })
  contactNumber: string;

  @Prop()
  occupation: string;
}

@Schema({ collection: 'lead', timestamps: true })
export class Lead {
  // Student Properties
  @Prop({ index: true, unique: true, required: true })
  leadId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  middleName: string;

  @Prop()
  lastName: string;

  @Prop({
    type: String,
    enum: ['PLAYGROUND', 'NURSERY', 'JUNIOR_KG', 'SENIOR_KG'],
    required: true,
  })
  class: string; // required enum Playgroup Nursery Junior KG Senior KG

  @Prop({ type: Date, required: true, trim: true })
  dateOfBirth: Date; // date DD-MM-YYYY

  @Prop()
  residentialAddress: string;

  @Prop({ required: true })
  father: Parent;

  @Prop({ required: true })
  mother: Parent;

  @Prop()
  leadSource: string;

  @Prop()
  notes: string;

  @Prop()
  visits: Visit[];

  @Prop()
  status: string; // enum ?? ALso how to handle duplication

  // Meta Info
  @Prop()
  studentId: string; //To be referenced with lead collection

  @Prop()
  createdBy: string; // Parent email or admin email
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
LeadSchema.plugin(paginate);
