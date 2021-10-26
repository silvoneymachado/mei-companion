import { User } from "../../util/models";
import { api } from "../api";

type SignInRequestData = {
  email: string;
  password: string;
};

type SigninResponseData = {
  token: string;
  user: User;
};

export function signInRequest(
  data: SignInRequestData
): Promise<SigninResponseData> {
  return new Promise((resolve, reject) => {
    try {
      api.post<SigninResponseData>("/api/signin", data).then((res) => {
        resolve({
          token: res.data.token,
          user: res.data.user,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}
