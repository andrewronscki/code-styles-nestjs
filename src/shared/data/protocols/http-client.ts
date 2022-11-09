export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
  auth?: any;
  responseType?: 'json' | 'arraybuffer';
};

export interface HttpClient<R = any> {
  get<T>(url: string): Promise<HttpResponse<T>>;
  post<T>(url: string, body: any): Promise<HttpResponse<T>>;
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete';

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  notAcceptable = 406,
  unprocessableEntity = 422,
  serverError = 500,
  serviceUnavailable = 503,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};
