import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lead, LeadDocument } from './lead.schema';
import { Model, PaginateModel, PaginateResult } from 'mongoose';
import { ILeadRepository } from 'src/lead/interface/ILeadRepository';
import { ILead, IVisit } from 'src/lead/interface/ILead';
import { CLASS } from 'src/common/types';
import { IPaginate } from 'src/common/interface/IPaginate';
import { extractMetaInfoFromPaginateModel } from '../utils';

@Injectable()
export class MongoLeadRepository implements ILeadRepository {
  constructor(
    @InjectModel(Lead.name) private model: Model<LeadDocument>,
    @InjectModel(Lead.name) private paginateModel: PaginateModel<LeadDocument>,
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

  async listPaginatedLeads(
    pageNumber: number,
    pageSize: number,
  ): Promise<IPaginate<ILead>> {
    const leads = await this.paginateModel.paginate(
      {},
      { useEstimatedCount: true, limit: pageSize, page: pageNumber },
    );
    return await this.transformFromPaginatedModel(leads);
  }

  async updateLead(leadId: string, lead: Partial<ILead>): Promise<ILead> {
    const updatedDocument = await this.model.findOneAndUpdate(
      { leadId: leadId },
      { ...lead },
      { new: true },
    );
    return await this.transformFromModel(updatedDocument);
  }

  async createVisit(leadId: string, visit: IVisit): Promise<IVisit> {
    const savedDocument = await this.model.findOneAndUpdate(
      { leadId: leadId },
      { $push: { visits: visit } },
      { new: true },
    );
    return savedDocument.visits[savedDocument.visits.length - 1];
  }

  async updateVisit(
    leadId: string,
    visitId: string,
    visit: Partial<IVisit>,
  ): Promise<IVisit> {
    await this.model.findOneAndUpdate(
      { leadId: leadId, 'visits.visitId': visitId },
      { $set: { 'visits.$': { ...visit } } },
      { new: true },
    );
    return this.getVisit(visitId);
  }

  async deleteVisit(leadId: string, visitId: string): Promise<IVisit[]> {
    const updatedLead = await this.model.findOneAndUpdate(
      { leadId: leadId },
      { $pull: { visits: { visitId: visitId } } },
      { new: true },
    );
    return updatedLead.visits;
  }

  async getVisits(leadId: string): Promise<IVisit[]> {
    const visits = await this.model.findOne({ leadId: leadId }, { visits: 1 });
    return visits.visits;
  }

  async getVisit(visitId: string): Promise<IVisit> {
    const visits = await this.model.findOne(
      { 'visits.visitId': visitId },
      { 'visits.$': 1 },
    );
    return visits.visits[0];
  }

  async transformFromPaginatedModel(
    model: PaginateResult<LeadDocument>,
  ): Promise<IPaginate<ILead>> {
    return {
      docs: await this.transformFromArrayModel(model.docs),
      meta: extractMetaInfoFromPaginateModel(model),
    };
  }

  async transformToModel(lead: ILead): Promise<LeadDocument> {
    return await this.model.create({
      leadId: lead.leadId,
      firstName: lead.firstName,
      middleName: lead.middleName,
      lastName: lead.lastName,
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
      leadId: lead?.leadId,
      firstName: lead?.firstName,
      middleName: lead?.middleName,
      lastName: lead?.lastName,
      class: CLASS[lead?.class],
      dateOfBirth: lead?.dateOfBirth,
      residentialAddress: lead?.residentialAddress,
      father: lead?.father,
      mother: lead?.mother,
      leadSource: lead?.leadSource,
      notes: lead?.notes,
      status: lead?.status,
      studentId: lead?.studentId,
      createdBy: lead?.createdBy,
      visits: lead?.visits,
    };
  }

  async transformFromArrayModel(leads: LeadDocument[]): Promise<ILead[]> {
    return Promise.all(
      leads.map(async (lead) => await this.transformFromModel(lead)),
    );
  }
}
