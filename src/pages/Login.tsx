import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in successfully", { id: toastId, duration: 3000 });
      navigate(`/${user.role}/dashboard`);
    } catch {
      toast.error("Invalid credentials", { id: toastId, duration: 3000 });
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <Card className="w-1/4 mt-20">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Login to your account
            </CardDescription>
          </CardHeader>
          <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <CardContent className="space-y-2">
              <PHInput name="id" type="text" label="ID" />
              <PHInput name="password" type="password" label="Password" />
            </CardContent>
            <CardFooter>
              <Button htmlType="submit" className="mx-auto">
                Login
              </Button>
            </CardFooter>
          </PHForm>
        </Card>
      </div>
    </div>
  );
}
