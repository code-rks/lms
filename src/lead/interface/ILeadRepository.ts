import { IPaginate } from 'src/common/interface/IPaginate';
import { ILead, IVisit } from './ILead';

export interface ILeadRepository {
  createLead(lead: ILead): Promise<ILead>;
  listLeads(): Promise<ILead[]>;
  listPaginatedLeads(
    pageNumber: number,
    pageSize: number,
  ): Promise<IPaginate<ILead>>;
  getLead(leadId: string): Promise<ILead>;
  updateLead(leadId: string, lead: Partial<ILead>): Promise<ILead>;
  createVisit(leadId: string, visit: IVisit): Promise<IVisit>;
  updateVisit(
    leadId: string,
    visitId: string,
    visit: Partial<IVisit>,
  ): Promise<IVisit>;
  deleteVisit(leadId: string, visitId: string): Promise<IVisit[]>;
  getVisits(leadId: string): Promise<IVisit[]>;
  getVisit(visitId: string): Promise<IVisit>;
}

export const ILeadRepository = Symbol('ILeadRepository');
