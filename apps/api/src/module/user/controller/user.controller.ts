import { Controller, Get, HttpException, HttpStatus, Inject, Logger, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectionToken } from '#api/common/constant/injection-token';
import type { User } from '#api/module/user/domain/user.model';
// TODO: Once this issue is resolved, modify to use `import type` syntax.
// https://github.com/typescript-eslint/typescript-eslint/issues/5468
import { type UserUseCaseInterface } from '#api/module/user/use-case/user.use-case';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    @Inject(InjectionToken.USER_USE_CASE)
    private readonly userUseCase: UserUseCaseInterface,
  ) {}

  @Get('/users/:id')
  @UsePipes(ValidationPipe)
  async findUserById(@Param('id') id: string): Promise<User | null> {
    this.logger.log(`${this.findUserById.name} called`);

    const foundUser = await this.userUseCase.findUserById(id);
    if (foundUser === null) {
      throw new HttpException(`No user found with id ${id}.`, HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  @Get('/users/:hashedFingerprintId')
  @UsePipes(ValidationPipe)
  async findUserByHashedFingerprintId(@Param('hashedFingerprintId') hashedFingerprintId: string): Promise<User | null> {
    this.logger.log(`${this.findUserByHashedFingerprintId.name} called`);

    const foundUser = await this.userUseCase.findUserByHashedFingerprintId(hashedFingerprintId);
    if (foundUser === null) {
      throw new HttpException(`No user found with fingerprint ${hashedFingerprintId}.`, HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }
}
