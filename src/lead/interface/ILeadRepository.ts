import { ILead } from './ILead';

export interface ILeadRepository {
  createLead(lead: ILead): Promise<ILead>;
  listLeads(): Promise<ILead[]>;
  getLead(leadId: string): Promise<ILead>;
}

export const ILeadRepository = Symbol('ILeadRepository');
