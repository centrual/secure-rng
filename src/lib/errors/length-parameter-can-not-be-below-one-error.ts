import {ExtendableError} from 'ts-error';

export class LengthParameterCanNotBeBelowOneError extends ExtendableError {
  constructor() {
    super();
    this.message = 'Length parameter can not be below one.';
  }
}
