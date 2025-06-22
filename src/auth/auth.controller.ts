import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ schema: { properties: { email: { type: 'string', example: 'user@email.com' }, password: { type: 'string', example: 'password123' } } } })
  @ApiResponse({ status: 201, description: 'Token de acceso', schema: { example: { access_token: 'jwt.token.aqui' } } })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Registrar usuario' })
  @ApiBody({ schema: { properties: { email: { type: 'string', example: 'user@email.com' }, password: { type: 'string', example: 'password123' }, role: { type: 'string', enum: ['customer', 'admin'], example: 'customer' } } } })
  @ApiResponse({ status: 201, description: 'Usuario registrado', schema: { example: { id: 1, email: 'user@email.com', role: 'customer' } } })
  @Post('register')
  async register(@Body() body: { email: string; password: string; role?: string }) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await this.usersService.create({
      email: body.email,
      password: hashedPassword,
      role: body.role || 'customer',
    });
    return { id: user.id, email: user.email, role: user.role };
  }
}
