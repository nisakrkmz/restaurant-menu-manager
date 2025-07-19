import { Link } from "react-router-dom";
import logo from '../../assets/1.png';

export default function Header() {
  return (
    <header className="main-header">
      <div className="container">
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <img src={logo} alt="logo" style={{width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />
          <h1 className="logo">Nisita Lezzet Sofrası</h1>
        </div>
        <nav className="nav-links">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/about">Hakkımızda</Link>
        </nav>
      </div>
    </header>
  );
}
