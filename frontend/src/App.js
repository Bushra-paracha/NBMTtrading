import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { SiteLayout } from "./components/layout/SiteLayout";
import { AuthCallback } from "./pages/AuthCallback";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import GlobalReach from "./pages/GlobalReach";
import Gallery from "./pages/Gallery";
import Updates from "./pages/Updates";
import UpdateDetail from "./pages/UpdateDetail";
import Catalogs from "./pages/Catalogs";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import Admin from "./pages/admin/Admin";

function AppRouter() {
  const location = useLocation();
  if (location.hash?.includes("session_id=")) {
    return <AuthCallback />;
  }
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/global-reach" element={<GlobalReach />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/updates/:slug" element={<UpdateDetail />} />
        <Route path="/catalogs" element={<Catalogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
      </Route>
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
