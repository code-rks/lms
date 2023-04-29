import * as moment from 'moment';
import { LeadDTO } from '../DTO/LeadDTO';
import { ILead } from '../interface/ILead';
import { transformParentDtoToInterface } from './parent.transform';
import { transformVisitDtoToInterface } from './visit.transform';

export function transformLeadDtoToInterface(dto: LeadDTO): ILead {
  return {
    firstName: dto.firstName,
    middleName: dto.middleName,
    lastName: dto.lastName,
    class: dto.class,
    dateOfBirth: moment(dto.dateOfBirth, 'DD-MM-YYYY')
      .utcOffset(0, true)
      .toDate(),
    residentialAddress: dto.residentialAddress,
    father: transformParentDtoToInterface(dto.father),
    mother: transformParentDtoToInterface(dto.mother),
    leadSource: dto.leadSource,
    notes: dto.notes,
    status: dto.status,
    createdBy: dto.createdBy,
    visits: dto.visits.map((v) => transformVisitDtoToInterface(v)),
  };
}
