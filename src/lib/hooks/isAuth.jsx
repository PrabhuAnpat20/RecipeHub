"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./useAuth";

export default function isAuth(Component) {
  return function IsAuth(props) {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (user) {
        router.push("/");
        return;
      }
    }, [user]);

    // if (auth) {
    //   return <main className="bg-[#FAFAFA] h-screen"></main>;
    // }

    return <Component {...props} />;
  };
}
