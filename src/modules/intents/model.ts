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

  public create = async (
    displayName: string,
    training_phrases: Array<any>,
    parameters: Array<any>
  ) => {
    try {
      const { data, status } = await Axios.post(
        API_PROXY + "/df/create/intent",
        {
          displayName,
          training_phrases,
          parameters
        }
      );
      if (status == 200) {
        return data;
      } else throw new Error("fail");
    } catch (error) {
      throw error;
    }
  };
}

/*
  const training_phrases = [
    {
      name: 'phrase_name',
      type: 'EXAMPLE',
      parts: [
        {
          text: 'example text',
          entity_type: '@entity_type',
          alias: 'parameter name for extracted annotated part',
          // Indicates whether the text was manually annotated by the developer.
          user_defined: false,
        },
      ]
    }
  ]
  const parameters = [
    {
      name: 'unique name/id',
      display_name: 'name for display',
      value: 'OPTIONAL, default is parameter\'s name',
      default_value: 'when `value` is an empty result',
      // mandatory = required, if true, `entity_type_display_name` must be specified
      entity_type_display_name: '@entity_name (must have `@`)',
      mandatory: false,
      is_list: true,
    }
  ]
  */
