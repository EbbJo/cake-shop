import { Route, Routes } from "react-router"
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import Navbar from "./Components/Navbar";

function App() {

  return (
    <div className='main-content'>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    </div>
  )
}

export default App
