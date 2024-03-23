import { Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OperationException } from '../../common/error/operation.exception';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.dto';

@ApiTags('users')
@ApiResponse({ status: 500, description: 'Erro ao realizar operação!' })
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'Usuário criado como sucesso!' })
  @ApiConflictResponse({ description: 'Usuário com esse email / telefone já existe!' })
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.usersService.register(registerDto);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      console.error(error);
      throw new OperationException();
    }
  }

  @ApiOkResponse({ description: 'Usuário logado com sucesso!' })
  @ApiBadRequestResponse({ description: 'Usuário com esse email não existe!' })
  @ApiUnauthorizedResponse({ description: 'Senha inválida!' })
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.usersService.login(loginDto);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      console.error(error);
      throw new OperationException();
    }
  }
}
