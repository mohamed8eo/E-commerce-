import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}