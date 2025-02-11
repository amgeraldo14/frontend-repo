"use client";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import {
  setError,
  setSuccess,
  setLoading,
  clearMessages,
} from "@/store/reducer";
import StatusMessage from "@/components/atoms/StatusMessage";
const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearMessages());
    dispatch(setLoading(true));
    const { email, password } = formState;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(setSuccess("Firebase Auth Success"));
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
        console.log({ errorCode, errorMessage });
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    setFormState((prev) => {
      return {
        ...prev,
        [key]: e.target.value,
      };
    });
  };
  return (
    <Container className="h-screen  flex items-center justify-center">
      <Card className="w-full max-w-md ">
        <CardHeader title="Login" className="text-center" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} className="mb-4">
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                className="w-full"
                size="small"
                value={formState.email}
                onChange={handleOnChange}
              />
              <TextField
                name="password"
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                className="w-full"
                size="small"
                value={formState.password}
                onChange={handleOnChange}
              />
            </Stack>
            <Button className="w-full" variant="contained" type="submit">
              Submit
            </Button>
          </form>
          <StatusMessage />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
