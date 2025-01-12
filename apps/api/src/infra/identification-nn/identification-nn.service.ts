import { Inject, Injectable, Logger } from '@nestjs/common';
import { EnvService } from '#api/common/service/env/env.service';

type SimilarItem = {
  key: string;
  similarity: number;
  dateDifference: number;
};

@Injectable()
export class IdentificationNnService {
  private readonly url: string;

  private readonly logger = new Logger(IdentificationNnService.name);

  constructor(@Inject(EnvService) private readonly envService: EnvService) {
    this.url = this.envService.IdentificationNnEndpoint;

    this.logger.debug(`${IdentificationNnService.name} constructed`);
  }

  async identify(similarItems: SimilarItem[]): Promise<string | null> {
    type Request = {
      similarity: number;
      date_difference: number;
    };

    type Response = {
      // NOTE: The first element of the tuple represents the probability of a match and the second element represents the probability of a mismatch.
      data: [number, number];
      error?: string;
    };

    const identities = await Promise.all(
      similarItems.map(async (similarItem): Promise<[string, [number, number]]> => {
        const response = await fetch(this.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            similarity: similarItem.similarity,
            date_difference: similarItem.dateDifference,
          } satisfies Request),
        });

        const { data: identity, error } = (await response.json()) as Response;
        if (error) {
          throw new Error(String(error));
        }

        return [similarItem.key, identity];
      }),
    );

    const mostIdenticalIdentity = identities.reduce((prev, current) => (current[1][0] > prev[1][0] ? current : prev));
    if (mostIdenticalIdentity[1][0] <= 0) {
      return null;
    }

    const mostIdenticalKey = mostIdenticalIdentity[0];

    return mostIdenticalKey;
  }
}
