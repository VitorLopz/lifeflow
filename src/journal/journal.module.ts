import { Module } from '@nestjs/common';
import { JournalEntrysController } from './journal.controller';
import { JournalEntrysService } from './journal.service';

@Module({
  controllers: [JournalEntrysController],
  providers: [JournalEntrysService],
  exports: [JournalEntrysService],
})
export class JournalEntrysModule {}
