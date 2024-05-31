import { redirect } from "next/navigation";
import CasesTable from "./CasesTable";
import { signOut } from "next-auth/react";
export default function CasesView() {
  async function signOutLocal() {
    await signOut();
    window.location.href = "/login";
  }

  return (
    <>
      <div className="cases-dashboard-title-container  flex flex-row justify-between">
        <div className="heading">
          <h1 className="cases-dashboard-title text-2xl font-medium">
            My Cases
          </h1>
        </div>
        <div className="button">
          <button
            className="bg-black text-white text-sm font-medium py-2 px-4 rounded-lg"
            onClick={() => (window.location.href = "/dashboard/create")}
          >
            New Case
          </button>{" "}
          <button
            className="bg-black text-white text-sm font-medium py-2 px-4 rounded-lg"
            onClick={() => signOutLocal()}
          >
            Logout
          </button>{" "}
        </div>
      </div>

      <CasesTable />
    </>
  );
}
