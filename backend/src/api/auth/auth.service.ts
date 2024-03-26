import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GenerateJwtTokenDto } from './dto/generate-jwt-token.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwtToken(user: GenerateJwtTokenDto) {
    return await this.jwtService.signAsync({ user });
  }

  async verifyJwtToken(token: string): Promise<object> {
    return await this.jwtService.verifyAsync(token);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async encryptPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
