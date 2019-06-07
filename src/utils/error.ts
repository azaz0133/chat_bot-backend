import { ERROR } from "./log";

export function seperateError(error: any, path: string): any {
  if (error.response.data.message == undefined) {
    ERROR("STANDARD ERROR ", path);
    return error;
  } else {
    ERROR(error.response.data.message, path);
    return new Error(error.response.data.message);
  }
}
