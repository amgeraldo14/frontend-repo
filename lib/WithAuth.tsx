import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "./firebase";

import React from "react";

const WithAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [router]);

  return <div>{children}</div>;
};

export default WithAuth;
