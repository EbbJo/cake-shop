import { Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import AboutPage from "./Pages/AboutPage";
import Cart from "./Pages/Cart";
import ResultPage from "./Pages/ResultPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { CakeProvider } from "./contexts/CakeContext";
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <CakeProvider>
      <div className='main-content bg-rose-50'>
          <Toaster />
          <Navbar />
          <div className="min-h-screen">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path={"/product/:id"} element={<ProductPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/result/:success" element={<ResultPage />} />
              </Routes>
          </div>
          <Footer />
      </div>
    </CakeProvider>
  )
}

export default App
