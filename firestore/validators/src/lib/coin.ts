import { Coin } from '@angular-nx-firebase-monorepo/firestore/models';
import { CustomError } from '@angular-nx-firebase-monorepo/utils/errors';
import { isCoinValid } from './ajv-validators/user';

export function validCoin(data: Coin) {
  if (!isCoinValid(data)) {
    throw new CustomError('Coin is invalid');
  }
}
