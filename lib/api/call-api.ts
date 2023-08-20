import axios, { AxiosRequestConfig } from "axios";

interface CallAPIProps extends AxiosRequestConfig {}

const callAPI = async ({ url, method = "GET", data }: CallAPIProps) => {
  try {
    let headers = {};

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
