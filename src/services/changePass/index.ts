import { User } from "../../util/models";
import { api } from "../api";

const basePath = "/api/changePass/";

export function changePass(data: User): Promise<User> {
  return new Promise((resolve, reject) => {
    try {
      api.put<User>(basePath, data).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}
