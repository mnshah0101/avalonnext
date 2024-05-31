import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Loader from "../dashboard/Loader";

type CheckStatusProps = {
  children: React.ReactNode;
};

export default function CheckStatus({ children }: CheckStatusProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/dashboard";
    }
  }, [status]);

  if (status === "loading") {
    return <Loader display={true} />;
  }

  if (status === "unauthenticated") {
    return <>{children}</>;
  }
}
