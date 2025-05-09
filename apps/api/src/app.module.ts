import { Module } from '@nestjs/common';
import { JSONScalar } from './common/scalar/json.scalar';

@Module({
  imports: [
    // ... existing imports ...
  ],
  controllers: [
    // ... existing controllers ...
  ],
  providers: [
    // ... existing providers ...
    JSONScalar,
  ],
})
export class AppModule {}
