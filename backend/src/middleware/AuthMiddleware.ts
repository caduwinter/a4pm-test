import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import GenericView from "../views/GenericView";
import { config } from "../config/config";

interface DecodedToken {
  id: number;
}

function mustBeAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const token = req.cookies.token;

  if (!token) {
    const view = new GenericView(req, res);
    view.send({ message: "Acesso não autorizado" }, 401);
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    const view = new GenericView(req, res);
    view.send({ message: "Token inválido" }, 401);
  }
}

export default mustBeAuthenticated;
