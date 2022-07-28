import { Controller, Get, Route } from 'tsoa';
import { HealthStatus } from '../models/HealthStatus';

@Route('health')
export class Health extends Controller {
  @Get()
  public async health(): Promise<HealthStatus> {
    return {
      message: 'The server is up!',
    };
  }
}
