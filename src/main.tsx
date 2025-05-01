import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/react-router";

const ProtectedRoute = () => (
  <>
    <SignedIn>
      <Outlet></Outlet>
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        signInForceRedirectUrl={"/"}
      >
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<App />} />
            <Route path="/*" element={<App />} />
            <Route path="/test" element={<p>test</p>} />
          </Route>
          <Route path="/v3" element={<ProtectedRoute />}>
            <Route index element={<App />} />
            <Route path="/v3/*" element={<App />} />
            <Route path="/v3/test" element={<p>test v3</p>} />
          </Route>
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
