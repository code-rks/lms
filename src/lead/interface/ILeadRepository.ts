import { IPaginate } from 'src/common/interface/IPaginate';
import { ILead } from './ILead';

export interface ILeadRepository {
  createLead(lead: ILead): Promise<ILead>;
  listLeads(): Promise<ILead[]>;
  listPaginatedLeads(
    pageNumber: number,
    pageSize: number,
  ): Promise<IPaginate<ILead>>;
  getLead(leadId: string): Promise<ILead>;
  updateLead(leadId: string, lead: Partial<ILead>): Promise<ILead>;
}

export const ILeadRepository = Symbol('ILeadRepository');
