import { MTest } from "./model";
import { Request, Response } from "express";

export class CTest {
  private _model: MTest;

  constructor() {
    this._model = new MTest();
  }

  public getTestMessage = async (req: Request, res: Response) => {
    const { message } = req.params;
    try {
      const result = await this._model.testMessage(message);
      return res.status(200).json({
        statusCode: 200,
        status: "ok",
        message: "get test message",
        result
      });
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        message: error.message
      });
    }
  };
}
