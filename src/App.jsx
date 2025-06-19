import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import CreateJournal from "./components/CreateJournal";
import JournalLayout from "./layout/JournalLayout";
import PageNotFound from "./components/PageNotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="home" element={<JournalLayout />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
