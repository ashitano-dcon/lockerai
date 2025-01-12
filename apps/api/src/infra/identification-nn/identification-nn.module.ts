import { Global, Module } from '@nestjs/common';
import { IdentificationNnService } from './identification-nn.service';

@Global()
@Module({
  providers: [IdentificationNnService],
  exports: [IdentificationNnService],
})
export class IdentificationNnModule {}
