import { Button } from "@syncfusion/ej2-react-buttons";
import React from "react";
import { useNavigate } from "react-router";
import { logoutUser } from "~/appwrite/auth";

const PageLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
  };
  return (
    <>
      <div className="flex items-center gap-5 p-8">
        <button className="cursor-pointer" onClick={handleLogout}>
          <img
            src="/assets/icons/logout.svg"
            alt="logout"
            className="size-6 "
          />
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-2.5 bg-gradient-to-tr from-neutral-100 to-neutral-200 
text-black font-medium rounded-md border border-neutral-300 
transition duration-300 
hover:shadow hover:scale-[1.01] 
active:scale-95 active:shadow-inner"
        >
          Visit Travel Dashboard (Admins Only)
        </button>
      </div>

      {/* <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        {isAdmin ? (
          <Button
            variant="hero"
            size="lg"
            className="w-full sm:w-auto text-lg px-8 py-4 font-semibold"
          >
            Visit Dashboard
          </Button>
        ) : (
          <Button
            variant="sky"
            size="lg"
            className="w-full sm:w-auto text-lg px-8 py-4 font-semibold"
          >
            Visit User
          </Button>
        )}
      </div> */}
    </>
  );
};

export default PageLayout;
