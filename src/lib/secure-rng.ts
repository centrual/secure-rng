import BigNumber from "bignumber.js";
import {CharacterSetLengthCanNotBeBelowOneError} from "./errors/character-set-length-can-not-be-below-one-error";
import {LengthParameterCanNotBeBelowOneError} from "./errors/length-parameter-can-not-be-below-one-error";
import {DecimalPlacesCanNotBeBelowOneError} from "./errors/decimal-places-can-not-be-below-one-error";

interface MinMax {
  min: number;
  max: number;
}

class SecureRNGClass {
  private static DEFAULT_CHARACTERS = '0123456789qwertyuopasdfghjklizxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

  constructor() {
    if (typeof global !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).crypto = require('crypto');
    }

    BigNumber.config({
      CRYPTO: true
    });
  }

  public GenerateInteger(min = 0, max = 100): number {
    const minMax = SecureRNGClass.GetMinMax(min, max);

    if (minMax.min === minMax.max) {
      return minMax.min;
    }

    return BigNumber.random(20).times(minMax.max - minMax.min + 1).plus(minMax.min).integerValue(BigNumber.ROUND_FLOOR).toNumber();
  }

  public GenerateString(length = 10, chars = SecureRNGClass.DEFAULT_CHARACTERS): string {
    if (length <= 0) {
      throw new LengthParameterCanNotBeBelowOneError();
    }

    if (typeof chars !== 'undefined' && chars.length === 0) {
      throw new CharacterSetLengthCanNotBeBelowOneError();
    }

    let CharSet: string;
    let GeneratedString = '';

    if (typeof chars === 'undefined') {
      CharSet = SecureRNGClass.DEFAULT_CHARACTERS;
    } else {
      CharSet = chars;
    }

    for (let x = 0; x < length; x++) {
      const SelectedChar = this.GenerateInteger(CharSet.length - 1);
      GeneratedString += CharSet.charAt(SelectedChar);
    }

    return GeneratedString;
  }

  public GenerateDecimal(decimalPlaces= 10, min = 0, max = 1): string {
    if( decimalPlaces < 1 ) {
      throw new DecimalPlacesCanNotBeBelowOneError();
    }

    const minMax = SecureRNGClass.GetMinMax(min, max);

    if (minMax.min === minMax.max) {
      return String(minMax.min);
    }

    return BigNumber.random(decimalPlaces + 1).times(minMax.max - minMax.min).plus(minMax.min).toFixed(decimalPlaces, BigNumber.ROUND_HALF_CEIL);
  }

  private static GetMinMax(min: number, max: number): MinMax {
    const Low = Math.min(min, max);
    const High = Math.max(min, max);

    return {
      min: Low,
      max: High
    };
  }
}

export const SecureRng = new SecureRNGClass();
