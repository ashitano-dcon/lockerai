type LostAndFoundState = 'NONE' | 'DELIVERING' | 'RETRIEVING';

export type User = {
  id: string;
  authId: string;
  name: string;
  email: string;
  lostAndFoundState: LostAndFoundState;
  avatarUrl: string;
  createdAt: Date;
};

export const mockUser = (user: Partial<User> = {}): User => ({
  id: 'e069eeb2-a239-44c7-9870-acc1af492264',
  authId: 'e069eeb2-a239-44c7-9870-acc1af492264',
  name: 'John Doe',
  email: 'example@example.com',
  lostAndFoundState: 'NONE',
  avatarUrl: 'https://avatars.githubusercontent.com/u/1',
  createdAt: new Date(0),
  ...user,
});
