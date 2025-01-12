export class Challenge {
  readonly hashedFingerprintId: string | null;

  constructor({ hashedFingerprintId }: Challenge) {
    this.hashedFingerprintId = hashedFingerprintId;
  }
}
