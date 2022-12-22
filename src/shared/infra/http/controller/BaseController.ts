import * as express from 'express';
import { injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { logger } from '@core/logger/LoggerV1';

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
      this.fail(res, 'An unexpected error occurred', next);
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

  public clientError(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      StatusCodes.BAD_REQUEST,
      message ? message : ReasonPhrases.BAD_REQUEST
    );
  }

  public unauthorized(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      StatusCodes.UNAUTHORIZED,
      message ? message : ReasonPhrases.UNAUTHORIZED
    );
  }

  public paymentRequired(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      StatusCodes.PAYMENT_REQUIRED,
      message ? message : ReasonPhrases.PAYMENT_REQUIRED
    );
  }

  public forbidden(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      StatusCodes.FORBIDDEN,
      message ? message : ReasonPhrases.FORBIDDEN
    );
  }

  public notFound(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      StatusCodes.NOT_FOUND,
      message ? message : ReasonPhrases.NOT_FOUND
    );
  }

  public conflict(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      StatusCodes.CONFLICT,
      message ? message : ReasonPhrases.CONFLICT
    );
  }

  public tooMany(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      StatusCodes.TOO_MANY_REQUESTS,
      message ? message : ReasonPhrases.TOO_MANY_REQUESTS
    );
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
