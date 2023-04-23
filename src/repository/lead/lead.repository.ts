import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lead, LeadDocument } from './lead.schema';
import { Model, PaginateModel, PaginateResult } from 'mongoose';
import { ILeadRepository } from 'src/lead/interface/ILeadRepository';
import { ILead } from 'src/lead/interface/ILead';
import { CLASS } from 'src/common/types';
import { IPaginate } from 'src/common/interface/IPaginate';
import { extractMetaInfoFromPaginateModel } from '../utils';

@Injectable()
export class MongoLeadRepository implements ILeadRepository {
  constructor(
    @InjectModel(Lead.name) private model: Model<LeadDocument>, 
    @InjectModel(Lead.name) private paginateModel: PaginateModel<LeadDocument>
  ) {}

  async createLead(lead: ILead): Promise<ILead> {
    const document = await this.transformToModel(lead);
    const savedDocument = await document.save();
    return await this.transformFromModel(savedDocument);
  }
  async listLeads(): Promise<ILead[]> {
    const leads = await this.model.find().lean();
    return await this.transformFromArrayModel(leads);
  }

  async getLead(leadId: string): Promise<ILead> {
    const lead = await this.model.findOne({ leadId: leadId }).lean();
    return await this.transformFromModel(lead);
  }

  async listPaginatedLeads(pageNumber: number, pageSize: number): Promise<IPaginate<ILead>> {
    const leads = await this.paginateModel.paginate({}, { useEstimatedCount: true, limit: pageSize, page: pageNumber})
    return await this.transformFromPaginatedModel(leads);
  }

  async transformFromPaginatedModel(model: PaginateResult<LeadDocument>): Promise<IPaginate<ILead>>{
    return {
      docs: await this.transformFromArrayModel(model.docs),
      meta: extractMetaInfoFromPaginateModel(model),
    }
  }

  async transformToModel(lead: ILead): Promise<LeadDocument> {
    return await this.model.create({
      leadId: lead.leadId,
      name: lead.name,
      class: lead.class,
      dateOfBirth: lead.dateOfBirth,
      residentialAddress: lead.residentialAddress,
      father: lead.father,
      mother: lead.mother,
      leadSource: lead.leadSource,
      notes: lead.notes,
      status: lead.status,
      studentId: lead.studentId,
      createdBy: lead.createdBy,
      visits: lead.visits,
    });
  }

  async transformFromModel(lead: LeadDocument): Promise<ILead> {
    return {
      leadId: lead.leadId,
      name: lead.name,
      class: CLASS[lead.class],
      dateOfBirth: lead.dateOfBirth,
      residentialAddress: lead.residentialAddress,
      father: lead.father,
      mother: lead.mother,
      leadSource: lead.leadSource,
      notes: lead.notes,
      status: lead.status,
      studentId: lead.studentId,
      createdBy: lead.createdBy,
      visits: lead.visits,
    };
  }

  async transformFromArrayModel(leads: LeadDocument[]): Promise<ILead[]> {
    return Promise.all(
      leads.map(async (lead) => await this.transformFromModel(lead)),
    );
  }
}
