"use client";
import Navbar from "../../components/navigation/navbar/Navbar";
import CasesView from "../../components/dashboard/CasesView";
import { SessionProvider } from "next-auth/react";
export default function DashboardPage() {
  return (
    <>
      <SessionProvider>
        <Navbar>
          <CasesView />
        </Navbar>
      </SessionProvider>
    </>
  );
}
