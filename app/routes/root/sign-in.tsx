import { Link, redirect } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import {
  getExistingUser,
  loginWithGoogle,
  storeUserData,
} from "~/appwrite/auth";
import { account, appwriteConfig, database } from "~/appwrite/client";
import { ID } from "appwrite";

export async function clientLoader() {
  try {
    const user = await account.get();
    const existingUser = await getExistingUser(user.$id);
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

const SignIn = () => {
  async function insertDummyUser() {
    try {
      const newUser = await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(), // unique id for the document
        {
          name: "Test User",
          email: "test@example.com",
          accountId: "dummy123",
          imageUrl: "https://i.pravatar.cc/150?u=dummy123",
          joinedAt: new Date().toISOString(),
        }
      );
      console.log("Dummy user inserted:", newUser);
      return newUser;
    } catch (error) {
      console.error("Error inserting dummy user:", error);
      throw error;
    }
  }

  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link to="/">
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="size-[30px]"
              />
            </Link>
            <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
          </header>

          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">
              Start Your Travel Journey
            </h2>

            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with Google to manage destinations, itineraries, and user
              activity with ease.
            </p>
          </article>

          <ButtonComponent
            type="button"
            iconCss="e-search-icon"
            className="button-class !h-11 !w-full"
            onClick={insertDummyUser}
          >
            Dummy
          </ButtonComponent>

          <ButtonComponent
            type="button"
            iconCss="e-search-icon"
            className="button-class !h-11 !w-full"
            onClick={loginWithGoogle}
          >
            <img
              src="/assets/icons/google.svg"
              className="size-5"
              alt="google"
            />
            <span className="p-18-semibold text-white">
              Sign in with Google
            </span>
          </ButtonComponent>
        </div>
      </section>
    </main>
  );
};
export default SignIn;
