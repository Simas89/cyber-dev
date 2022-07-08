import { AxiosResponse, AxiosError } from "axios";

export type ThenArgs<T> = T extends Promise<infer U> ? U : T;

export type AxiosArgs<T> = T extends AxiosResponse<infer U> ? U : undefined;

export type ServerError = AxiosError<{ message: string; stack: string }>;

export interface IUser {
  email: string;
}
