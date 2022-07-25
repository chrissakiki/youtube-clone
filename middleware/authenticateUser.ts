import express from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index";

export interface CustomRequest extends express.Request {
  user: string | JwtPayload;
}
const authenticateUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) {
    throw new UnAuthenticatedError("Expired token! Please login again.");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = payload;

    next();
  } catch (error: any) {
    throw new UnAuthenticatedError("Expired token");
  }
};

export { authenticateUser };
