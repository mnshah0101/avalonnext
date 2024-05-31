"use client";
import RachelRender from "@/components/rachel/RachelRender";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export default function RachelPage() {
  return (
    <>
      <SessionProvider>
        <RachelRender />
      </SessionProvider>
    </>
  );
}
