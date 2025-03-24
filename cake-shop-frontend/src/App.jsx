import { Route, Routes } from "react-router"
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { CakeProvider } from "./contexts/CakeContext";

function App() {

  return (
    <CakeProvider>
      <div className='main-content'>
          <Navbar />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
          </Routes>
          <Footer />
      </div>
    </CakeProvider>
  )
}

export default App
