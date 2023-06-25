import {
  Button,
  Checkbox,
  InputAdornment,
  OutlinedInput,
  Typography,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import GoogleIcon from "@mui/icons-material/Google";
import { setup } from "@/config/setup";
import { useRouter } from "next/router";
import { UserContext } from "./AuthContext";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";

export default function LoginCard({ setSign }: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginGoogle, login } = useContext(UserContext);
  const onSubmit = (data: any) => {
    const errors = login(data.email, data.password);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <OutlinedInput
        className="input-login"
        error={errors.email !== undefined}
        startAdornment={
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        }
        {...register("email", {
          required: true,
        })}
      />
      <br />
      <OutlinedInput
        className="input-login"
        error={errors.password !== undefined}
        startAdornment={
          <InputAdornment position="start">
            <LockPersonIcon />
          </InputAdornment>
        }
        {...register("password", {
          required: true,
        })}
        type="password"
      />
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox />
          <Typography>Remember me</Typography>
        </div>
        <Typography>Forgot password</Typography>
      </div>
      <Button
        variant="contained"
        style={{ backgroundColor: "#F5A524" }}
        fullWidth
        onClick={() => {
          loginGoogle();
        }}
      >
        <GoogleIcon style={{ fontSize: "1.5rem", marginRight: "1rem" }} />
        Đăng nhập bằng google
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1.5rem",
        }}
      >
        <Button
          sx={{
            color: "black",
          }}
          onClick={() => {
            router.push("/");
          }}
        >
          quay về
        </Button>
        <div>
          <Button
            sx={{
              color: "black",
            }}
            onClick={() => {
              setSign(true);
            }}
          >
            Đăng kí
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: setup.navigationColor,
              color: "black",
            }}
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </form>
  );
}
