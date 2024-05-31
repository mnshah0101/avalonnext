"use client";
import { useEffect } from "react";
export default function Home() {
  //redirect to dashboard
  useEffect(() => {
    window.location.href = "/dashboard";
  });

  return <></>;
}
