import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Lógica personalizada: puedes acceder al request y validar condiciones
    const request = context.switchToHttp().getRequest();
    if (!request.body.email || !request.body.password) {
      throw new UnauthorizedException('Email y contraseña son requeridos');
    }
    return super.canActivate(context);
  }
}
