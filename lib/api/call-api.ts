import axios, { AxiosError, AxiosRequestConfig } from "axios";
interface CallAPIProps extends AxiosRequestConfig {
  token?: string;
}

const callAPI = async ({
  url,
  method = "GET",
  data,
  withCredentials,
  token,
}: CallAPIProps) => {
  try {
    let headers;

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
      withCredentials,
    });

    if (response) {
      return {
        isError: false,
        data: response.data,
      };
    }
  } catch (error: any) {
    if (error.response || error instanceof AxiosError) {
      switch (error.code) {
        case "ERR_NETWORK":
          return {
            isError: true,
            data: {
              message: "The server is currently unavailable!",
            },
          };

        default:
          return {
            isError: true,
            data: error.response.data,
          };
      }
    } else {
      return {
        isError: true,
        data: {
          message: "Something went wrong!",
        },
      };
    }
  }
};

export default callAPI;
