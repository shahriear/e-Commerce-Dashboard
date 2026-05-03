import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, X } from 'lucide-react';

const AddProductPage = () => {
  const [showAddVariant, setShowAddVariant] = useState(true);
  const [newVariant, setNewVariant] = useState({
    color: '',
    size: '',
    stock: '',
    price: '',
  });
  const handleAddVariant = () => {
    if (
      newVariant.color &&
      newVariant.size &&
      newVariant.stock &&
      newVariant.price
    ) {
      alert('Variant added successfully!');
      setNewVariant({ color: '', size: '', stock: '', price: '' });
      setShowAddVariant(false);
    }
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    status: 'Active',
    price: '',
    stock: '',
    mainImage: null,
    additionalImages: [],
  });

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImagesPreview, setAdditionalImagesPreview] = useState([]);

  const categories = [
    'Select category',
    'Electronics',
    'Accessories',
    'Clothing',
    'Home & Garden',
  ];

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMainImageChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        mainImage: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = e => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setFormData(prev => ({
        ...prev,
        additionalImages: [...prev.additionalImages, ...newFiles],
      }));

      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAdditionalImagesPreview(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = index => {
    setAdditionalImagesPreview(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }));
  };

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   setLoading(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     setLoading(false);
  //     navigate('/products');
  //     // In a real app, you'd show a success toast here
  //     alert('Product added successfully!');
  //   }, 1500);
  // };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <button
          onClick={() => navigate('/products')}
          className="text-blue-600 hover:text-blue-700 font-medium mb-3 md:mb-4 text-sm md:text-base"
        >
          ← Back to Products
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Add New Product
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Create a new product for your store
        </p>
      </div>

      {/* Form */}
      <form
        // onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Wireless Bluetooth Headphones"
                  // required
                  className="w-full px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="product-slug"
                  className="w-full px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows={5}
                  className="w-full px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Category */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">
              Pricing & Category
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 md:left-4 top-2.5 md:top-2 text-gray-700 font-medium text-sm md:text-base">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    // required
                    step="0.01"
                    className="w-full pl-7 md:pl-8 pr-3 md:pr-4 py-2.5 md:py-2 border border-gray-300 rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  // required
                  className="w-full px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option
                      key={cat}
                      value={cat === 'Select category' ? '' : cat}
                    >
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">
              Product Images
            </h2>

            {/* Main Image */}
            <div className="mb-6">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-3">
                Main Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="hidden"
                  id="mainImage"
                />
                <label
                  htmlFor="mainImage"
                  className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 cursor-pointer hover:border-gray-400 transition-colors"
                >
                  {mainImagePreview ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={mainImagePreview}
                        alt="Main"
                        className="h-24 md:h-32 w-24 md:w-32 object-cover rounded"
                      />
                      <p className="text-xs md:text-sm text-gray-500 mt-2">
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="text-gray-400 mb-2" size={28} />
                      <p className="text-xs md:text-sm font-medium text-gray-700 text-center">
                        Click to upload main image
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Additional Images */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-3">
                Additional Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesChange}
                className="hidden"
                id="additionalImages"
              />
              <label
                htmlFor="additionalImages"
                className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 cursor-pointer hover:border-gray-400 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <Upload className="text-gray-400 mb-2" size={28} />
                  <p className="text-xs md:text-sm font-medium text-gray-700 text-center">
                    Click to upload additional images
                  </p>
                </div>
              </label>

              {additionalImagesPreview.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mt-4">
                  {additionalImagesPreview.map((image, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={image}
                        alt={`Additional ${idx}`}
                        className="w-full h-20 md:h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1">
          {/* Product Variants */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
            <h2 className="text-base md:text-lg font-bold text-gray-900">
              Product Variants
            </h2>
            <button
              onClick={() => setShowAddVariant(!showAddVariant)}
              className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              Add Variant
            </button>
          </div>
          {/* Add Variant Form */}
          {showAddVariant && (
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                <input
                  type="text"
                  placeholder="Color (e.g., Black)"
                  value={newVariant.color}
                  onChange={e =>
                    setNewVariant({ ...newVariant, color: e.target.value })
                  }
                  className="px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Size (e.g., M)"
                  value={newVariant.size}
                  onChange={e =>
                    setNewVariant({ ...newVariant, size: e.target.value })
                  }
                  className="px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={newVariant.stock}
                  onChange={e =>
                    setNewVariant({ ...newVariant, stock: e.target.value })
                  }
                  className="px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={newVariant.price}
                  onChange={e =>
                    setNewVariant({ ...newVariant, price: e.target.value })
                  }
                  className="px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <button
                  onClick={handleAddVariant}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 md:py-2 rounded text-sm font-medium transition-colors"
                >
                  Add Variant
                </button>
                <button
                  onClick={() => setShowAddVariant(false)}
                  className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 md:py-2 rounded text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200 lg:sticky lg:top-24">
            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">
              Summary
            </h3>

            <div className="space-y-3 md:space-y-4 mb-6">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900 text-sm md:text-base">
                  {formData.name || 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Price</p>
                <p className="font-semibold text-gray-900 text-sm md:text-base">
                  ${formData.price || '0.00'}
                </p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Category</p>
                <p className="font-semibold text-gray-900 text-sm md:text-base">
                  {formData.category || 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Status</p>
                <span
                  className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                    formData.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : formData.status === 'Inactive'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {formData.status}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2.5 md:py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
              >
                {loading && <span className="animate-spin">⏳</span>}
                {loading ? 'Creating...' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 md:py-2 rounded-lg font-medium transition-colors text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
