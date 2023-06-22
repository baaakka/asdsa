import * as bcrypt from 'bcrypt';
import { Logger } from '@xtool/logger';

const logger = new Logger('PasswordManager');

export class PasswordManager {
  private static readonly saltRounds = 10;

  static encrypt = async (password: string): Promise<string> => {
    logger.debug('Encrypting password: ' + password);
    return await bcrypt.hash(password, PasswordManager.saltRounds);
  };

  static compare = async (password: string, hash: string): Promise<boolean> => {
    logger.debug('Verifying password', password, hash);
    return await bcrypt.compare(password, hash);
  };
}
