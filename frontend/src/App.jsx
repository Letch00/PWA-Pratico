import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styles from "./App.module.scss";
import HomePage from "./components/HomePage";
import UserPage from "./components/UserPage"
import AdminPage from "./components/AdminPage";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectRoute";
import { UsersProvider } from "./contexts/UsersProvider";
import { TabProvider } from "./components/AdminPage/contexts";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./contexts/ThemeProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <TabProvider>
            <AdminPage />
          </TabProvider>
        </ProtectedRoute>
      ),
    },
    {
      path: "/user",
      element: <UserPage />,
    },
  ]);

  return (
    <div className={styles.App}>
      <ThemeProvider>
        <ToastContainer />
        <UsersProvider>
          <Header />
          <main>
            <RouterProvider router={router} />
          </main>
        </UsersProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
