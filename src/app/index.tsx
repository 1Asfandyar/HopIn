import { useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/store/useAuth";

export default function Index() {
  const { user, isLoading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) return null;
  if (!user) {
    return <Redirect href="/(main)/welcome" />;
  }

  return <Redirect href="/(main)/dashboard" />;
}