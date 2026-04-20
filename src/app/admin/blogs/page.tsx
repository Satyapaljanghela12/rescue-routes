"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Upload } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";

interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  media: MediaItem[];
  author: string;
  createdAt: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    media: [] as MediaItem[],
    author: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 1080;
          canvas.height = 1440;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, 1080, 1440);
            const resizedImage = canvas.toDataURL('image/jpeg', 0.9);
            setFormData({ ...formData, image: resizedImage });
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
          setFormData(prev => ({
            ...prev,
            media: [...prev.media, { url: reader.result as string, type: mediaType }]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeMedia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingBlog ? `/api/blogs?id=${editingBlog._id}` : "/api/blogs";
      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchBlogs();
        setShowModal(false);
        setEditingBlog(null);
        setFormData({ title: "", description: "", content: "", image: "", media: [], author: "" });
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description,
      content: blog.content,
      image: blog.image,
      media: blog.media || [],
      author: blog.author,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-64">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto p-8 mt-8">
          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <button
              onClick={() => {
                setEditingBlog(null);
                setFormData({ title: "", description: "", content: "", image: "", media: [], author: "" });
                setShowModal(true);
              }}
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90"
            >
              <Plus className="w-5 h-5" />
              Add Blog
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg">
              <p className="text-gray-500">No blogs yet. Create your first blog!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {blogs.map((blog) => (
                <div key={blog._id} className="bg-white rounded-lg shadow-md p-6 flex gap-6">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">{blog.description}</p>
                    <p className="text-sm text-gray-500">By {blog.author}</p>
                    {blog.media && blog.media.length > 0 && (
                      <p className="text-sm text-primary mt-2">{blog.media.length} media items</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {editingBlog ? "Edit Blog" : "Add New Blog"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Author</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Short Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2"
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Full Content</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2"
                      rows={6}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Blog Image (Thumbnail)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="mt-2 w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Media Gallery (Images & Videos)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleMediaUpload}
                        className="hidden"
                        id="media-upload"
                      />
                      <label htmlFor="media-upload" className="cursor-pointer flex flex-col items-center gap-2 text-gray-600">
                        <Upload className="w-8 h-8" />
                        <span className="text-sm">Click to upload images and videos</span>
                      </label>
                    </div>
                    
                    {formData.media.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {formData.media.map((item, index) => (
                          <div key={index} className="relative group">
                            {item.type === 'image' ? (
                              <img
                                src={item.url}
                                alt={`Media ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            ) : (
                              <video
                                src={item.url}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => removeMedia(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
                    >
                      {editingBlog ? "Update Blog" : "Create Blog"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditingBlog(null);
                      }}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                    >
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
