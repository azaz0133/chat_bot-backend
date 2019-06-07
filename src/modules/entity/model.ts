import Axios from "axios";
import { API_PROXY } from "../../constants";
import { seperateError } from "../../utils/error";
import { INFO } from "../../utils/log";

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
}
