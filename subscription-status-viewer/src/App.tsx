import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Subscription from "./pages/Subscription";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Authenticator>
      {({ signOut }) => (
        /* Wrap the internal app with UserProvider so all routes can access the user */
        <AuthProvider>
          <BrowserRouter>
            <div style={{ padding: 20 }}>
              <nav
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 20,
                }}
              >
                <button
                  onClick={signOut}
                  style={{
                    padding: "8px 16px",
                    background: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Sign out
                </button>
              </nav>

              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/subscription" element={<Subscription />} />
              
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      )}
    </Authenticator>
  );
}

export default App;
