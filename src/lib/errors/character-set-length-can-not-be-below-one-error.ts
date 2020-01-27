import {ExtendableError} from 'ts-error';

export class CharacterSetLengthCanNotBeBelowOneError extends ExtendableError {
  constructor() {
    super();
    this.message = 'Character set length can not be below one.';
  }
}
