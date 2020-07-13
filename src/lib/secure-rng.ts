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
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (typeof global !== 'undefined' && typeof global.crypto === 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).crypto = require('crypto');
    }

    BigNumber.config({
      CRYPTO: true
    });
  }

  public GenerateInteger(min?: number, max?: number): number {
    const minMax = SecureRNGClass.GetMinMax(0, 100, min, max);

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

  public GenerateDecimal(decimalPlaces= 10, min?: number, max?: number): string {
    if( decimalPlaces < 1 ) {
      throw new DecimalPlacesCanNotBeBelowOneError();
    }

    const minMax = SecureRNGClass.GetMinMax(0, 1, min, max);

    if (minMax.min === minMax.max) {
      return String(minMax.min);
    }

    return BigNumber.random(decimalPlaces + 1).times(minMax.max - minMax.min).plus(minMax.min).toFixed(decimalPlaces, BigNumber.ROUND_HALF_CEIL);
  }

  private static GetMinMax(defaultMinValue = 0, defaultMaxValue = 1, min?: number, max?: number): MinMax {
    let TempLow = defaultMinValue;
    let TempHigh = defaultMaxValue;

    if (typeof min !== 'undefined') {
      if (typeof max !== 'undefined') {
        TempLow = min;
        TempHigh = max;
      } else {
        TempLow = 0;
        TempHigh = min;
      }
    }

    const Low = Math.min(TempLow, TempHigh);
    const High = Math.max(TempLow, TempHigh);

    return {
      min: Low,
      max: High
    };
  }
}

export const SecureRNG = new SecureRNGClass();
