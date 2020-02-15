import SecureRNG from "..";
import {LengthParameterCanNotBeBelowOneError} from "../lib/errors/length-parameter-can-not-be-below-one-error";
import {CharacterSetLengthCanNotBeBelowOneError} from "../lib/errors/character-set-length-can-not-be-below-one-error";
import {DecimalPlacesCanNotBeBelowOneError} from "../lib/errors/decimal-places-can-not-be-below-one-error";
import BigNumber from "bignumber.js";

describe('RngGenerator', function () {

  describe('Number Generation', () => {

    it('Should generate number', () => {
      const result = SecureRNG.GenerateInteger();
      expect(typeof result).toBe('number');
    });

    it('Should return min parameter when min and max parameter is same.', () => {
      const result = SecureRNG.GenerateInteger(2, 2);
      expect(result).toBe(2);
    });

    it('Should set maximum value to first parameter when max parameter is not set ( 100 iterations ).', () => {
      let thereIsZero = false;
      let thereIsOne = false;
      let thereIsOther = false;

      for (let x = 0; x < 100; x++) {
        const result = SecureRNG.GenerateInteger(1);

        if (result === 0) {
          thereIsZero = true;
        } else if (result === 1) {
          thereIsOne = true;
        } else {
          thereIsOther = true;
        }

        if (thereIsZero && thereIsOne) {
          break;
        }
      }

      expect(thereIsZero).toBe(true);
      expect(thereIsOne).toBe(true);
      expect(thereIsOther).toBe(false);
    });

    it('Should generate number greater than or equal to 0 if there is no parameters.', () => {
      const result = SecureRNG.GenerateInteger();
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('Should generate number less than or equal to 100 if there is no parameters.', () => {
      const result = SecureRNG.GenerateInteger();
      expect(result).toBeLessThanOrEqual(100);
    });

    it('Should generate number 0 and 1 when min parameter is 0 and max parameter is 1 ( 100 iterations ).', () => {
      let thereIsZero = false;
      let thereIsOne = false;
      let thereIsOther = false;

      for (let x = 0; x < 100; x++) {
        const result = SecureRNG.GenerateInteger(0, 1);

        if (result === 0) {
          thereIsZero = true;
        } else if (result === 1) {
          thereIsOne = true;
        } else {
          thereIsOther = true;
        }

        if (thereIsZero && thereIsOne) {
          break;
        }
      }

      expect(thereIsZero).toBe(true);
      expect(thereIsOne).toBe(true);
      expect(thereIsOther).toBe(false);
    });

    it('Should generate number 1 and 2 when min parameter is 1 and max parameter is 2 ( 100 iterations ).', () => {
      let thereIsOne = false;
      let thereIsTwo = false;
      let thereIsOther = false;

      for (let x = 0; x < 100; x++) {
        const result = SecureRNG.GenerateInteger(1, 2);

        if (result === 1) {
          thereIsOne = true;
        } else if (result === 2) {
          thereIsTwo = true;
        } else {
          thereIsOther = true;
        }

        if (thereIsOne && thereIsTwo) {
          break;
        }
      }

      expect(thereIsOne).toBe(true);
      expect(thereIsTwo).toBe(true);
      expect(thereIsOther).toBe(false);
    });

  });

  describe('String Generation', () => {

    it('Should throw error if length parameter is below 1', () => {
      let errorThrown = false;

      try {
        SecureRNG.GenerateString(-1);
      } catch (e) {
        errorThrown = true;
      }

      expect(errorThrown).toBe(true);
    });

    it('Should throw length parameter can not be below one error if length parameter is below 1', () => {
      let isRightErrorReturned = false;

      try {
        SecureRNG.GenerateString(0);
      } catch (e) {
        if (e instanceof LengthParameterCanNotBeBelowOneError) {
          isRightErrorReturned = true;
        }
      }

      expect(isRightErrorReturned).toBe(true);
    });

    it('Should throw error if characters parameter length is below 1', () => {
      let errorThrown = false;

      try {
        SecureRNG.GenerateString(10, '');
      } catch (e) {
        errorThrown = true;
      }

      expect(errorThrown).toBe(true);
    });

    it('Should throw character set length can not be below one error if characters parameter length is below 1', () => {
      let isRightErrorReturned = false;

      try {
        SecureRNG.GenerateString(10, '');
      } catch (e) {
        if( e instanceof CharacterSetLengthCanNotBeBelowOneError ) {
          isRightErrorReturned = true;
        }
      }

      expect(isRightErrorReturned).toBe(true);
    });

    it('Should generate 10 character string if length parameter is empty', () => {
      const GeneratedString = SecureRNG.GenerateString();
      expect(GeneratedString.length).toBe(10);
    });

    it('Should generate 20 character string if length parameter is 20', () => {
      const GeneratedString = SecureRNG.GenerateString(20);
      expect(GeneratedString.length).toBe(20);
    });

    it('Should generate 10 character string filled with 0', () => {
      const GeneratedString = SecureRNG.GenerateString(10, '0');
      expect(GeneratedString).toBe('0000000000');
    });

  });

  describe('Decimal Generation', () => {

    it('Should throw error if decimal places parameter is below 1', () => {
      let errorThrown = false;

      try {
        SecureRNG.GenerateDecimal(-1);
      } catch (e) {
        errorThrown = true;
      }

      expect(errorThrown).toBe(true);
    });

    it('Should throw decimal places parameter can not be below one error if length parameter is below 1', () => {
      let isRightErrorReturned = false;

      try {
        SecureRNG.GenerateDecimal(0);
      } catch (e) {
        if (e instanceof DecimalPlacesCanNotBeBelowOneError) {
          isRightErrorReturned = true;
        }
      }

      expect(isRightErrorReturned).toBe(true);
    });

    it('Should generate decimal between 0 and 1 with 10 decimal places if there is no parameters', () => {
        const result = SecureRNG.GenerateDecimal();
        expect(result.length).toBe(12);
    });

    it('Should generate decimal between 0 and 1 with 30 decimal places if decimal places parameter is 30', () => {
      const result = SecureRNG.GenerateDecimal(30);
      expect(result.length).toBe(32);
    });

    it('Should generate decimal between 10 and 99 with 30 decimal places if decimal places parameter is 30, min parameter is 10 and max parameter is 99', () => {
      const result = SecureRNG.GenerateDecimal(30, 10, 99);
      expect(result.length).toBe(33);
    });

  });

  describe('Usability', () => {

    it('Random number possibilities should be close to each other ( 100.000 iterations )', () => {
      let numbersBetween0and33 = 0;
      let numbersBetween33and66 = 0;
      let numbersBetween66and100 = 0;

      for( let x = 0; x < 100000; x++ ) {
        const result = SecureRNG.GenerateDecimal(30, 0, 100);
        const resultBN = new BigNumber(result);
        const isAbove0 = resultBN.isGreaterThanOrEqualTo(0);
        const isBelow33 = resultBN.isLessThanOrEqualTo(33.333);
        const isAbove33 = resultBN.isGreaterThan(33.333);
        const isBelow66 = resultBN.isLessThanOrEqualTo(66.666);
        const isBelow100 = resultBN.isLessThanOrEqualTo(100);

        if( !isAbove0 || !isBelow100 ) {
          throw new Error(`Out of bound`);
        }

        if( isBelow33 ) {
          numbersBetween0and33++;
        } else if( isAbove33 && isBelow66 ) {
          numbersBetween33and66++;
        } else {
          numbersBetween66and100++;
        }
      }

      expect(numbersBetween0and33).toBeGreaterThan(31000);
      expect(numbersBetween33and66).toBeGreaterThan(31000);
      expect(numbersBetween66and100).toBeGreaterThan(31000);
    });

  })
});
