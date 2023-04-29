import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { LeadService } from './lead.service';
import { ILead } from './interface/ILead';
import { IPaginate } from 'src/common/interface/IPaginate';
import { LeadDTO } from './DTO/LeadDTO';

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
  async createLead(@Body() lead: LeadDTO): Promise<ILead> {
    const savedlead = await this.service.createLead(lead);
    return savedlead;
  }

  @Get('/page/:page')
  async listPaginatedLeads(
    @Param('page') pageNumber: number,
    @Headers('x-page-size') pageSize: number,
  ): Promise<IPaginate<ILead>> {
    const lead = await this.service.listPaginatedLeads(pageNumber, pageSize);
    return lead;
  }
}
