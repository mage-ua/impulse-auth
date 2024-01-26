import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  /**
   * Generates a hash for the provided data using a dynamically generated salt.
   *
   * This asynchronous method takes a string or a Buffer as input data and generates a hash using a dynamically generated salt. It uses the `genSalt` function to generate the salt and the `hash` function to compute the hash.
   */
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  /**
   * Compares the provided data with an encrypted value to determine if they match.
   *
   * This asynchronous method compares the provided data with an encrypted value using a secure comparison method. It uses the `compare` function to perform the comparison.
   */
  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
