import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { BaseController } from '@shared-infra/http/controller/BaseController';
import { random } from '../../../utils/random';
import config from '../../../config/config';
import * as jwt from 'jsonwebtoken';
import { AuthErrors } from '../../../application/errors/AuthError';

@injectable()
export class AuthController extends BaseController {
  constructor() {
    super();
  }

  public static refTokens = new Array<{
    username: string;
    refreshToken: string;
  }>();

  private static issueToken = async (username: string) => {
    const userToken = {
      username
    };
    // generating new access token
    const token = jwt.sign(userToken, config.jwtSecret, {
      expiresIn: config.jwtExpirationSeconds
    });

    // generating refresh token
    // we should store it in database, I'm just putting it in a list
    const refreshToken = random(64);
    AuthController.refTokens.push({
      username: username,
      refreshToken: refreshToken
    });
    return { accessToken: token, refreshToken: refreshToken };
  };

  public async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const username = request.body.username;
    const password = request.body.password;

    if (username === 'saman' && password === '123') {
      const newToken = await AuthController.issueToken(username);
      return this.ok<any>(response, newToken);
    } else {
      return this.notFound(response, new AuthErrors.UserNotAuthorised(), next);
    }
  }

  public async refreshToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const refreshToken = request.body.refreshToken;
    const foundedRefToken = AuthController.refTokens.find(
      (x) => x.refreshToken == refreshToken
    );
    if (foundedRefToken) {
      const token = await AuthController.issueToken(foundedRefToken.username);
      response.json({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken
      });
    } else {
      response.sendStatus(401);
    }
  }

  public async executeImpl(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    return this.login(request, response, next);
  }
}
