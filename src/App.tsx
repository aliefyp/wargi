import { Route, Routes } from "react-router-dom";

import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";

import { QueryClient, QueryClientProvider } from "react-query";
import AuthLayout from "./layouts/auth";
import DefaultLayout from "./layouts/default";
import HomePage from "./pages/home";
import IuranPage from "./pages/iuran";
import IuranFormPage from "./pages/iuran-form";
import Login from "./pages/login";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const store = createStore({
    authName: '_simrt',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
  });

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <AuthProvider store={store}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<DefaultLayout />}>
            <Route path="/iuran/new" element={<IuranFormPage />} />
            <Route path="/iuran/edit/:iuran_id" element={<IuranFormPage />} />
            <Route path="/iuran" element={<IuranPage />} />
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
