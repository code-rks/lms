import { ParentDTO } from '../DTO/LeadDTO';
import { IParent } from '../interface/IParent';

export function transformParentDtoToInterface(dto: ParentDTO): IParent {
  return {
    name: dto.name,
    emailId: dto.emailId,
    contactNumber: dto.contactNumber,
    occupation: dto.occupation,
  };
}
