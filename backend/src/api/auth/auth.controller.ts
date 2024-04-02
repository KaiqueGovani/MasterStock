import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify-jwt-token')
  async verifyJwtToken(token: string) {
    return await this.authService.verifyJwtToken(token);
  }
}
