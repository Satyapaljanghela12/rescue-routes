"use client";

import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { Plus, Edit, Eye, X, Trash2, Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AdoptionsPage() {
  const [adoptions, setAdoptions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    animalName: "",
    animalType: "",
    age: "",
    breed: "",
    gender: "",
    description: "",
    medicalHistory: "",
    image: "/dog1.png",
    status: "Available",
  });

  useEffect(() => {
    fetchAdoptions();
  }, []);

  const fetchAdoptions = async () => {
    try {
      const response = await fetch("/api/adoptions");
      const data = await response.json();
      if (data.success) {
        setAdoptions(data.adoptions);
      }
    } catch (error) {
      console.error("Error fetching adoptions:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (adoptionId: string) => {
    if (!window.confirm("Are you sure you want to delete this animal? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch("/api/adoptions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adoptionId }),
      });

      const data = await response.json();
      
      if (data.success) {
        fetchAdoptions();
      } else {
        window.alert("Failed to delete animal");
      }
    } catch (error) {
      console.error("Error deleting animal:", error);
      window.alert("Error deleting animal");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("Submitting form data:", formData);
    console.log("Image in formData:", formData.image.substring(0, 50) + "...");

    try {
      const response = await fetch("/api/adoptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        console.log("Animal added successfully:", data.adoption);
        setShowModal(false);
        setFormData({
          animalName: "",
          animalType: "",
          age: "",
          breed: "",
          gender: "",
          description: "",
          medicalHistory: "",
          image: "/dog1.png",
          status: "Available",
        });
        setImagePreview("");
        setImageFile(null);
        fetchAdoptions();
      } else {
        alert("Failed to add animal");
      }
    } catch (error) {
      console.error("Error adding animal:", error);
      alert("Error adding animal");
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    available: adoptions.filter(a => a.status === "Available").length,
    pending: adoptions.filter(a => a.status === "Under Review").length,
    adopted: adoptions.filter(a => a.status === "Adopted").length,
    total: adoptions.reduce((sum, a) => sum + (a.applicants || 0), 0),
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
                Adoption Management
              </h1>
              <p className="font-poppins text-gray-600">
                Manage adoption listings and applications
              </p>
            </div>
            <button 
              onClick={() => {
                setShowModal(true);
                setImagePreview("");
                setImageFile(null);
              }}
              className="bg-primary hover:bg-orange-600 text-white font-poppins font-semibold px-6 py-3 rounded-lg transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Animal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="font-poppins text-sm text-gray-600 mb-2">Available for Adoption</p>
              <p className="font-poppins text-3xl font-bold text-primary">{stats.available}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="font-poppins text-sm text-gray-600 mb-2">Pending Applications</p>
              <p className="font-poppins text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="font-poppins text-sm text-gray-600 mb-2">Successfully Adopted</p>
              <p className="font-poppins text-3xl font-bold text-green-600">{stats.adopted}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="font-poppins text-sm text-gray-600 mb-2">Total Applications</p>
              <p className="font-poppins text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Animal</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Age</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Applications</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adoptions.map((adoption) => (
                  <tr key={adoption._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <span className="text-2xl">🐾</span>
                          </div>
                        </div>
                        <span className="font-poppins text-sm font-medium text-gray-800">{adoption.animalName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-poppins text-sm text-gray-600">{adoption.animalType}</td>
                    <td className="px-6 py-4 font-poppins text-sm text-gray-600">{adoption.age}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-poppins font-medium ${
                        adoption.status === "Available" ? "bg-green-100 text-green-700" :
                        adoption.status === "Adopted" ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {adoption.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-poppins text-sm font-semibold text-primary">
                        {adoption.applicants || 0} applicants
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="View Details">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-all" title="Edit">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button 
                          onClick={() => handleDelete(adoption._id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Animal"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Animal Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                  <h2 className="font-poppins text-2xl font-bold text-gray-800">Add Animal for Adoption</h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setImagePreview("");
                      setImageFile(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Animal Name */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Animal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.animalName}
                      onChange={(e) => setFormData({ ...formData, animalName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      placeholder="e.g., Shampoo"
                    />
                  </div>

                  {/* Animal Type and Gender */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Animal Type *
                      </label>
                      <select
                        required
                        value={formData.animalType}
                        onChange={(e) => setFormData({ ...formData, animalType: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      >
                        <option value="">Select type</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Puppy">Puppy</option>
                        <option value="Kitten">Kitten</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        required
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  {/* Age and Breed */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                        placeholder="e.g., 2 years, 6 months"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                        Breed
                      </label>
                      <input
                        type="text"
                        value={formData.breed}
                        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                        placeholder="e.g., Labrador, Mixed"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins resize-none"
                      placeholder="Describe the animal's personality and behavior..."
                    />
                  </div>

                  {/* Medical History */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Medical History
                    </label>
                    <textarea
                      value={formData.medicalHistory}
                      onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins resize-none"
                      placeholder="Vaccination status, medical conditions, etc..."
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Animal Image *
                    </label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-gray-300 hover:border-primary hover:bg-gray-50"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      {imagePreview ? (
                        <div className="space-y-3">
                          <div className="relative w-full h-48 rounded-lg overflow-hidden">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="font-poppins text-sm text-gray-600">
                            Click or drag to change image
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <Upload className="w-8 h-8 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-poppins text-sm font-medium text-gray-700 mb-1">
                              Drop your image here, or click to browse
                            </p>
                            <p className="font-poppins text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
                    >
                      <option value="Available">Available</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Adopted">Adopted</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setImagePreview("");
                        setImageFile(null);
                      }}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-poppins font-medium rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-primary hover:bg-orange-600 text-white font-poppins font-semibold rounded-lg transition-all disabled:opacity-50"
                    >
                      {loading ? "Adding..." : "Add Animal"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
