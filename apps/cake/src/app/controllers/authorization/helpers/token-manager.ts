import * as jwt from 'jsonwebtoken';

import { Logger } from '@xtool/logger';
import { TokenData, TokenOptions } from '@cake/lib-api-interface';

const logger = new Logger('TokenManager');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export type SignedToken = {
  authToken: string;
  refreshToken: string;
};

export class TokenManager {
  private static readonly refreshExpTime =
    Math.floor(Date.now() / 1000) + 2592000; // 30 days in seconds
  private static readonly mobileAuthTokenExpTine =
    Math.floor(Date.now() / 1000) + 1555200000; // 50 years in seconds

  static tokenFromRequest = (request): string | null => {
    let authToken =
      request.headers['Authorization'] ?? request.headers['authorization'];
    if (!authToken) {
      return null;
    }
    authToken = authToken.replace('Bearer ', '');
    return authToken;
  };

  static sign = (opts: TokenOptions): SignedToken => {
    let authExpiration = opts.exp;
    if (!authExpiration) {
      authExpiration = TokenManager.mobileAuthTokenExpTine;
    }

    const authToken = jwt.sign(
      {
        exp: authExpiration,
        data: opts.data,
      },
      TOKEN_SECRET
    );

    const refreshToken = jwt.sign(
      {
        exp: TokenManager.refreshExpTime,
      },
      TOKEN_SECRET
    );

    return {
      authToken,
      refreshToken,
    };
  };

  static process = (token: string): TokenData | null => {
    try {
      return jwt.verify(token, TOKEN_SECRET) as TokenData;
    } catch (err) {
      logger.log(err.message);
      return null;
    }
  };
}
