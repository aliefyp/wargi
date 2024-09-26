import useLogin from "@/api/auth/useLogin";
import { title } from "@/components/primitives";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useForm } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { toast } from "react-toastify";

interface FormValues {
  identifier: string;
  password: string;
  // residence_code?: string;
}

function Login() {
  const { formState: { errors }, register, handleSubmit } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const signIn = useSignIn();

  const login = useLogin();

  const submitForm = (data: FormValues) => {
    login.mutateAsync(data)
      .then((response) => {
        toast("Login success", { type: "success" });
        signIn({
          auth: {
            token: response.jwt,
            type: "Bearer",
          },
          userState: response.user,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form noValidate onSubmit={handleSubmit(submitForm)}>
      <Card>
        <CardHeader className="pt-8 text-center">
          <h3 className={title()}>Login</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Tabs
              fullWidth
              color="primary"
              aria-label="Admin or Residence"
              selectedKey={isAdmin ? "admin" : "residence"}
              onSelectionChange={(key) => setIsAdmin(key === "admin")}
            >
              <Tab key="residence" title="Sebagai Warga">
                <div className="space-y-2">
                  <Input
                    required
                    label="Email"
                    placeholder="Masukaan email Anda"
                    color={errors.identifier ? "danger" : "default"}
                    description={errors.identifier ? errors.identifier.message : ""}
                    {...register("identifier", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {/* <Input
                    required
                    label="Kode Perumahan"
                    placeholder="contoh: SAN123"
                    color={errors.residence_code ? "danger" : "default"}
                    description={errors.residence_code ? errors.residence_code.message : ""}
                    {...register("residence_code", {
                      required: "Residence code is required",
                      pattern: {
                        value: /^[0-9]{4}$/,
                        message: "Invalid residence code",
                      },
                    })}
                  /> */}
                </div>
              </Tab>
              <Tab key="admin" title="Sebagai Pengurus">
                <div className="space-y-2">
                  <Input
                    required
                    label="Email"
                    placeholder="Masukaan email Anda"
                    color={errors.identifier ? "danger" : "default"}
                    description={errors.identifier ? errors.identifier.message : ""}
                    {...register("identifier", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <Input
                    required
                    label="Password"
                    placeholder="Min. 8 karakter"
                    type={showPassword ? "text" : "password"}
                    color={errors.password ? "danger" : "default"}
                    description={errors.password ? errors.password.message : ""}
                    endContent={
                      <div className="h-full p-2 flex items-center justify-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                      </div>
                    }
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: "Password must contain at least 8 characters, including letters and numbers",
                      },
                    })}
                  />
                </div>
              </Tab>
            </Tabs>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            color="primary"
            fullWidth
            size="lg"
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default Login;