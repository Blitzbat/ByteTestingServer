// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/louy/typed-merge/95d803b2b86a03742039bac4b43e20f86abb79ca/index.d.ts
declare module 'merge/index' {
function merge<A extends Object>(a: A): A;
function merge<A extends Object, B>(a: A, b: B): A & B;
function merge<A extends Object, B, C>(a: A, b: B, c: C): A & B & C;
function merge<A extends Object, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
function merge<A extends Object, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
function merge<A extends Object>(...a: A[]): A;

function merge<A extends Object>(recursive: boolean, a: A): A;
function merge<A extends Object, B>(recursive: boolean, a: A, b: B): A & B;
function merge<A extends Object, B, C>(recursive: boolean, a: A, b: B, c: C): A & B & C;
function merge<A extends Object, B, C, D>(recursive: boolean, a: A, b: B, c: C, d: D): A & B & C & D;
function merge<A extends Object, B, C, D, E>(recursive: boolean, a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
function merge<A extends Object>(recursive: boolean, ...a: A[]): A;

namespace merge {
  function recursive<A extends Object>(a: A): A;
  function recursive<A extends Object, B>(a: A, b: B): A & B;
  function recursive<A extends Object, B, C>(a: A, b: B, c: C): A & B & C;
  function recursive<A extends Object, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
  function recursive<A extends Object, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
}

export = merge;
}
declare module 'merge' {
import main = require('merge/index');
export = main;
}