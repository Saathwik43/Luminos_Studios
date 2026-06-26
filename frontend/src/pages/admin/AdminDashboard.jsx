import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Trash2, LogOut, Image as ImageIcon, Folder, Settings, Loader2, X, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload', 'manage', 'settings'
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  const [uploadFiles, setUploadFiles] = useState([]); // Array of File objects
  const [uploadCategory, setUploadCategory] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://bw-backend-t2ky.onrender.com/api/categories');
      const data = await res.json();
      setCategories(data);
      if (data.length > 0 && !uploadCategory) {
        setUploadCategory(data[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await fetch('https://bw-backend-t2ky.onrender.com/api/images');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchImages();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName) return;
    
    try {
      const res = await fetch('https://bw-backend-t2ky.onrender.com/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newCategoryName })
      });
      if (res.ok) {
        setNewCategoryName('');
        fetchCategories();
      } else {
        alert('Failed to create category');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add files (merge with existing selection, avoid duplicates by name)
  const addFiles = (newFiles) => {
    const fileArray = Array.from(newFiles).filter(f => f.type.startsWith('image/'));
    setUploadFiles(prev => {
      const existingNames = new Set(prev.map(f => f.name));
      const unique = fileArray.filter(f => !existingNames.has(f.name));
      return [...prev, ...unique];
    });
  };

  const removeFile = (index) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Drag and Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (uploadFiles.length === 0 || !uploadCategory) return;

    setUploading(true);
    setUploadProgress({ current: 0, total: uploadFiles.length });

    const formData = new FormData();
    uploadFiles.forEach(file => {
      formData.append('images', file);
    });
    formData.append('category', uploadCategory);
    if (uploadCaption) {
      formData.append('caption', uploadCaption);
    }

    try {
      const res = await fetch('https://bw-backend-t2ky.onrender.com/api/images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (res.ok) {
        const result = await res.json();
        setUploadProgress({ current: result.length, total: result.length });
        setUploadFiles([]);
        setUploadCaption('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchImages();
        alert(`Successfully uploaded ${result.length} image${result.length > 1 ? 's' : ''}!`);
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
    setUploading(false);
    setUploadProgress({ current: 0, total: 0 });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const res = await fetch(`https://bw-backend-t2ky.onrender.com/api/images/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchImages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalSize = uploadFiles.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="min-h-screen bg-bw-black flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-bw-dark border-r border-bw-gray md:min-h-screen flex flex-col">
        <div className="p-6 border-b border-bw-gray">
          <h2 className="text-xl font-serif font-bold">B&W Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('upload')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'upload' ? 'bg-bw-white text-bw-black' : 'text-bw-light/70 hover:bg-bw-gray hover:text-bw-white'}`}
          >
            <UploadCloud size={18} /> Upload Images
          </button>
          <button 
            onClick={() => setActiveTab('manage')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'manage' ? 'bg-bw-white text-bw-black' : 'text-bw-light/70 hover:bg-bw-gray hover:text-bw-white'}`}
          >
            <ImageIcon size={18} /> Manage Galleries
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-bw-white text-bw-black' : 'text-bw-light/70 hover:bg-bw-gray hover:text-bw-white'}`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-bw-gray">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-bw-gray transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        
        {activeTab === 'upload' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-serif mb-8">Upload New Work</h1>
            
            <form onSubmit={handleUpload} className="space-y-8 bg-bw-dark p-8 border border-bw-gray">
              
              {/* Drag and Drop Zone */}
              <div 
                className={`relative border-2 border-dashed p-12 text-center transition-colors ${dragActive ? 'border-bw-white bg-bw-gray/50' : 'border-bw-gray hover:border-bw-light/50'} ${uploadFiles.length > 0 ? 'bg-bw-gray/20 border-bw-white/50' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) addFiles(e.target.files);
                  }}
                />
                
                <div className="flex flex-col items-center">
                  <UploadCloud className="text-bw-light/50 mb-4" size={48} strokeWidth={1} />
                  <p className="text-bw-white font-medium mb-1">Drag and drop images here</p>
                  <p className="text-bw-light/50 text-sm">or click to browse — select multiple files at once</p>
                </div>
              </div>

              {/* Selected Files List */}
              {uploadFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-xs uppercase tracking-wider text-bw-light/50">
                      {uploadFiles.length} file{uploadFiles.length > 1 ? 's' : ''} selected — {(totalSize / 1024 / 1024).toFixed(2)} MB total
                    </p>
                    <button 
                      type="button" 
                      onClick={() => { setUploadFiles([]); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-1 border border-bw-gray rounded p-2">
                    {uploadFiles.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="flex items-center justify-between py-1.5 px-2 bg-bw-black/50 text-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <ImageIcon size={14} className="text-bw-light/50 flex-shrink-0" />
                          <span className="text-bw-white truncate">{file.name}</span>
                          <span className="text-bw-light/40 text-xs flex-shrink-0">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => removeFile(index)} 
                          className="text-bw-light/40 hover:text-red-400 transition-colors flex-shrink-0 ml-2"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Details */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2">Gallery Category</label>
                  <select 
                    className="w-full bg-bw-black border border-bw-gray py-3 px-4 text-bw-white focus:outline-none focus:border-bw-white transition-colors appearance-none" 
                    value={uploadCategory}
                    onChange={e => setUploadCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2">Caption (Optional — applies to all)</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-bw-gray py-2 text-bw-white focus:outline-none focus:border-bw-white transition-colors" 
                    value={uploadCaption}
                    onChange={e => setUploadCaption(e.target.value)}
                    placeholder="Enter a description for these images..."
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={uploading || uploadFiles.length === 0} 
                className="w-full btn-primary flex justify-center items-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Uploading {uploadFiles.length} image{uploadFiles.length > 1 ? 's' : ''} to Cloudinary...
                  </>
                ) : (
                  <>
                    <UploadCloud size={20} />
                    Upload {uploadFiles.length > 0 ? `${uploadFiles.length} Image${uploadFiles.length > 1 ? 's' : ''}` : 'Images'}
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'manage' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-serif mb-8 flex justify-between items-center">
              Manage Galleries
              <span className="text-sm font-sans text-bw-light/50 font-normal bg-bw-dark px-3 py-1 rounded-full border border-bw-gray">{images.length} Photos Total</span>
            </h1>
            
            <div className="bg-bw-dark border border-bw-gray overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bw-black/50 border-b border-bw-gray">
                    <th className="p-4 text-xs uppercase tracking-wider text-bw-light/50 font-medium">Preview</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-bw-light/50 font-medium">Category</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-bw-light/50 font-medium hidden md:table-cell">Caption</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-bw-light/50 font-medium">Date</th>
                    <th className="p-4 text-right text-xs uppercase tracking-wider text-bw-light/50 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bw-gray">
                  {images.map(img => (
                    <tr key={img._id} className="hover:bg-bw-gray/20 transition-colors">
                      <td className="p-4">
                        <img src={img.url} alt="thumbnail" className="w-16 h-16 object-cover bg-bw-black border border-bw-gray" />
                      </td>
                      <td className="p-4 font-medium">{img.category?.name || 'Uncategorized'}</td>
                      <td className="p-4 text-bw-light/70 text-sm hidden md:table-cell truncate max-w-[200px]">{img.caption || '—'}</td>
                      <td className="p-4 text-bw-light/50 text-sm">{new Date(img.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDelete(img._id)} className="p-2 text-bw-light/50 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Delete Image">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {images.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-bw-light/50 italic">No images found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-serif mb-8">Settings</h1>
            
            <div className="bg-bw-dark p-8 border border-bw-gray mb-8">
              <h3 className="text-xl mb-6 flex items-center gap-2"><Folder size={20} /> Manage Categories</h3>
              <form onSubmit={handleCreateCategory} className="flex gap-4 items-end mb-8">
                <div className="flex-1">
                  <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2">New Category Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-bw-gray py-2 text-bw-white focus:outline-none focus:border-bw-white transition-colors" 
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Exhibitions"
                    required 
                  />
                </div>
                <button type="submit" className="btn-outline py-2">Add</button>
              </form>

              <div>
                <h4 className="text-sm uppercase tracking-wider text-bw-light/50 mb-4">Active Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <span key={cat._id} className="bg-bw-black border border-bw-gray px-4 py-2 text-sm text-bw-white">
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
