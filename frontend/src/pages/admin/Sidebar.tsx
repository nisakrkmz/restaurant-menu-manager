import { FaPlus, FaList, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isProducts = location.pathname === "/admin";
  const isAdd = location.pathname === "/admin/add";

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="custom-sidebar">
      <div className="sidebar-logo">🍽️ Menü Admin</div>
      <nav className="sidebar-links">
        <Link
          to="/admin"
          className={`sidebar-link ${isProducts ? "active" : ""}`}
        >
          <FaList className="icon" />
          Ürünler
        </Link>

        <Link
          to="/admin/add"
          className={`sidebar-link ${isAdd ? "active" : ""}`}
        >
          <FaPlus className="icon" />
          Ürün Ekle
        </Link>

        {/* Kategori yönetimi kaldırıldı */}

        <button className="sidebar-link logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          Çıkış
        </button>
      </nav>
    </aside>
  );
}
