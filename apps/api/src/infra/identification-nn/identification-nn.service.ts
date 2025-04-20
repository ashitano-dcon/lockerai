import { Inject, Injectable, Logger } from '@nestjs/common';
import { EnvService } from '#api/common/service/env/env.service';

type SimilarItem = {
  key: string;
  similarity: number;
  dateDifference: number;
};

type ItemWithRates = {
  key: string;
  approveRate: number;
  rejectRate: number;
};

@Injectable()
export class IdentificationNnService {
  private readonly url: string;

  private readonly logger = new Logger(IdentificationNnService.name);

  constructor(@Inject(EnvService) private readonly envService: EnvService) {
    this.url = this.envService.IdentificationNnEndpoint;

    this.logger.debug(`${IdentificationNnService.name} constructed`);
  }

  async identify(similarItems: SimilarItem[]): Promise<ItemWithRates[]> {
    type Request = {
      similarity: number;
      date_difference: number;
    };

    type Response = {
      // NOTE: The first element of the tuple represents the probability of a match and the second element represents the probability of a mismatch.
      data: [number, number];
      error?: string;
    };

    this.logger.debug('similarItems', similarItems);

    const identities = await Promise.all(
      similarItems.map(async (similarItem): Promise<ItemWithRates> => {
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

        this.logger.debug('IdentificationNN API response status', { status: response.status, statusText: response.statusText });

        const { data: identity, error } = (await response.json()) as Response;
        if (error) {
          throw new Error(String(error));
        }

        return {
          key: similarItem.key,
          approveRate: identity[0],
          rejectRate: identity[1],
        };
      }),
    );

    this.logger.debug('identities', identities);

    return identities;
  }
}
