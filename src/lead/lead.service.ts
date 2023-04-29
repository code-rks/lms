import { Inject, Injectable } from '@nestjs/common';
import { ILeadRepository } from './interface/ILeadRepository';
import { ILead } from './interface/ILead';
import { v4 as uuidv4 } from 'uuid';
import { IPaginate } from 'src/common/interface/IPaginate';
import { LeadDTO } from './DTO/LeadDTO';
import { transformLeadDtoToInterface } from './transformers/lead.transform';

@Injectable()
export class LeadService {
  constructor(
    @Inject(ILeadRepository)
    private repository: ILeadRepository,
  ) {}

  isReady = (): string => {
    return 'Lead module is ready';
  };

  createLead = async (lead: LeadDTO): Promise<ILead> => {
    const leadToSave = transformLeadDtoToInterface(lead);
    leadToSave.leadId = uuidv4();
    return await this.repository.createLead(leadToSave);
  };

  listLeads = async (): Promise<ILead[]> => {
    return await this.repository.listLeads();
  };

  listPaginatedLeads = async (
    pageNumber: number,
    pageSize: number,
  ): Promise<IPaginate<ILead>> => {
    return await this.repository.listPaginatedLeads(pageNumber, pageSize);
  };

  getLead = async (leadId: string): Promise<ILead> => {
    return await this.repository.getLead(leadId);
  };
}
