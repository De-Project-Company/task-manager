import React from "react";
import SignupForm from "@/components/form/Signup";
import OTPModal from "@/components/modals/VerifyModal";

const Signup = () => {
  return (
    <>
      <SignupForm />
      <OTPModal />
    </>
  );
};

export default Signup;
