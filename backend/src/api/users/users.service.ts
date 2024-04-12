import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    if (await this.findByEmail(registerDto.email)) throw new ConflictException('Usuário com esse email já existe!');

    registerDto.senha = await this.authService.encryptPassword(registerDto.senha);

    const newUser = new this.userModel(registerDto);
    return newUser.save();
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.findByEmail(loginDto.email);
    if (!user) throw new BadRequestException('Usuário com esse email não existe!');

    const isPasswordValid = await this.authService.comparePassword(loginDto.password, user.senha);

    if (!isPasswordValid) throw new UnauthorizedException('Senha inválida!');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...result } = user.toObject();
    console.log('User:', result);

    return { access_token: await this.authService.generateJwtToken(result) };
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email: new RegExp(email, 'i') });
    return user;
  }

  async findByPhone(phone: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ telefone: new RegExp(phone, 'i') });
    return user;
  }
}
