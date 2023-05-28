import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import { logger } from '@core/logger/Logger';
import { left, right } from '@core/result/Result';

@injectable()
export class AppUtils {
  public otpGen(n: number) {
    let text = '';
    const possible = '0123456789';
    for (let i = 0; i < n; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    logger.info(`Generated OTP: ${text}`);
    return text;
  }

  public generateToken(object: object, key: string, lifeSpan: string) {
    const token = jwt.sign(object, key, {
      expiresIn: lifeSpan
    });
    logger.info('Generated token:', { token });
    return token;
  }

  public verifyToken(token: string, key: string) {
    try {
      const decoded = jwt.verify(token, key);
      logger.info('Verified token:', { decoded });
      return right(decoded);
    } catch (err) {
      logger.error('Failed to verify token:', { token, error: err });
      /*       return left(new AuthErrors.TokenExpired(err as Error, token)); */
    }
  }
}
