declare module "cookie-parser" {
  import { RequestHandler } from "express";

  function cookieParser(secret?: string | null, options?: any): RequestHandler;

  export = cookieParser;
}
