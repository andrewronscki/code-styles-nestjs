import { BusinessError } from '@/shared/domain';

export class CreateCatError extends BusinessError {
  constructor() {
    super('Create cat error.');
  }
}
