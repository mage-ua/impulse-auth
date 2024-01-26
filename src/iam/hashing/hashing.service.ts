import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  /**
   * Generates a hash for the provided data using a dynamically generated salt.
   *
   * This asynchronous method takes a string or a Buffer as input data and generates a hash using a dynamically generated salt. It uses the `genSalt` function to generate the salt and the `hash` function to compute the hash.
   */
  abstract hash(data: string | Buffer): Promise<string>;

  /**
   * Compares the provided data with an encrypted value to determine if they match.
   *
   * This asynchronous method compares the provided data with an encrypted value using a secure comparison method. It uses the `compare` function to perform the comparison.
   */
  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
