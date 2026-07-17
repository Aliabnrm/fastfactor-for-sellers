import type { NextFunction, Request, Response } from "express";

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export const catchAsync =
  <
    P = Record<string, string>,
    ResBody = any,
    ReqBody = any,
    ReqQuery = Request["query"],
    Locals extends Record<string, any> = Record<string, any>,
  >(
    fn: (
      req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
      res: Response<ResBody, Locals>,
      next: NextFunction,
    ) => Promise<unknown>,
  ): AsyncRequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(
      fn(
        req as Request<P, ResBody, ReqBody, ReqQuery, Locals>,
        res as Response<ResBody, Locals>,
        next,
      ),
    ).catch(next);
  };
