import Axios from "axios";
import { API_PROXY } from "../../constants";
import { ERROR, INFO } from "../../utils/log";
import { seperateError } from "../../utils/error";

export class MIntents {
  public findAll = async () => {
    try {
      INFO("Begin Fetch get all intents");
      const {
        data: { data },
        status
      } = await Axios.get(API_PROXY + "/proxy/get/intents");
      if (status != 200) {
        ERROR("status code not equal 200", __dirname + " 12");
        throw new Error("something wrong");
      }

      INFO("Convert data intents");
      const results = (data as Array<any>).map(d => {
        return {
          displayName: d["displayName"]
        };
      });
      return results;
    } catch (error) {
      throw seperateError(error, __dirname + 28);
    }
  };

  public findOne = async (name: string) => {
    try {
      INFO("GET ALL WITH FUNCTION GET ALL INTENTS ");
      const getAll = await this.findAll();
      INFO("START FILTER TEXT");
      const results = getAll.filter(({ displayName }) => {
        return (
          (displayName as string).substr(0, name.length).toLowerCase() ==
          name.toLowerCase()
        );
      });
      if (results.length == 0) {
        return [];
      } else return results;
    } catch (error) {
      throw seperateError(error, __dirname + 36);
    }
  };

  public create = async () => {
    try {
    } catch (error) {}
  };
}
