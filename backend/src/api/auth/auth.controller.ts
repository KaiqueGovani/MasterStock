import { BadRequestException, Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JsonWebTokenError } from '@nestjs/jwt';
import { OperationException } from 'src/common/error/operation.exception';

@ApiTags('users')
@ApiResponse({ status: 500, description: 'Erro ao realizar operação!' })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Token é valido!' })
  @ApiBadRequestResponse({ description: 'Token não foi aceito!' })
  @ApiUnauthorizedResponse({ description: 'Token inválido!' })
  @Get('verify-jwt-token')
  async verifyJwtToken(@Headers('authorization') token: string): Promise<any> {
    try {
      const payload = await this.authService.verifyJwtToken(this.extractTokenFromHeader(token));
      return { user: payload['user'], message: payload ? 'Token é valido!' : 'Token inválido!' };
    } catch (error) {
      if (error instanceof TypeError) throw new BadRequestException('Token não foi aceito!');
      if (error instanceof JsonWebTokenError) throw new UnauthorizedException('Token inválido!');
      throw new OperationException();
    }
  }

  private extractTokenFromHeader(authorization: string): string | undefined {
    const [type, token] = authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
