import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Challenge } from '#api/module/locker/domain/challenge.model';

@ObjectType(Challenge.name)
export class ChallengeObject implements Challenge {
  @Field(() => ID, { nullable: true })
  hashedFingerprintId!: string | null;
}
