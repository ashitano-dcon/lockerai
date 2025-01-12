import { Field, ObjectType } from '@nestjs/graphql';
import { Drawer } from '#api/module/drawer/domain/drawer.model';

@ObjectType(Drawer.name)
export class DrawerObject implements Omit<Drawer, 'lockerId'> {
  @Field(() => Number, { nullable: false })
  id!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;
}
