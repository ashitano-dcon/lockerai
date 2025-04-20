import { Inject, Injectable, Logger } from '@nestjs/common';
import { type SupabaseClient, createClient } from '@supabase/supabase-js';
import type { FileUpload } from 'graphql-upload/Upload.js';
import { EnvService } from '#api/common/service/env/env.service';

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient;

  private readonly logger = new Logger(SupabaseService.name);

  constructor(@Inject(EnvService) private readonly envService: EnvService) {
    this.client = createClient(this.envService.SupabaseUrl, this.envService.SupabaseServiceRoleKey);

    this.logger.debug(`${SupabaseService.name} constructed`);
  }

  async getUserByAccessToken(accessToken: string) {
    const { data, error } = await this.client.auth.getUser(accessToken);
    if (error) {
      this.logger.error(error.message);
      return null;
    }

    return data.user;
  }

  async uploadFiles(files: [string, FileUpload][]) {
    const results = await Promise.all(
      files.map(([path, file]) => {
        const ext = file.filename.match(/(?<=\.)[^.]+$/)?.[0].toLocaleLowerCase();

        return this.client.storage.from('lost-item').upload(path, file.createReadStream(), {
          duplex: 'half',
          upsert: true,
          contentType: ext ? `image/${ext === 'jpg' ? 'jpeg' : ext}` : file.mimetype,
        });
      }),
    );
    if (results.some((result) => result.error)) {
      throw new Error(results.map((result) => result.error?.message).join('\n'));
    }

    const uploadedPaths = results.map((result) => result.data!.path);
    const uploadedUrls = uploadedPaths.map((path) => this.client.storage.from('lost-item').getPublicUrl(path).data.publicUrl);

    return uploadedUrls;
  }

  async downloadFile(path: string): Promise<{ data: Buffer; mimetype: string } | null> {
    const { data, error } = await this.client.storage.from('lost-item').download(path);
    if (error) {
      this.logger.error(`Failed to download file from Supabase: ${error.message}`);
      return null;
    }
    if (!data) {
      return null;
    }

    const buffer = Buffer.from(await data.arrayBuffer());
    const mimetype = data.type;

    return { data: buffer, mimetype };
  }

  getPublicUrl(path: string): string {
    return this.client.storage.from('lost-item').getPublicUrl(path).data.publicUrl;
  }
}
