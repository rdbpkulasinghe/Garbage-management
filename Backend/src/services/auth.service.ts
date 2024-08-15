import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { CommonService } from './common.service';
import { AuthRequest } from 'src/common/interfaces/auth-request';
import { AuthResponse } from 'src/common/interfaces/auth-response';

@Injectable()
export class AuthService extends CommonService {
  constructor(dataSource: DataSource, private jwtService: JwtService) {
    super(dataSource);
  }

  async login(authRequest: AuthRequest) {
    const authResponse: AuthResponse = {};

    const user = await this.entityManager.findOne(User, {
      where: { email: authRequest.email },
    });
    if (!user) {
      console.log('email');
      authResponse.error = true;
      authResponse.message = 'Invalid Email/Password';
      return authResponse;
    }

    const passwordIsMatch = await compare(authRequest.password, user.password);

    if (!passwordIsMatch) {
      console.log('password');
      authResponse.error = true;
      authResponse.message = 'Invalid Email/Password';
      return authResponse;
    }

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      id: user.id,
      
    };

    authResponse.error = false;
    authResponse.token = this.jwtService.sign(payload);
    return authResponse;
  }
}
