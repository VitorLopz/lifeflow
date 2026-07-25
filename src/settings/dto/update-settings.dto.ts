import { IsBoolean, IsIn, IsOptional } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional() @IsIn(['dark', 'light'])
  theme?: string;

  @IsOptional() @IsBoolean()
  notifHabits?: boolean;

  @IsOptional() @IsBoolean()
  notifTreino?: boolean;

  @IsOptional() @IsBoolean()
  notifResumo?: boolean;
}
