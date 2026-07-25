import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AssistantService } from './assistant.service';
import { AskAssistantDto } from './dto/ask-assistant.dto';

@UseGuards(JwtAuthGuard)
@Controller('assistant')
export class AssistantController {
  constructor(private service: AssistantService) {}

  @Post()
  async ask(@Body() dto: AskAssistantDto) {
    const reply = await this.service.ask(dto.prompt, dto.context);
    return { reply };
  }
}
