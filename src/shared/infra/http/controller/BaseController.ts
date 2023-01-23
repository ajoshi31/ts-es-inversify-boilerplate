/* eslint-disable  @typescript-eslint/no-explicit-any */
import * as express from 'express';
import { injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { logger } from '@core/logger/Logger';
import { AppError } from '@core/error/AppError';

@injectable()
export abstract class BaseController {
  protected abstract executeImpl(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<interfaces.IHttpActionResult>;

  public async execute(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      await this.executeImpl(req, res, next);
    } catch (err) {
      logger.error(`[BaseController]: Uncaught controller error`, err);
      this.fail(res, new AppError.UnexpectedError(err), next);
    }
  }

  public static jsonResponse(
    res: express.Response,
    code: number,
    message: string
  ) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: express.Response, dto?: T) {
    logger.info('API success', res.json);
    if (dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created(res: express.Response) {
    return res.sendStatus(StatusCodes.CREATED);
  }

  public async clientError(
    res: express.Response,
    error: Error | string | any,
    next: express.NextFunction
  ) {
    await next({
      status: StatusCodes.BAD_REQUEST,
      message: error.errorValue().message
        ? error.errorValue().message
        : ReasonPhrases.BAD_REQUEST,
      err: error
    });
  }

  public async unauthorized(
    res: express.Response,
    error: Error | string | any,
    next: express.NextFunction
  ) {
    await next({
      status: StatusCodes.UNAUTHORIZED,
      message: error.errorValue().message
        ? error.errorValue().message
        : ReasonPhrases.UNAUTHORIZED,
      err: error
    });
  }

  public async paymentRequired(
    res: express.Response,
    error: Error | string | any,
    next: express.NextFunction
  ) {
    await next({
      status: StatusCodes.PAYMENT_REQUIRED,
      message: error.errorValue().message
        ? error.errorValue().message
        : ReasonPhrases.PAYMENT_REQUIRED,
      err: error
    });
  }

  public async forbidden(
    res: express.Response,
    error: Error | string | any,
    next: express.NextFunction
  ) {
    await next({
      status: StatusCodes.FORBIDDEN,
      message: error.errorValue().message
        ? error.errorValue().message
        : ReasonPhrases.FORBIDDEN,
      err: error
    });
  }

  public async notFound(
    res: express.Response,
    error: Error | string | any,
    next: express.NextFunction
  ) {
    await next({
      status: StatusCodes.NOT_FOUND,
      message: error.errorValue().message
        ? error.errorValue().message
        : ReasonPhrases.NOT_FOUND,
      err: error
    });
  }

  public async conflict(
    res: express.Response,
    error: Error | string | any,
    next: express.NextFunction
  ) {
    await next({
      status: StatusCodes.CONFLICT,
      message: error.errorValue().message
        ? error.errorValue().message
        : ReasonPhrases.CONFLICT,
      err: error
    });
  }

  public async tooMany(
    res: express.Response,
    error: Error | string | any,
    next: express.NextFunction
  ) {
    await next({
      status: StatusCodes.TOO_MANY_REQUESTS,
      message: error.errorValue().message
        ? error.errorValue().message
        : ReasonPhrases.TOO_MANY_REQUESTS,
      err: error
    });
  }

  public todo(res: express.Response) {
    return BaseController.jsonResponse(res, 400, 'TODO');
  }

  public async fail(
    res: express.Response,
    error: Error | string | any,
    next: express.NextFunction
  ) {
    await next({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.errorValue(),
      err: error
    });
  }
}
/* eslint-enable  @typescript-eslint/no-explicit-any */
