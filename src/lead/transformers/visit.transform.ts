import { VisitDTO } from '../DTO/LeadDTO';
import { IVisit } from '../interface/ILead';

export function transformVisitDtoToInterface(dto: VisitDTO): IVisit {
  return {
    visitDate: dto.visitDate,
    notes: dto.notes,
    addressedBy: dto.addresedBy,
  };
}
