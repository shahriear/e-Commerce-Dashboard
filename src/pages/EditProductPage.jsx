import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { productsData } from '../data/products';

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [additionalImagesPreview, setAdditionalImagesPreview] = useState([]);
  const [variants, setVariants] = useState([]);

  const categories = [
    'Electronics',
    'Accessories',
    'Clothing',
    'Home & Garden',
  ];

  // ---------------- LOAD PRODUCT ----------------
  useEffect(() => {
    const product = productsData.find(p => p.id === Number(id));

    if (product) {
      setFormData({
        name: product.name,
        slug: product.name.toLowerCase().replace(/\s+/g, '-'),
        description: product.description,
        category: product.category,
        status: product.status,
        price: product.price.replace('$', ''),
        stock: product.stock,
        mainImageUrl: product.image,
      });

      setMainImagePreview(product.image);
      setAdditionalImagesPreview(product.images || []);

      setVariants(
        product.variants.map(v => ({
          id: v.id,
          color: v.color,
          size: v.size,
          stock: String(v.stock),
          price: v.price.replace('$', ''),
        })),
      );
    }
  }, [id]);

  if (!formData) return <p className="p-6">Loading...</p>;

  // ---------------- HANDLERS ----------------
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMainImageUrlChange = e => {
    setFormData(prev => ({ ...prev, mainImageUrl: e.target.value }));
    setMainImagePreview(e.target.value);
  };

  const handleMainImageChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImagePreview(reader.result);
      setFormData(prev => ({ ...prev, mainImageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAdditionalImagesChange = e => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalImagesPreview(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAdditionalImage = index => {
    setAdditionalImagesPreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleVariantChange = (id, field, value) => {
    setVariants(prev =>
      prev.map(v => (v.id === id ? { ...v, [field]: value } : v)),
    );
  };

  const addVariant = () => {
    const newId = Math.max(...variants.map(v => v.id), 0) + 1;
    setVariants(prev => [
      ...prev,
      { id: newId, color: '', size: '', stock: '', price: '' },
    ]);
  };

  const deleteVariant = id => {
    setVariants(prev => prev.filter(v => v.id !== id));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate(`/products/${id}`);
      alert('Product updated successfully!');
    }, 1200);
  };

  // ---------------- UI ----------------
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <button
            onClick={() => navigate(`/products/${id}`)}
            className="flex items-center gap-2 text-blue-600 mb-2"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-gray-500">
            Update product information and variants
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 whitespace-nowrap text-sm text-white px-5 py-2 rounded-lg"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <form className="space-y-6">
        {/* BASIC INFO */}
        <div className="bg-white p-6 rounded-xl shadow  border border-gray-300 ">
          <h2 className="font-semibold mb-4">Basic Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Product Title</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border  border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label>Slug</label>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="col-span-2">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                rows={4}
              />
            </div>

            <div>
              <label>Price</label>
              <input
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label>Stock</label>
              <input
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                {categories.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* MAIN IMAGE */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-300">
          <h2 className="font-semibold mb-4">Main Image</h2>

          <div className="flex gap-6">
            <img
              src={mainImagePreview}
              className="w-28 h-28 object-cover rounded"
            />

            <div className="flex-1">
              <input
                value={formData.mainImageUrl}
                onChange={handleMainImageUrlChange}
                className="w-full border border-gray-300 p-2 mb-2 rounded"
              />

              <input
                className="border border-dashed border-gray-300 text-gray-500 w-full"
                type="file"
                onChange={handleMainImageChange}
              />
            </div>
          </div>
        </div>

        {/* ADDITIONAL IMAGES */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-300">
          <h2 className="font-semibold mb-4">Additional Images</h2>

          <div className="grid grid-cols-4 gap-3">
            {additionalImagesPreview.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} className="h-24 w-full object-cover rounded" />
                <button
                  onClick={() => removeAdditionalImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            <label className="border border-gray-500 border-dashed p-6 flex items-center justify-center cursor-pointer">
              <Plus />
              <input
                type="file"
                multiple
                hidden
                onChange={handleAdditionalImagesChange}
              />
            </label>
          </div>
        </div>

        {/* VARIANTS */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-300">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Product Variants</h2>
            <button type="button" onClick={addVariant}>
              <Plus />
            </button>
          </div>

          {variants.map(v => (
            <div key={v.id} className="grid grid-cols-5 gap-2 mb-3">
              <input
                placeholder="Color"
                value={v.color}
                onChange={e =>
                  handleVariantChange(v.id, 'color', e.target.value)
                }
                className="border border-gray-300 p-2 rounded"
              />
              <input
                placeholder="Size"
                value={v.size}
                onChange={e =>
                  handleVariantChange(v.id, 'size', e.target.value)
                }
                className="border border-gray-300 p-2 rounded"
              />
              <input
                placeholder="Stock"
                value={v.stock}
                onChange={e =>
                  handleVariantChange(v.id, 'stock', e.target.value)
                }
                className="border border-gray-300 p-2 rounded"
              />
              <input
                placeholder="Price"
                value={v.price}
                onChange={e =>
                  handleVariantChange(v.id, 'price', e.target.value)
                }
                className="border border-gray-300 p-2 rounded"
              />

              <button onClick={() => deleteVariant(v.id)}>
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
