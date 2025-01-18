type UserRole = 'USER' | 'OCCUPIER';

type UserLostAndFoundState = 'NONE' | 'DELIVERING' | 'RETRIEVING';

export class User {
  readonly id: string;

  readonly authId: string;

  readonly hashedFingerprintId: string | null;

  readonly name: string;

  readonly email: string;

  readonly role: UserRole;

  readonly lostAndFoundState: UserLostAndFoundState;

  readonly avatarUrl: string;

  readonly isDiscloseAsOwner: boolean;

  readonly createdAt: Date;

  constructor({
    id,
    authId,
    hashedFingerprintId,
    name,
    email,
    role,
    lostAndFoundState,
    avatarUrl,
    isDiscloseAsOwner,
    createdAt,
  }: Omit<User, 'isOnTheWay'>) {
    this.id = id;
    this.authId = authId;
    this.hashedFingerprintId = hashedFingerprintId;
    this.name = name;
    this.email = email;
    this.role = role;
    this.lostAndFoundState = lostAndFoundState;
    this.avatarUrl = avatarUrl;
    this.isDiscloseAsOwner = isDiscloseAsOwner;
    this.createdAt = createdAt;
  }

  get isOnTheWay(): boolean {
    return this.lostAndFoundState !== 'NONE';
  }
}
