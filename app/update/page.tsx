import { Suspense } from "react";
import UpdateClient from "./UpdateClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateClient />
    </Suspense>
  );
}