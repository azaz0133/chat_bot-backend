import Axios from "axios";
import { API_PROXY } from "../../constants";
import { seperateError } from "../../utils/error";
import { INFO } from "../../utils/log";
import { IEntity } from "./interface";

export class MEntity {
  public findAll = async () => {
    try {
      INFO("start get all entities");
      const {
        data: { data },
        status
      } = await Axios.get(API_PROXY + "/proxy/df/get/entities");
      if (status == 400) {
        throw new Error("Something Wrong");
      }
      INFO("start map data for return");
      const results = (data as Array<any>).map(d => d);
      return results;
    } catch (error) {
      throw seperateError(error, __dirname + 18);
    }
  };

  public addEntity = async (displayName: string, entities: IEntity[]) => {
    try {
      INFO("BEGIN CREATE ENTITY");
      const {
        data: { data },
        status
      } = await Axios.post(API_PROXY + "/proxy/df/create/entity", {
        displayName,
        entities
      });

      if (status == 200) {
        return data;
      }

      throw new Error("add fail");
    } catch (error) {
      throw seperateError(error, __dirname + 41);
    }
  };
}
