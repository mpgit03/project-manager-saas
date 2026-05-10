"use client";

import { useAuth }
from "@/context/AuthContext";

import { useRouter }
from "next/navigation";

import { useEffect }
from "react";

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
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return children;
}