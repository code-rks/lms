import { BLOOD_GROUP, CLASS, GENDER, SECTION } from 'src/common/types';
import { IParent } from 'src/lead/interface/IParent';

export interface IStudent {
  studentId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  class: CLASS;
  section: SECTION;
  dateOfBirth: Date;
  ageAsOnJoining: string;
  gender: GENDER;
  bloodGroup: BLOOD_GROUP;
  residentialAddress: string;
  father: IParent;
  mother: IParent;
  isTncAccepted: boolean;
  leadId: string;
  userId: string;
}
