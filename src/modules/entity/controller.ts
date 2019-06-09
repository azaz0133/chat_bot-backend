import { MEntity } from "./model";
import { Request, Response } from "express";

export class CEntity {
  private _model: MEntity;

  constructor() {
    this._model = new MEntity();
  }

  public getAll = async (req: Request, res: Response) => {
    if (req.query.displayName != undefined) {
        try {
            const result = await this._model.findOne(req.query.displayName)
            return res.status(200).json({
              status: "ok",
              message: "get entities",
              result
            });
          } catch (error) {
            return res.status(400).json({
              status: "fail",
              message: error.message
            });
          }
    } else {
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
    }
  };

  public create = async (req: Request, res: Response) => {
    const { displayName, entities } = req.body;

    if (!displayName || !entities) {
      return res.status(400).json({
        status: "failure",
        message: "wrong data"
      });
    }

    try {
      const result = await this._model.addEntity(displayName, entities);
      return res.status(201).json({
        status: "created",
        result
      });
    } catch (error) {
      return res.status(400).json({
        status: "failure",
        message: error.message
      });
    }
  };
}
