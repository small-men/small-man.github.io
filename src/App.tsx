import React from "react";
import "./App.css";
import { LoginScreen, ProjectListScreen } from "screens";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unanthenticated-app";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
