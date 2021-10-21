import { api } from "../api";

type SignInRequestData = {
  email: string;
  password: string;
};

type SigninResponseData = {
  token: string;
  user: {
    name: string;
    email: string;
  };
};

export function signInRequest(data: SignInRequestData): Promise<SigninResponseData> {
return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post<SigninResponseData>("/api/signin", data);
  
      console.log(res.data);
      resolve({
        token: res.data.token,
        user: res.data.user,
      });
    } catch (error) {
      reject(error);
    }
})
}
 