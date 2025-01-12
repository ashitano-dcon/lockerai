import { type CanActivate, type ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { EnvService } from '#api/common/service/env/env.service';
import { SupabaseService } from '#api/infra/supabase/supabase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly envService: EnvService,
  ) {}

  async canActivate(context: ExecutionContext) {
    if (this.envService.NodeEnv === 'development') {
      return true;
    }

    let accessToken: string | undefined;
    context.getArgs().forEach((arg) => {
      if (arg && arg.req && arg.req.headers) {
        if (arg.req.headers['authorization']) {
          accessToken = arg.req.headers['authorization'].replace('Bearer ', '');
        }
      }
    });
    if (!accessToken) {
      throw new UnauthorizedException("Missing 'authorization' header.");
    }

    const user = await this.supabaseService.getUserByAccessToken(accessToken);
    if (!user) {
      throw new UnauthorizedException(`Invalid access token: ${accessToken}`);
    }

    return true;
  }
}
