import { MIntents } from "./model";
import { Response, Request } from "express";

export class CIntents {
  private _model: MIntents;

  constructor() {
    this._model = new MIntents();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const results = await this._model.findAll();
      return res.status(200).json({
        status: "ok",
        message: "get all intents",
        results
      });
    } catch (error) {
      return res.status(404).json({
        status: "fail",
        message: error.message
      });
    }
  };

  public getByDisplayName = async (req: Request, res: Response) => {
    const { displayName } = req.params;
    try {
      const results = await this._model.findOne(displayName as string);
      return res.status(200).json({
        status: "ok",
        message: "get all intents",
        results
      });
    } catch (error) {
      return res.status(404).json({
        status: "fail",
        message: error.message
      });
    }
  };
}
