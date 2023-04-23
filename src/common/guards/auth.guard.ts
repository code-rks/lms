import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { Constants } from "../Constants";
import { TokenNotFoundException } from "../exceptions/AuthExceptions";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { TOKEN } from "../types";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    // Skip Auth for public endpoints
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) return true;

    // If not public validate the token and set UserId
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new TokenNotFoundException();
    const user: any = await this.authService.validateToken(token, TOKEN.AUTH);
    request.userId = user;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.headers[Constants.AUTH_TOKEN_HEADER_NAME];
    if(!token) throw new TokenNotFoundException();
    return token;
  }
}