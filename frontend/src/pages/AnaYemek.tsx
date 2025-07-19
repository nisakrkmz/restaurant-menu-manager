import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./services/api";
import type { Product } from "../types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function AnaYemek() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/category").then(res => {
      const anaYemek = res.data.find((c: any) => c.categoryName.toLowerCase() === "ana yemek");
      if (anaYemek) {
        setProducts(anaYemek.foodProducts || []);
      }
    });
  }, []);

  return (
    <div className="main-content">
      <Button className="back-btn" onClick={() => navigate(-1)}>← Geri</Button>
      <h2 className="title">Ana Yemek</h2>
      <div className="categories-grid">
        {products.map(product => (
          <div key={product.id} className="category-card" onClick={() => setSelected(product)} style={{ cursor: "pointer", maxWidth: 220 }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 12, marginBottom: 8 }} />
            <div className="title" style={{ fontSize: 16 }}>{product.name}</div>
            <div style={{ fontSize: 15 }}>{product.price} ₺</div>
          </div>
        ))}
        {products.length === 0 && <p>Bu kategoride ürün yok.</p>}
      </div>
      {/* Ürün Detay Modalı */}
      {selected && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
        }} onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()}>
            <Card style={{ minWidth: 340, maxWidth: 400 }}>
              <CardHeader>
                <CardTitle>
                  <span style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, display: 'block', color: '#222' }}>{selected.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img src={selected.imageUrl} alt={selected.name} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 12, marginBottom: 16 }} />
                <p style={{ fontSize: 15, color: '#333', marginBottom: 8 }}>{selected.description}</p>
                <p style={{ fontWeight: "bold", fontSize: 18, color: '#b31217', marginTop: 8 }}>{selected.price} ₺</p>
              </CardContent>
              <CardFooter>
                <Button className="back-btn" onClick={() => setSelected(null)}>Geri</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
} 