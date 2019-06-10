import Axios from "axios";
import { API_PROXY } from "../../constants";
import { seperateError } from "../../utils/error";

export class MTest {
  public testMessage = async (message: string) => {
    try {
      const {
        data: { results },
        status
      } = await Axios.get(
        encodeURI(API_PROXY + "/proxy/message_test/" + message)
      );

      if (status != 200) {
        throw new Error("something wrong");
      }

      const result = {
        textResponses: results[0]["queryResult"]["fulfillmentMessages"].map(
          a => ({
            text: a["text"]["text"]
          })
        ),
        fulfilmentText: results[0]["queryResult"]["fulfillmentText"],
        intentName: results[0]["queryResult"]["intent"]["displayName"]
      };
      return result;
    } catch (error) {
      throw seperateError(error, __dirname + " 27");
    }
  };
}
