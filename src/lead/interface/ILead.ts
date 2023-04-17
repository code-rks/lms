import { CLASS } from 'src/common/types';
import { IParent } from './IParent';

export interface ILead {
  leadId: string;
  name: string;
  class: CLASS;
  dateOfBirth: Date;
  residentialAddress: string;
  father: IParent;
  mother: IParent;
  leadSource: string;
  notes: string;
  status: string;
  studentId: string;
  createdBy: string;
  visits: IVisit[];
}

export interface IVisit {
  visitDate: Date;
  notes: string;
  addressedBy: string;
}