import { Config } from "../../util/models";
import { api } from "../api";

const basePath = "/api/config/";

export function addConfig(data: Config): Promise<Config> {
  return new Promise((resolve, reject) => {
    try {
      api.post<Config>(basePath, data).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function updateConfig(data: Config): Promise<Config> {
  return new Promise((resolve, reject) => {
    try {
      api.put<Config>(basePath, data).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function getAllConfigs(): Promise<Config[]> {
  return new Promise((resolve, reject) => {
    try {
      api.get<Config[]>(basePath).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function getConfigById(id: number): Promise<Config> {
  return new Promise((resolve, reject) => {
    try {
      api.get<Config>(`${basePath}${id}`).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function removeConfig(id: number): Promise<boolean> {
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
