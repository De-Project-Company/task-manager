import React from "react";
import ResetPasswordForm from "@/components/form/resetPassword";

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

const PasswordReset = ({ searchParams: { token } }: PageProps) => {
//   console.log(token);
  return (
    <>
      <ResetPasswordForm token={token} />
    </>
  );
};

export default PasswordReset;