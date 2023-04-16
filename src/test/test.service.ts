import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  isReady = () => {
    return 'Test module is ready';
  };
}
