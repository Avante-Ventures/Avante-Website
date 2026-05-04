import { RouterProvider } from "react-router";
import { router } from "@/app/routes.tsx";

export { AppContent } from "./AppContentWrapper.tsx";

export default function App() {
  return <RouterProvider router={router} />;
}
