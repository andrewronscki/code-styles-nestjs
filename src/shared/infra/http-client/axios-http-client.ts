import axios, { AxiosResponse } from 'axios';

import {
  HttpRequest,
  HttpResponse,
  HttpClient,
  HttpStatusCode,
} from '../../data';

export class AxiosHttpClient implements HttpClient {
  async post<T>(url: string, body: any): Promise<HttpResponse<T>> {
    return await this.request({
      method: 'post',
      url,
      body,
    });
  }

  async get<T>(url: string): Promise<HttpResponse<T>> {
    return await this.request({
      method: 'get',
      url,
    });
  }

  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        auth: data.auth,
        headers: data.headers,
        responseType: data.responseType,
      });
    } catch (error: any) {
      axiosResponse = error.response;

      if (axiosResponse === undefined) {
        return {
          statusCode: HttpStatusCode.serverError,
          body: {},
        };
      }
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
