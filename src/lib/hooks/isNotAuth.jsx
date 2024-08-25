// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import useAuth from "./useAuth"; // Adjust the path if needed

// function isNotAuth(Component) {
//   return function IsNotAuth(props) {
//     const user = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//       if (!user) {
//         router.push("/auth"); // or wherever the authenticated users should go
//       }
//     }, [user, router]);

//     return <Component {...props} />;
//   };
// }
// export default isNotAuth;
