import { Global, Module } from '@nestjs/common';
import { LangchainService } from './langchain.service';

@Global()
@Module({
  providers: [LangchainService],
  exports: [LangchainService],
})
export class LangchainModule {}
