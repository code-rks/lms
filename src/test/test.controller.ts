import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}
  @Get()
  async isReady() {
    return {
      msg: this.testService.isReady(),
    };
  }
}
