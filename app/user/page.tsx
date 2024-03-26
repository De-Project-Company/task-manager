"use client";

import React from "react";
// import
import { useSession } from "next-auth/react";

const AcceptPage = () => {
  const session = useSession();

  console.log(session);


  return <section>page</section>;
};

export default AcceptPage;
