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
          parameters: d["parameters"]
        };
      });
      return results;
    } catch (error) {
      throw seperateError(error, __dirname + 28);
    }
  };

  public create = async () => {
    try {
    } catch (error) {}
  };
}
