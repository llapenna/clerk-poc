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
        // signInUrl="/sign-in"
        // afterSignOutUrl={"https://concourse.co"}
        // signInFallbackRedirectUrl={"/"}
        // signUpFallbackRedirectUrl={"/"}
        // signInForceRedirectUrl={"/sign-in"}
        signInForceRedirectUrl={"/"}
        // signInUrl="/sign-in"
        // signUpUrl="/sign-up"
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
          {/* <Route
            path="*"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<SignInButton />} /> */}
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
