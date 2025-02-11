"use client";
import { Button, Container } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { setError } from "@/store/reducer";
import StatusMessage from "@/components/atoms/StatusMessage";
import WithAuth from "@/lib/WithAuth";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userData } = useAppSelector((state) => state.auth);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        dispatch(setError("Error on Firebase logout"));
        console.log({ error });
      });
  };
  return (
    <WithAuth>
      <Container>
        <Button variant="outlined" onClick={handleSignOut}>
          Sign Out
        </Button>
        <p>{JSON.stringify(userData)}</p>
        <StatusMessage />
      </Container>
    </WithAuth>
  );
}
