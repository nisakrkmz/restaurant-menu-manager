import React from "react";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ open, title, description, onConfirm, onCancel }: ConfirmModalProps) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
    }}>
      <div style={{ background: "#fff", borderRadius: 12, minWidth: 320, maxWidth: 400, padding: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", position: "relative" }}>
        <button onClick={onCancel} style={{ position: "absolute", top: 12, right: 16, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#b31217" }}>&times;</button>
        {title && <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{title}</h3>}
        {description && <p style={{ fontSize: 15, color: '#333', marginBottom: 18 }}>{description}</p>}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button onClick={onCancel} style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid #ccc", background: "#eee", color: "#222", fontWeight: 500, cursor: "pointer" }}>İptal</button>
          <button onClick={onConfirm} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#b31217", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Onayla</button>
        </div>
      </div>
    </div>
  );
} 