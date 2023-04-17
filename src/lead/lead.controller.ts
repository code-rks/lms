import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LeadService } from './lead.service';
import { ILead } from './interface/ILead';

@Controller('lead')
export class LeadController {
  constructor(private service: LeadService) {}
  @Get('/ready')
  async isReady(): Promise<any> {
    return {
      msg: this.service.isReady(),
    };
  }

  @Get('/all')
  async listAllLeads(): Promise<ILead[]> {
    const leads = await this.service.listLeads();
    return leads;
  }

  @Get()
  async getLead(@Param('leadId') leadId: string): Promise<ILead> {
    const lead = await this.service.getLead(leadId);
    return lead;
  }

  @Post()
  async createLead(@Body() lead: ILead): Promise<ILead> {
    const savedlead = await this.service.createLead(lead);
    return savedlead;
  }
}
