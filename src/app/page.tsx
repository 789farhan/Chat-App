"use client";
import { AuthContext } from "@/components/authcontext/AuthContext";
import Homepage from "@/components/homepage/homepage/Homepage";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Page() {
  const { currentUser }: any = useContext(AuthContext);
  const NevigateToLoginPage = useRouter();
  return (
    <>{!currentUser ? NevigateToLoginPage.push("/login") : <Homepage />}</>
  );
}
