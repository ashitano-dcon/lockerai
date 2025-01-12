import { Body, Controller, Inject, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import type { Drawer } from '#api/module/drawer/domain/drawer.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type DrawerUseCaseInterface } from '#api/module/drawer/use-case/drawer.use-case';
import { UpdateConnectionBody } from './dto/body/update-connection.body';

@Controller()
export class DrawerController {
  private readonly logger = new Logger(DrawerController.name);

  constructor(
    @Inject(InjectionToken.DRAWER_USE_CASE)
    private readonly drawerUseCase: DrawerUseCaseInterface,
  ) {}

  @Post('/drawers/put-in')
  @UsePipes(ValidationPipe)
  async putInLostItem(@Body() updateConnectionBody: UpdateConnectionBody): Promise<Drawer> {
    this.logger.log(`${this.putInLostItem.name} called`);

    const foundDrawer = await this.drawerUseCase.putInLostItem(updateConnectionBody.userId);

    return foundDrawer;
  }

  @Post('/drawers/take-out')
  @UsePipes(ValidationPipe)
  async takeOutLostItem(@Body() updateConnectionBody: UpdateConnectionBody): Promise<Drawer> {
    this.logger.log(`${this.takeOutLostItem.name} called`);

    const foundDrawer = await this.drawerUseCase.takeOutLostItem(updateConnectionBody.userId);

    return foundDrawer;
  }
}
