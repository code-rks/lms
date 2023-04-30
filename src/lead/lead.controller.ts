import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LeadService } from './lead.service';
import { ILead, IVisit } from './interface/ILead';
import { IPaginate } from 'src/common/interface/IPaginate';
import { LeadDTO, VisitDTO } from './DTO/LeadDTO';
import { UpdateLeadDTO } from './DTO/UpdateLeadDTO';
import { QueryRequired } from 'src/common/decorators/requiredquery.decorator';
import { UpdateVisitDTO } from './DTO/UpdateVisitDTO';

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
  async getLead(@QueryRequired('leadId') leadId: string): Promise<ILead> {
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
    @Headers('x-page-size') pageSize = 10,
  ): Promise<IPaginate<ILead>> {
    const lead = await this.service.listPaginatedLeads(pageNumber, pageSize);
    return lead;
  }

  @Put('/:leadId')
  async updateLead(
    @Body() lead: UpdateLeadDTO,
    @Param('leadId') leadId: string,
  ): Promise<ILead> {
    const savedlead = await this.service.updateLead(leadId, lead);
    return savedlead;
  }

  @Post('/:leadId/visit')
  async createVisit(
    @Param('leadId') leadId: string,
    @Body() visit: VisitDTO,
  ): Promise<IVisit> {
    const savedVisit = await this.service.createVisit(leadId, visit);
    return savedVisit;
  }

  @Put('/:leadId/visit/:visitId')
  async updateVisit(
    @Param('leadId') leadId: string,
    @Param('visitId') visitId: string,
    @Body() visit: UpdateVisitDTO,
  ): Promise<IVisit> {
    return await this.service.updateVisit(leadId, visitId, visit);
  }

  @Delete('/:leadId/visit/:visitId')
  async deleteVisit(
    @Param('leadId') leadId: string,
    @Param('visitId') visitId: string,
  ): Promise<IVisit[]> {
    const savedVisit = await this.service.deleteVisit(leadId, visitId);
    return savedVisit;
  }

  @Get('/:leadId/visits')
  async getVisits(@Param('leadId') leadId: string): Promise<IVisit[]> {
    return await this.service.getVisits(leadId);
  }

  @Get('/visit/:visitId')
  async getVisit(@Param('visitId') visitId: string): Promise<IVisit> {
    return await this.service.getVisit(visitId);
  }
}
