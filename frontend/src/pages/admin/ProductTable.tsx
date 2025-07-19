import type { Product } from "@/types";
import { api } from "../services/api";
import { FaTag, FaLiraSign, FaLayerGroup, FaEdit, FaTrash } from "react-icons/fa";
import ConfirmModal from "../../components/ui/confirm-modal";
import { useState } from "react";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: () => void;
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowConfirm(true);
  };
  const handleConfirm = () => {
    if (deleteId !== null) {
      api.delete(`/foodproducts/${deleteId}`).then(() => {
        setDeleteId(null);
        setShowConfirm(false);
        onDelete();
      });
    }
  };
  const handleCancel = () => {
    setDeleteId(null);
    setShowConfirm(false);
  };

  return (
    <div className="admin-product-list">
      {products.map((product) => (
        <div key={product.id} className="admin-product-card">
          <div className="admin-product-info">
            <div className="admin-product-row">
              <FaTag className="admin-product-icon" />
              <span className="admin-product-name">{product.name}</span>
            </div>
            <div className="admin-product-row">
              <FaLiraSign className="admin-product-icon" />
              <span>{product.price} ₺</span>
            </div>
            <div className="admin-product-row">
              <FaLayerGroup className="admin-product-icon" />
              <span>{product.category}</span>
            </div>
          </div>
          <div className="admin-product-actions">
            <button
              onClick={() => onEdit(product)}
              className="admin-btn"
              title="Düzenle"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="admin-btn"
              title="Sil"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
      {products.length === 0 && (
        <div className="admin-product-empty">Hiç ürün yok.</div>
      )}
      <ConfirmModal
        open={showConfirm}
        title="Silme İşlemini Onayla"
        description="Bu ürünü silmek istediğinize emin misiniz?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
