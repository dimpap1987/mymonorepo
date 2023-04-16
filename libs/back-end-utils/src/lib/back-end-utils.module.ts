import { Module } from '@nestjs/common'
import { ApiException } from '../../../shared/utils/src/lib/exceptions/api.exception'

@Module({
  controllers: [],
  providers: [ApiException],
  exports: [ApiException],
})
export class BackEndUtilsModule {}
