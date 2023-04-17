import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lead, LeadDocument } from './lead.schema';
import { Model } from 'mongoose';
import { ILeadRepository } from 'src/lead/interface/ILeadRepository';
import { ILead } from 'src/lead/interface/ILead';
import { CLASS } from 'src/common/types';

@Injectable()
export class MongoLeadRepository implements ILeadRepository {
  constructor(@InjectModel(Lead.name) private model: Model<LeadDocument>) {}
  async createLead(lead: ILead): Promise<ILead> {
    const document = await this.transformLeadToModel(lead);
    const savedDocument = await document.save();
    return await this.transformModelToLead(savedDocument);
  }
  async listLeads(): Promise<ILead[]> {
    const leads = await this.model.find().lean();
    return await this.transformArrayModelToLead(leads);
  }

  async getLead(leadId: string): Promise<ILead> {
    const lead = await this.model.findOne({ leadId: leadId }).lean();
    return await this.transformModelToLead(lead);
  }

  async transformLeadToModel(lead: ILead): Promise<LeadDocument> {
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

  async transformModelToLead(lead: LeadDocument): Promise<ILead> {
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

  async transformArrayModelToLead(leads: LeadDocument[]): Promise<ILead[]> {
    return Promise.all(
      leads.map(async (lead) => await this.transformModelToLead(lead)),
    );
  }
}
