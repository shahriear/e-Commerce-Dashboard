import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PagePlaceholder from './pages/PagePlaceholder';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import EditProductPage from './pages/EditProductPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailsPage from './pages/CategoryDetailsPage';
import CartsPage from './pages/CartsPage';
import CartDetailsPage from './pages/CartDetailsPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<CategoryDetailsPage />} />
          <Route
            path="/add-category"
            element={
              <PagePlaceholder
                title="Add Category"
                description="Category creation form coming soon"
              />
            }
          />
          <Route path="/carts" element={<CartsPage />} />
          <Route path="/carts/:id" element={<CartDetailsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
          <Route
            path="/payments"
            element={
              <PagePlaceholder
                title="Payments"
                description="Payment management coming soon"
              />
            }
          />
          <Route
            path="/customers"
            element={
              <PagePlaceholder
                title="Customers"
                description="Customer management coming soon"
              />
            }
          />
          <Route
            path="/employees"
            element={
              <PagePlaceholder
                title="Employees"
                description="Employee management coming soon"
              />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
