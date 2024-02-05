import { toast } from "sonner";
import { TResponse, TResponseRedux } from "../types";

type TToastOption = {
  toastId?: number | string;
  isToast?: boolean;
};
export const apiResponseHandler = <T>(
  apiResponse: TResponseRedux<T>,
  { toastId, isToast = true }: TToastOption = {}
) => {
  const toastOption: Record<string, unknown> = { duration: 2000 };
  if (toastId) {
    toastOption["id"] = toastId;
  }
  let responseMessage = "Something went wrong";
  if ("data" in apiResponse && apiResponse.data) {
    const { data } = apiResponse;
    // success message
    if (data) {
      const {success,message} = data as unknown as TResponse<T>;
      if (isToast && success) {
        toast.success(message, toastOption);
      }
      responseMessage = message;
      return { isSuccess: true, data };
    }
  } else if ("error" in apiResponse) {
    // error message
    if (apiResponse.error?.data) {
      const { success, message } = apiResponse.error.data;
      if (!success) {
        responseMessage = message;
        toast.error(message, toastOption);
      }
    }
  } else {
    toast.error(responseMessage, toastOption);
  }
  return { isSuccess: false, data: null, message: responseMessage };
};
