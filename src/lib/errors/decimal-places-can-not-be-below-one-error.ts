import {ExtendableError} from 'ts-error';

export class DecimalPlacesCanNotBeBelowOneError extends ExtendableError {
  constructor() {
    super();
    this.message = 'Decimal places can not be below one.';
  }
}
