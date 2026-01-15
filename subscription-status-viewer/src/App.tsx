

// import { BrowserRouter } from "react-router-dom";
// import { Routes, Route } from "react-router";
// import Dashboard from "./pages/Dashboard";
// import { Authenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import Subscription from "./pages/Subscription";
// import { UserProvider } from "./context/UserContext";



// function App() {
//   return (
//     <Authenticator>
//       {({ signOut }) => (
//         <BrowserRouter>
//           <div style={{ padding: 20 }}>
//             <button onClick={signOut}>Sign out</button>

//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/subscription" element={<Subscription />} />
            
//             </Routes>
//           </div>
//         </BrowserRouter>
//       )}
//     </Authenticator>
//   );
// }

// export default App;



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
              <nav style={{ marginBottom: 20 }}>
                <button onClick={signOut} style={{ marginRight: 10 }}>
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
