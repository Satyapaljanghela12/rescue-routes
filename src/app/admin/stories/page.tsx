"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Upload } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import Image from "next/image";

interface Story {
  _id: string;
  name: string;
  subtitle: string;
  description: string;
  beforeImage: string;
  afterImage: string | null;
  createdAt: string;
}

const emptyForm = { name: "", subtitle: "", description: "", beforeImage: "", afterImage: "" };

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Story | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchStories(); }, []);

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      if (data.success) setStories(data.stories);
    } finally {
      setLoading(false);
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "beforeImage" | "afterImage") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setFormData(prev => ({ ...prev, [field]: base64 }));
  };

  const openAdd = () => { setEditing(null); setFormData(emptyForm); setShowModal(true); };
  const openEdit = (s: Story) => {
    setEditing(s);
    setFormData({ name: s.name, subtitle: s.subtitle, description: s.description, beforeImage: s.beforeImage, afterImage: s.afterImage || "" });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = "/api/stories";
      const method = editing ? "PATCH" : "POST";
      const body = editing ? { ...formData, storyId: editing._id } : formData;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (data.success) { fetchStories(); setShowModal(false); }
      else alert(data.error || "Failed to save");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this story?")) return;
    await fetch(`/api/stories?id=${id}`, { method: "DELETE" });
    fetchStories();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-8 mt-8">
          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-3xl font-bold font-poppins">Stories Management</h1>
            <button onClick={openAdd} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 font-poppins">
              <Plus className="w-5 h-5" /> Add Story
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : stories.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg">
              <p className="text-gray-500 font-poppins">No stories yet. Add your first story!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {stories.map((story) => (
                <div key={story._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-6 items-start">
                  <div className="flex gap-3 flex-shrink-0">
                    <div className="relative w-28 h-28 rounded-lg overflow-hidden border-2 border-orange-200">
                      {story.beforeImage && <Image src={story.beforeImage} alt="Before" fill className="object-cover" />}
                      <span className="absolute bottom-1 left-1 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">BEFORE</span>
                    </div>
                    {story.afterImage && (
                      <div className="relative w-28 h-28 rounded-lg overflow-hidden border-2 border-green-200">
                        <Image src={story.afterImage} alt="After" fill className="object-cover" />
                        <span className="absolute bottom-1 left-1 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">AFTER</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold font-poppins mb-1">{story.name}</h3>
                    <p className="text-primary text-sm font-semibold font-poppins mb-2">{story.subtitle}</p>
                    <p className="text-gray-600 font-poppins text-sm line-clamp-2">{story.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(story)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-5 h-5" /></button>
                    <button onClick={() => handleDelete(story._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-poppins">{editing ? "Edit Story" : "Add New Story"}</h2>
                  <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium font-poppins mb-1">Animal Name *</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2 font-poppins" placeholder="e.g. Ladoo" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-poppins mb-1">Subtitle</label>
                    <input type="text" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2 font-poppins" placeholder="e.g. Fighting Cancer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-poppins mb-1">Description *</label>
                    <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2 font-poppins" rows={4} required />
                  </div>

                  {/* Before Image */}
                  <div>
                    <label className="block text-sm font-medium font-poppins mb-1">Before Photo *</label>
                    <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-orange-300 rounded-lg p-4 hover:bg-orange-50 transition">
                      <Upload className="w-5 h-5 text-orange-500" />
                      <span className="font-poppins text-sm text-gray-600">Upload before photo</span>
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "beforeImage")} />
                    </label>
                    {formData.beforeImage && (
                      <div className="relative mt-2 h-40 rounded-lg overflow-hidden">
                        <Image src={formData.beforeImage} alt="Before preview" fill className="object-cover" />
                        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">BEFORE</span>
                        <button type="button" onClick={() => setFormData({ ...formData, beforeImage: "" })}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"><X className="w-3 h-3" /></button>
                      </div>
                    )}
                  </div>

                  {/* After Image */}
                  <div>
                    <label className="block text-sm font-medium font-poppins mb-1">After Photo (optional)</label>
                    <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-green-300 rounded-lg p-4 hover:bg-green-50 transition">
                      <Upload className="w-5 h-5 text-green-500" />
                      <span className="font-poppins text-sm text-gray-600">Upload after photo</span>
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "afterImage")} />
                    </label>
                    {formData.afterImage && (
                      <div className="relative mt-2 h-40 rounded-lg overflow-hidden">
                        <Image src={formData.afterImage} alt="After preview" fill className="object-cover" />
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">AFTER</span>
                        <button type="button" onClick={() => setFormData({ ...formData, afterImage: "" })}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"><X className="w-3 h-3" /></button>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button type="submit" disabled={submitting}
                      className="flex-1 bg-primary text-white py-3 rounded-lg font-poppins font-semibold hover:bg-primary/90 disabled:opacity-50">
                      {submitting ? "Saving..." : editing ? "Update Story" : "Add Story"}
                    </button>
                    <button type="button" onClick={() => setShowModal(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-poppins font-semibold hover:bg-gray-300">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
