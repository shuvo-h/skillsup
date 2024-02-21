/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";

import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { userManagementAPI } from "../redux/features/admin/userManagement.api";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/storeHook";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [changePasswordMutation, { data, isLoading, error }] =
    userManagementAPI.useChangePasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    const toastId = toast.loading("changing password");
    try {
      console.log(data);

      const response = await changePasswordMutation(data).unwrap(); // unwrap means only return the response data, not all a=object
      if (!response?.data?.success) {
        dispatch(logout());
      }
      toast.success("password changed successfull", {
        id: toastId,
        duration: 2000,
      });
      console.log(response);

      navigate(`/login`);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput
          type="password"
          name="oldPassword"
          label="oldPassword"
          // defaultValue='A-0001'
          id="oldPassword"
        />

        <PHInput
          type="password"
          name="newPassword"
          id="newPassword"
          // defaultValue='admin123'
          label="newPassword"
        />

        <Button htmlType="submit">change password</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
