import { Request, Response } from "express";

export default class GenericView {
  req: Request;
  res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  send(data: any, statusCode: number = 200) {
    if (!this.res.headersSent) this.res.status(statusCode).json(data);
  }
  clearCookie(cookie: string): void {
    this.res.clearCookie(cookie);
  }
  generateCookie(cookie: string, token: string): void {
    this.res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000,
    });
  }
}
