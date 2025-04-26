import { type CanActivate, type ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '#api/infra/supabase/supabase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  /**
   * This guard enforces authentication by requiring a valid 'authorization' header.
   * The removal of the environment check bypass means authentication is now enforced
   * even in development environments. This change is intentional and might lead to
   * HTTP 500 errors on /callback if not handled properly.
   */

  async canActivate(context: ExecutionContext) {
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
