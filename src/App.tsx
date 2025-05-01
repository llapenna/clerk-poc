import React from "react";

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  OrganizationSwitcher,
  SignOutButton,
  useAuth,
  useOrganization,
  useOrganizationList,
  useUser,
} from "@clerk/react-router";

function App() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const { organization } = useOrganization();
  const list = useOrganizationList();

  const [count, setCount] = useState(0);
  console.log({ user, organization, organizations: list });

  const handleClick = async () => {
    const token = await getToken();
    return fetch("http://localhost:3000/protected", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <>
      <button onClick={handleClick}>test</button>
      <button onClick={() => fetch("http://localhost:3000/redirect")}>
        redirect
      </button>
      <button
        onClick={() =>
          fetch("http://localhost:3000/post", {
            method: "POST",
            body: JSON.stringify({
              name: "John Doe",
            }),
          })
        }
      >
        post
      </button>
      <SignOutButton />
      <OrganizationSwitcher hidePersonal></OrganizationSwitcher>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
