import { Inject, Injectable } from '@nestjs/common';
import { ILeadRepository } from './interface/ILeadRepository';
import { ILead, IVisit } from './interface/ILead';
import { v4 as uuidv4 } from 'uuid';
import { IPaginate } from 'src/common/interface/IPaginate';
import { LeadDTO, VisitDTO } from './DTO/LeadDTO';
import { transformLeadDtoToInterface } from './transformers/lead.transform';
import { UpdateLeadDTO } from './DTO/UpdateLeadDTO';
import { transformVisitDtoToInterface } from './transformers/visit.transform';

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

  updateLead = async (leadId: string, lead: UpdateLeadDTO): Promise<ILead> => {
    return await this.repository.updateLead(leadId, { ...lead });
  };

  createVisit = async (leadId: string, visit: VisitDTO): Promise<IVisit> => {
    const visitToSave = transformVisitDtoToInterface(visit);
    return await this.repository.createVisit(leadId, visitToSave);
  };

  deleteVisit = async (leadId: string, visitId: string): Promise<IVisit[]> => {
    return await this.repository.deleteVisit(leadId, visitId);
  };

  getVisits = async (leadId: string): Promise<IVisit[]> => {
    return await this.repository.getVisits(leadId);
  };

  getVisit = async (visitId: string): Promise<IVisit> => {
    return await this.repository.getVisit(visitId);
  };

  updateVisit = async (
    leadId: string,
    visitId: string,
    visit: Partial<IVisit>,
  ) => {
    return await this.repository.updateVisit(leadId, visitId, visit);
  };
}
