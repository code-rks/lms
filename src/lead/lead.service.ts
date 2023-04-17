import { Inject, Injectable } from '@nestjs/common';
import { ILeadRepository } from './interface/ILeadRepository';
import { ILead } from './interface/ILead';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LeadService {
  constructor(
    @Inject(ILeadRepository)
    private repository: ILeadRepository,
  ) {}

  isReady = (): string => {
    return 'Lead module is ready';
  };

  createLead = async (lead: ILead): Promise<ILead> => {
    lead.leadId = uuidv4();
    return await this.repository.createLead(lead);
  };

  listLeads = async (): Promise<ILead[]> => {
    return await this.repository.listLeads();
  };

  getLead = async (leadId: string): Promise<ILead> => {
    return await this.repository.getLead(leadId);
  };
}
