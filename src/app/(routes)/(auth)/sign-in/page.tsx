import React from "react";
import { SignInForm } from "./_components/sign-in-form";

export default function SignInPage() {
  return (
    <React.Suspense>
      <SignInForm />
    </React.Suspense>
  )
}
