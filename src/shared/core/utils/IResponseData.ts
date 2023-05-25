export interface IResponseData<T> {
  status: string;
  data: T;
  message: string;
  errors: any[];
  code: string | undefined;
  errorRef: any;
}
