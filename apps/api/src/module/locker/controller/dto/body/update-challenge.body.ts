import type { Challenge } from '#api/module/locker/domain/challenge.model';

export class UpdateChallengeBody implements Challenge {
  hashedFingerprintId!: string | null;
}
