"use client";

import { Suspense } from "react";
import ChangePasswordClient from "./ChangePasswordClient";

export default function ChangePasswordPage() {
  return (
    <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <ChangePasswordClient />
    </Suspense>
  );
}
