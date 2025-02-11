"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  setUser,
  clearUser,
  setUserData,
  setError,
  setSuccess,
  setLoading,
  clearMessages,
} from "@/store/reducer";
import { customAxios } from "./axios";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const fetchUserData = async (user: User) => {
    try {
      dispatch(clearMessages());
      dispatch(setLoading(true));
      const currentTimeStamp = new Date().getTime();
      const response = await customAxios.patch(`/user/${user.uid}`, {
        recentlyActive: currentTimeStamp,
      });
      if (!response.data) {
        throw new Error("Failed to fetch user data");
      }
      const userData = response.data;
      dispatch(setUserData(userData));
      dispatch(setSuccess("Successfuly fetched user data"));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError("Error on fetching user data"));
      console.log({ error });
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        await fetchUserData(user);
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}
