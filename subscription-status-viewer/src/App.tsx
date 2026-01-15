

import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Subscription from "./pages/Subscription";



function App() {
  return (
    <Authenticator>
      {({ signOut }) => (
        <BrowserRouter>
          <div style={{ padding: 20 }}>
            <button onClick={signOut}>Sign out</button>

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/subscription" element={<Subscription />} />
            
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </Authenticator>
  );
}

export default App;

