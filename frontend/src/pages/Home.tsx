import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Çorba", image: "/images/corba.jpg", path: "/corba" },
  { name: "Ara Sıcak", image: "/images/arasicak.jpg", path: "/arasicak" },
  { name: "Salata", image: "/images/salata.jpg", path: "/salata" },
  { name: "Ana Yemek", image: "/images/anayemek.jpg", path: "/anayemek" },
  { name: "Tatlı", image: "/images/tatli.jpg", path: "/tatli" },
  { name: "Sıcak İçecek", image: "/images/sicak.jpg", path: "/sicakicecek" },
  { name: "Soğuk İçecek", image: "/images/soguk.jpg", path: "/sogukicecek" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="main-content">
      <div className="categories">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="category-banner"
            style={{ backgroundImage: `url(${cat.image})` }}
            onClick={() => navigate(cat.path)}
          >
            <div className="category-overlay">
              <span className="category-title">{cat.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
