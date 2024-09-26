import Hashids from 'hashids';
import { NumberLike } from 'hashids/cjs/util';

export class HashIds {
  static hash: Hashids = new Hashids('s3creT!', 10, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');

  static encode(value): string {
    return this.hash.encode(value);
  }

  static decode(decode: string): NumberLike {
    return this.hash.decode(decode)[0];
  }
}
