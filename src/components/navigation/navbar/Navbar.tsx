"use client";
import NavbarClosed from "./NavBarClosed";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/dashboard/Loader";

type NavbarProps = {
  children: React.ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
  const { data: session, status } = useSession();

  let authenticated = false;

  if (status !== "unauthenticated" && status !== "authenticated") {
    return <Loader display={true} />;
  }

  if (status === "unauthenticated") {
    window.location.href = "/login";
  }

  if (status === "authenticated") {
    authenticated = true;
  }

  return <>{authenticated && <NavbarClosed>{children}</NavbarClosed>}</>;
}
