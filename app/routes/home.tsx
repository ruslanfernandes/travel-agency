import { redirect } from "react-router";
import { getExistingUser } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export async function clientLoader() {
  try {
    const user = await account.get();
    const existingUser = await getExistingUser(user.$id);
    if (!existingUser) return redirect("/sign-in");
    if (existingUser?.status === "user") {
      return redirect("/");
    }
  } catch (e: any) {
    if (e?.code === 401) {
      // Not logged in → allow rendering of SignIn page
      console.error("Sign-in page error", e);
      return null;
    }
    console.error("Unexpected error fetching user:", e);
    return null;
  }
}

const Home = () => {
  return <div>Welcome User</div>;
};

export default Home;
