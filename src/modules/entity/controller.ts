import { MEntity } from "./model";
import { Request, Response } from "express";

export class CEntity {
  private _model: MEntity;

  constructor() {
    this._model = new MEntity();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const results = await this._model.findAll();
      return res.status(200).json({
        status: "ok",
        message: "get all entities",
        results
      });
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        message: error.message
      });
    }
  };
}
