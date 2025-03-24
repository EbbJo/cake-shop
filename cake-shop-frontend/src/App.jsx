import { Route, Routes } from "react-router"
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {

  return (
    <div className='main-content'>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App
