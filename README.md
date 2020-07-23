# Secure Random Number Generator

This library is for generating secure random numbers using the outstanding [bignumber.js](https://mikemcl.github.io/bignumber.js/) library.

## Installation

```
npm install secure-rng
```

or

```
yarn add secure-rng
```

## Usage

> Typescript:

```
import SecureRNG from 'secure-rng';
```

> ES 6 Module:

```
import * as SecureRNG from 'secure-rng';
```

> Node.JS:
```
const SecureRNG = require('secure-rng').default;
```

```
SecureRNG.GenerateInteger(0, 100);
// 59

SecureRNG.GenerateString(10);
// D7vxGEEgMF

SecureRNG.GenerateDecimal(10);
// 0.4819203948
```


## Methods
> SecureRNG.GenerateInteger( max: number ): number

> SecureRNG.GenerateInteger( min: number, max: number ): number

```
SecureRNG.GenerateInteger( 100, 150 );
// 125

SecureRNG.GenerateInteger( 0, 1 );
// 0

SecureRNG.GenerateInteger( 0, 1 );
// 1
```

```
min ( default: 0 )
The minimum number that can be returned. (inclusive)

max ( default: 100 )
The maximum number that can be returned. (inclusive)
```

```
Returns: number
```

---

> SecureRNG.GenerateString( length: number ): string

> SecureRNG.GenerateString( length: number, characters: string ): string

```
SecureRNG.GenerateString();
// 0a1b2c3d4e5F

SecureRNG.GenerateString( 20 );
// KQx8Rb35tI6TehVWcKkX

SecureRNG.GenerateString( 7, 'abCd0' );
// CCa0b0d
```

```
length ( default: 10 )
The length of the string to be created.

characters ( default: "0123456789qwertyuopasdfghjklizxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM" )
Characters that can be inside the string.
```

```
Returns: string

Can throw:
- LengthParameterCanNotBeBelowOneError
- CharacterSetLengthCanNotBeBelowOneError
```

---

> SecureRNG.GenerateDecimal( decimalPlaces: number ): string

> SecureRNG.GenerateDecimal( decimalPlaces: number, max: number ): string

> SecureRNG.GenerateDecimal( decimalPlaces: number, min: number, max: number ): string

```
SecureRNG.GenerateDecimal();
// "0.2547865215"

SecureRNG.GenerateDecimal( 20 );
// "0.25478652151287493520"

SecureRNG.GenerateDecimal( 20, 10, 100 );
// "11.87562001454789632001"
```

```
decimalPlaces ( default: 10 )
How many numbers will come after the point

min ( default: 0 )
The minimum number that can be returned. (inclusive)

max ( default: 1 )
The maximum number that can be returned. (inclusive)
```

```
Returns: string

Can throw:
- DecimalPlacesCanNotBeBelowOneError
```
