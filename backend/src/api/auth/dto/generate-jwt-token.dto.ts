import { OmitType } from '@nestjs/swagger';
import { User } from 'src/api/users/user.schema';

export class GenerateJwtTokenDto extends OmitType(User, ['senha'] as const) {}
