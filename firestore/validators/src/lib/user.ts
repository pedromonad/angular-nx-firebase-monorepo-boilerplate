import { User } from '@angular-nx-firebase-monorepo/firestore/models';
import { CustomError } from '@angular-nx-firebase-monorepo/utils/errors';
import { isUserValid } from './ajv-validators/user';

export function validUser(data: User) {
  if (!isUserValid(data)) {
    throw new CustomError('User is invalid');
  }
}
