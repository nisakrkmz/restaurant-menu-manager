import Sidebar from './Sidebar';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}
interface Category {
  categoryId: number;
  categoryName: string;
}

const AdminDashboard = () => {
  const location = useLocation();
  const isAddPage = location.pathname === '/admin/add';
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  // Ürünleri ve kategorileri çek
  const fetchProducts = () => {
    api.get('/foodproducts').then(res => setProducts(res.data));
  };
  const fetchCategories = () => {
    api.get('/category').then(res => setCategories(res.data));
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);


  const getCategoryName = (categoryId: number) => {
    return categories.find(c => c.categoryId === categoryId)?.categoryName || '';
  };


  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <button className="admin-btn" style={{marginBottom:16}} onClick={() => navigate(-1)}>← Geri</button>
        {!isAddPage && !editProduct && (
          <ProductTable
            products={products.map(p => ({ ...p, category: getCategoryName(p.categoryId) || "" }))}
            onEdit={setEditProduct}
            onDelete={fetchProducts}
          />
        )}
        {editProduct && (
          <ProductForm
            product={{ ...editProduct, category: getCategoryName(editProduct.categoryId) || "" }}
            onSuccess={() => { setEditProduct(null); fetchProducts(); }}
            onCancel={() => setEditProduct(null)}
            categories={categories}
          />
        )}
        {isAddPage && !editProduct && (
          <ProductForm
            product={null}
            onSuccess={fetchProducts}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
