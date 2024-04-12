import { Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiAcceptedResponse, ApiBearerAuth, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiAcceptedResponse({ description: 'Token é valido!' })
  @ApiForbiddenResponse({ description: 'Token inválido!' })
  @Post('verify-jwt-token')
  async verifyJwtToken(@Headers('authorization') token: string): Promise<any> {
    let payload: object;
    try {
      payload = await this.authService.verifyJwtToken(this.extractTokenFromHeader(token));
      return { user: payload['user'], message: payload ? 'Token é valido!' : 'Token inválido!' };
    } catch {
      throw new UnauthorizedException('Token inválido!');
    }
  }

  private extractTokenFromHeader(authorization: string): string | undefined {
    const [type, token] = authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
