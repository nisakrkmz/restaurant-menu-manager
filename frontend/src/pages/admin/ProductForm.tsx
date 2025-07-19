import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Product } from "@/types";
import ConfirmModal from "../../components/ui/confirm-modal";
import { useNavigate } from "react-router-dom";

interface Category {
  categoryId: number;
  categoryName: string;
}

interface Props {
  product: Product | null;
  onSuccess: () => void;
  categories: Category[];
  onCancel?: () => void;
}

export default function ProductForm({ product, onSuccess, categories, onCancel }: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: categories[0]?.categoryId || "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmData, setConfirmData] = useState<any>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
      });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        categoryId: categories[0]?.categoryId || "",
      });
    }
  }, [product, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const data = {
      ...form,
      price: parseFloat(form.price),
      categoryId: Number(form.categoryId),
      id: product?.id,
    };
    // Kategori adını bul
    const selectedCategory = categories.find(cat => cat.categoryId === Number(data.categoryId));
    // Route için uygun hale getir
    let route = "/";
    if (selectedCategory) {
      let name = selectedCategory.categoryName.toLowerCase();
      name = name.replace(/ç/g, "c").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ö/g, "o").replace(/ /g, "");
      route = `/${name}`;
    }
    if (product) {
      api.put(`/foodproducts/${product.id}`, data)
        .then(() => {
          onSuccess();
          navigate("/admin"); // Güncelleme sonrası admin paneline yönlendir
        })
        .catch(err => setError(err.response?.data?.message || 'Güncelleme başarısız!'));
    } else {
      api.post("/foodproducts", data)
        .then(() => {
          onSuccess();
          navigate("/admin"); // Ekleme sonrası admin paneline yönlendir
        })
        .catch(err => setError(err.response?.data?.message || 'Ekleme başarısız!'));
    }
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    if (product && confirmData) {
      api.put(`/foodproducts/${product.id}`, confirmData).then(() => {
        setForm({ name: "", description: "", price: "", imageUrl: "", categoryId: categories[0]?.categoryId || "" });
        setConfirmData(null);
        onSuccess();
        navigate("/admin");
      });
    }
  };
  const handleCancel = () => {
    setShowConfirm(false);
    setConfirmData(null);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h3 className="admin-form-title">{product ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h3>

      {error && <div style={{color: 'red', marginBottom: 8}}>{error}</div>}

      <input
        placeholder="Ürün adı"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="admin-input"
        required
      />
      <input
        placeholder="Açıklama"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="admin-input"
        required
      />
      <input
        placeholder="Fiyat"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="admin-input"
        required
      />
      <input
        placeholder="Görsel URL"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        className="admin-input"
        required
      />
      <select
        className="admin-input"
        value={form.categoryId}
        onChange={e => setForm({ ...form, categoryId: e.target.value })}
        required
      >
        {categories.map(cat => (
          <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
        ))}
      </select>
      <button
        type="submit"
        className="admin-btn admin-btn-submit"
      >
        {product ? "Güncelle" : "Ekle"}
      </button>
      {onCancel && (
        <button type="button" className="admin-btn admin-btn-submit" onClick={onCancel} style={{marginLeft:8, background: "#eee", color: "#b31217", border: "1.5px solid #b31217"}}>İptal</button>
      )}
      <ConfirmModal
        open={showConfirm}
        title="Güncellemeyi Onayla"
        description="Bu ürünü güncellemek istediğinize emin misiniz?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </form>
  );
}
