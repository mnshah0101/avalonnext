"use client";
import NavbarClosed from "./NavBarClosed";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type NavbarProps = {
  children: React.ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
  const { data: session, status } = useSession();
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  console.log("session");
  console.log(session);

  useEffect(() => {
    //foward to login page if not logged in
    if (status === "unauthenticated") {
      window.location.href = "/login";
    }
  });

  return (
    <>
      <NavbarClosed>{children}</NavbarClosed>
    </>
  );
}
