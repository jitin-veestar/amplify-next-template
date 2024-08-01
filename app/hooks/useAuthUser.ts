import { useEffect, useState } from "react";
import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";

export default function useAuthUser() {
  const [user, setUser] = useState<Record<string, any>>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          setLoading(false);
          return;
        }
        const user = {
          ...(await getCurrentUser()),
          ...(await fetchUserAttributes()),
          isAdmin: false,
        };
        const groups = session.tokens.accessToken.payload["cognito:groups"];
        // @ts-ignore
        user.isAdmin = Boolean(groups && groups.includes("Admins"));
        setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  return { user, loading };
}
