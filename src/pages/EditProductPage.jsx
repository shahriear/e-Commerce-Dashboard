import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, ChevronLeft } from 'lucide-react';

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    description:
      'High-quality wireless headphones with noise cancellation technology.',
    category: 'Electronics',
    status: 'Active',
    price: '95.00',
    stock: '156',
    mainImage: null,
    additionalImages: [],
  });

  const [mainImagePreview, setMainImagePreview] = useState('🎧');
  const [additionalImagesPreview, setAdditionalImagesPreview] = useState([
    '🎵',
    '🔊',
  ]);

  const categories = [
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

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate(`/products/${id}`);
      alert('Product updated successfully!');
    }, 1500);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(`/products/${id}`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
        >
          <ChevronLeft size={20} />
          Back to Product
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-500 mt-1">
          Update product information and variants
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Category */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Pricing & Category
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-gray-700 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Product Images
            </h2>

            {/* Main Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
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
                  className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-400 transition-colors"
                >
                  {typeof mainImagePreview === 'string' &&
                  mainImagePreview.includes('/') ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={mainImagePreview}
                        alt="Main"
                        className="h-32 w-32 object-cover rounded"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-5xl">
                      {mainImagePreview}
                      <p className="text-sm text-gray-500 mt-2">
                        Click to change
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Additional Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
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
                className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-400 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload additional images
                  </p>
                </div>
              </label>

              {additionalImagesPreview.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {additionalImagesPreview.map((image, idx) => (
                    <div key={idx} className="relative group">
                      {typeof image === 'string' && image.includes('/') ? (
                        <img
                          src={image}
                          alt={`Additional ${idx}`}
                          className="w-full h-24 object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-24 bg-yellow-100 rounded flex items-center justify-center text-3xl">
                          {image}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
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
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">
                  {formData.name || 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-semibold text-gray-900">
                  ${formData.price || '0.00'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-semibold text-gray-900">
                  {formData.category || 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
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
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {loading && <span className="animate-spin">⏳</span>}
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/products/${id}`)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors"
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

export default EditProductPage;
