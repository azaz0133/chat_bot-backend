import { MSession } from "./model";
import { Request, Response } from "express";

export class CSession {
  private model: MSession;

  constructor() {
    this.model = new MSession();
  }

  // public login = (
  //     req:Request,
  //     res: Response
  // ):any => {
  //     const {
  //         username,password
  //     } = req.body

  // }

  public login = async (req: Request, res: Response) => {
    try {
      const token: string = await this.model.authen(
        req.body.username,
        req.body.password
      );
      console.log("[info] AUTHEN");
      console.log("[info] TOKEN " + token);
      return res
        .header("authorization", "Bearer " + token)
        .json({
          status: "logged in",
          message: "sent token already",
          token
        })
        .status(201);
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            status:"fail",
            message: error.message
        });
    }
  };

  public getUser = async (req: Request, res: Response) => {
    try {
      const users = await this.model.getUser();
      return res
        .json({
          status: "ok",
          message: "get mockup user",
          results: users
        })
        .status(201);
    } catch (error) {
      console.log(error);
      return res.json({
          status:"fail",
          message: error.message
      });
    }
  };
}
