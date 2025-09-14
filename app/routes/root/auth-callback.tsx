import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleAuth() {
      try {
        // ✅ Check current user session
        const user = await account.get();
        console.log("AuthCallback user:", user);

        // ✅ See if user already exists in DB
        let existingUser = await getExistingUser(user.$id);

        if (!existingUser) {
          existingUser = await storeUserData(user);
        }

        // ✅ Redirect based on role
        if (existingUser?.status === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Auth callback failed:", err);
        navigate("/sign-in");
      }
    }

    handleAuth();
  }, [navigate]);
  async function getAccount() {
    try {
      const session = await account.getSession("current");
      const user = await account.get();
      console.log(user);
      if (!session) {
        console.error("No active session found");
        console.error("No active session found");
      }

      //   const user = await account.get();
      //   console.log(user);
    } catch (error) {
      console.log("RUSLAN - i didnt find the account", error);
    }
  }

  return (
    <p>
      Finalizing sign-in, please wait...
      {/* <button onClick={getAccount}>HITME</button> */}
    </p>
  );
}
