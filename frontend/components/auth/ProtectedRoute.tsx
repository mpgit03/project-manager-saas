"use client";

import { useAuth }
from "@/context/AuthContext";

import { useRouter }
from "next/navigation";

import { useEffect }
from "react";

import LoadingState from "../common/LoadingState";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router =
    useRouter();

  const {
    token,
    loading,
  } = useAuth();

  useEffect(() => {

    if (loading) return;

    if (!token) {
      router.push("/login");
    }

  }, [
    token,
    loading,
    router,
  ]);

  if (loading) {
  return (
    <LoadingState message="Loading ..." />
  );
}

  if (!token) {
    return null;
  }

  return children;
}