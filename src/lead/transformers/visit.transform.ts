import { VisitDTO } from '../DTO/LeadDTO';
import { IVisit } from '../interface/ILead';
import { v4 as uuidv4 } from 'uuid';

export function transformVisitDtoToInterface(dto: VisitDTO): IVisit {
  return {
    visitId: dto.visitId ?? uuidv4(),
    visitDate: dto.visitDate,
    notes: dto.notes,
    addressedBy: dto.addressedBy,
  };
}
