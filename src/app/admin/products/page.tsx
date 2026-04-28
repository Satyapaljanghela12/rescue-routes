"use client";

import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { Plus, Edit, Trash2, X, Package, Upload, Image as ImageIcon, Video, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface MediaItem {
  type: "image" | "video";
  url: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "/assets/images/animals/dog1.png",
    category: "tshirt",
    hasSize: true,
    hasQuantity: true,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        price: product.price.toString(),
        description: product.description,
        image: product.image,
        category: product.category || "tshirt",
        hasSize: product.hasSize !== undefined ? product.hasSize : true,
        hasQuantity: product.hasQuantity !== undefined ? product.hasQuantity : true,
      });
      setImagePreview(product.image);
      setMedia(product.media || [{ type: "image", url: product.image }]);
    } else {
      setEditingProduct(null);
      setFormData({
        title: "",
        price: "",
        description: "",
        image: "/assets/images/animals/dog1.png",
        category: "tshirt",
        hasSize: true,
        hasQuantity: true,
      });
      setImagePreview("");
      setMedia([]);
    }
    setShowModal(true);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Max size is 10MB`);
        return;
      }

      // Check file type
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      
      if (!isImage && !isVideo) {
        alert(`${file.name} is not a valid image or video file`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newMediaItem: MediaItem = {
          type: isImage ? "image" : "video",
          url: base64String,
        };
        
        setMedia((prev) => [...prev, newMediaItem]);
        
        // Set first image as preview and main image for backward compatibility
        if (media.length === 0 && isImage) {
          setFormData({ ...formData, image: base64String });
          setImagePreview(base64String);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMediaItem = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (media.length === 0) {
      alert("Please add at least one image or video");
      return;
    }
    
    setSubmitting(true);

    try {
      const url = "/api/products";
      const method = editingProduct ? "PATCH" : "POST";
      
      // Use first image as main image for backward compatibility
      const mainImage = media.find(m => m.type === "image")?.url || media[0].url;
      
      const body = editingProduct
        ? { ...formData, image: mainImage, media, productId: editingProduct._id, price: parseFloat(formData.price) }
        : { ...formData, image: mainImage, media, price: parseFloat(formData.price) };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        setShowModal(false);
        fetchProducts();
        alert(editingProduct ? "Product updated successfully!" : "Product added successfully!");
      } else {
        alert(data.error || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
                Products Management
              </h1>
              <p className="font-poppins text-gray-600">
                Manage merchandise products for the store
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="bg-primary hover:bg-orange-600 text-white font-poppins font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>

          {/* Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-poppins text-sm text-gray-600">Total Products</p>
                  <p className="font-poppins text-3xl font-bold text-gray-800">{products.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.category === "tshirt" ? "bg-blue-100 text-blue-700" :
                        product.category === "book" ? "bg-green-100 text-green-700" :
                        product.category === "keychain" ? "bg-purple-100 text-purple-700" :
                        product.category === "phonecover" ? "bg-pink-100 text-pink-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : "Product"}
                      </span>
                      {product.hasSize && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">
                          Sizes
                        </span>
                      )}
                    </div>
                    <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-1">
                      {product.title}
                    </h3>
                    <p className="font-poppins text-xl font-bold text-primary mb-2">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <p className="font-poppins text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-poppins font-medium py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        disabled={deletingId === product._id}
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-poppins font-medium py-2 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {deletingId === product._id ? (
                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="font-poppins text-gray-500 mb-4">No products yet</p>
              <button
                onClick={() => handleOpenModal()}
                className="bg-primary hover:bg-orange-600 text-white font-poppins font-semibold px-6 py-3 rounded-lg transition-all"
              >
                Add Your First Product
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8 max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-poppins text-2xl font-bold text-gray-800">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Product Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const category = e.target.value;
                      const hasSize = category === "tshirt";
                      setFormData({ ...formData, category, hasSize });
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    required
                  >
                    <option value="tshirt">T-Shirt</option>
                    <option value="book">Book</option>
                    <option value="keychain">Keychain</option>
                    <option value="phonecover">Phone Cover</option>
                  </select>
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    placeholder="Rescue Routes T-Shirt"
                    required
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    placeholder="499"
                    required
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    placeholder="High-quality cotton t-shirt with Rescue Routes logo"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 font-poppins text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.hasSize}
                        onChange={(e) => setFormData({ ...formData, hasSize: e.target.checked })}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      Has Size Options
                    </label>
                    <p className="font-poppins text-xs text-gray-500 mt-1 ml-6">
                      Enable for T-shirts
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-poppins text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.hasQuantity}
                        onChange={(e) => setFormData({ ...formData, hasQuantity: e.target.checked })}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      Has Quantity Selector
                    </label>
                    <p className="font-poppins text-xs text-gray-500 mt-1 ml-6">
                      Enable for all products
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                    Product Images & Videos
                  </label>
                  
                  {/* Media Gallery */}
                  {media.length > 0 && (
                    <div className="mb-4 grid grid-cols-3 gap-3">
                      {media.map((item, index) => (
                        <div key={index} className="relative group">
                          <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                            {item.type === "image" ? (
                              <Image
                                src={item.url}
                                alt={`Media ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="relative w-full h-full">
                                <video
                                  src={item.url}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <Play className="w-8 h-8 text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMediaItem(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/60 text-white text-xs rounded">
                            {item.type === "image" ? "Image" : "Video"}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="flex gap-3">
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-orange-50 transition-all">
                        <Upload className="w-5 h-5 text-gray-600" />
                        <span className="font-poppins text-sm font-medium text-gray-700">
                          Upload Images/Videos
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleMediaUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="font-poppins text-xs text-gray-500 mt-2">
                    Supported: JPG, PNG, GIF, MP4, WebM (Max 10MB per file)
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-poppins font-semibold py-3 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
