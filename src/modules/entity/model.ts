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
      const results = (data as Array<any>).map(d => ({
        displayName: d["displayName"],
        entites: d["entities"].map(m => ({
          value: m["value"],
          synonyms: m["synonyms"]
        }))
      }));
      return results;
    } catch (error) {
      throw seperateError(error, __dirname + 18);
    }
  };

  public findOne = async (displayName: string) => {
    const data = await this.findAll();
    return data.filter(
      d =>
        (d.displayName as string).substr(0, displayName.length).toLowerCase() ==
        displayName.toLowerCase()
    );
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
