import { User } from "../../util/models";
import { api } from "../api";

const basePath = "/api/user/";

export function updateUser(data: User): Promise<User> {
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

export function getUserById(id: number): Promise<User> {
  return new Promise((resolve, reject) => {
    try {
      api.get<User>(`${basePath}${id}`).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function removeUser(id: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      api.delete(`${basePath}${id}`).then((res) => {
        if (res.status) {
          resolve(true);
        } else {
          reject();
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
