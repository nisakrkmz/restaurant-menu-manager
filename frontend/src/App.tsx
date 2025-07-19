import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import ParticlesBackground from "./components/ParticlesBackground";
import Corba from "./pages/Corba";
import AraSicak from "./pages/AraSicak";
import Salata from "./pages/Salata";
import AnaYemek from "./pages/AnaYemek";
import Tatli from "./pages/Tatli";
import SicakIcecek from "./pages/SicakIcecek";
import SogukIcecek from "./pages/SogukIcecek";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <ParticlesBackground />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/corba" element={<Corba />} />
        <Route path="/arasicak" element={<AraSicak />} />
        <Route path="/salata" element={<Salata />} />
        <Route path="/anayemek" element={<AnaYemek />} />
        <Route path="/tatli" element={<Tatli />} />
        <Route path="/sicakicecek" element={<SicakIcecek />} />
        <Route path="/sogukicecek" element={<SogukIcecek />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AdminDashboard />} />
        {/* Eski dinamik kategori sayfası istersen burada kalabilir */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;