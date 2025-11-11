import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import { AuthProvider } from "./contexts/AuthProvider";
import { useAuth } from "./contexts/useAuth";
import { ROUTES } from "./routes";
import CardList from "./pages/CardList";


function PrivateLayout() {
  const { token } = useAuth();
  if (!token) return <Navigate to={ROUTES.LOGIN} />;

  return (
    <>
      <Header />
      <main style={{ marginTop: "60px", padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route element={<PrivateLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CARD_LIST} element={<CardList />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}


// function PrivateRoute({ children }: { children: React.ReactElement }) {
//   const { token } = useAuth();
//   return token ? children : <Navigate to="/login" />;
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path={ROUTES.LOGIN} element={<Login />} />
//           <Route
//             path={ROUTES.HOME}
//             element={
//               <PrivateRoute>
//                 <>
//                   <Header />
//                   <Home />
//                 </>
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//         <Route
//           path="/decks/:deckId/cards"
//           element={
//             <PrivateRoute>
//               <>
//                 <Header />
//                 <CardList />
//               </>
//             </PrivateRoute>
//           }
//         />
//       </Router>
//     </AuthProvider>
//   );
// }
