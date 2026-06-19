import { RouterProvider } from "react-router";
import { router } from "@/app/routes.tsx";
import { AvtSplash } from "@/app/components/AvtSplash";

export { AppContent } from "./AppContentWrapper.tsx";

// AvtSplash mounts as a sibling to the router so it can overlay any route
// (including 404s and lazy-loading transitions). It self-gates via
// sessionStorage, fires once per browsing session, then unmounts.
export default function App() {
  return (
    <>
      <AvtSplash />
      <RouterProvider router={router} />
    </>
  );
}
