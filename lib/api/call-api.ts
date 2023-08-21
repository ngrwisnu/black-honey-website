import axios, { AxiosRequestConfig } from "axios";

interface CallAPIProps extends AxiosRequestConfig {
  token?: string;
}

const callAPI = async ({ url, method = "GET", data, token }: CallAPIProps) => {
  try {
    let headers = {};

    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await axios({
      url,
      method,
      data,
      headers,
    });

    if (response) {
      return {
        isError: false,
        data: response.data,
      };
    }
  } catch (error: any) {
    if (error.response) {
      return {
        isError: true,
        data: error.response.data,
      };
    } else {
      return {
        isError: true,
        data: error.message,
      };
    }
  }
};

export default callAPI;
