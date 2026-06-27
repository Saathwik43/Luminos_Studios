import React, { useState, useEffect, useRef } from 'react';
import { 
  UploadCloud, Trash2, LogOut, Image as ImageIcon, Briefcase, 
  Settings, Loader2, X, CheckCircle, ArrowUp, ArrowDown, 
  ChevronDown, BookOpen, Plus, Edit3, Save, Calendar, Mail, FileText
} from 'lucide-react';
import { API_URL } from '../../config';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'upload', 'manage', 'services', 'settings'
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Image upload states
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadCategory, setUploadCategory] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Service form states
  const [isEditingService, setIsEditingService] = useState(null); // service object if editing, otherwise null
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price: '',
    featuresText: '', // raw newline separated string
    category: 'Weddings'
  });

  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
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
      const res = await fetch(`${API_URL}/images`);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/services`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
      fetchImages();
      fetchServices();
      fetchBookings();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  // 1. Categories Management
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName) return;
    
    try {
      const res = await fetch(`${API_URL}/categories`, {
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

  // 2. Image Management & Uploads
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

    const formData = new FormData();
    uploadFiles.forEach(file => {
      formData.append('images', file);
    });
    formData.append('category', uploadCategory);
    if (uploadCaption) {
      formData.append('caption', uploadCaption);
    }

    try {
      const res = await fetch(`${API_URL}/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (res.ok) {
        const result = await res.json();
        setUploadFiles([]);
        setUploadCaption('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchImages();
        alert(`Successfully uploaded ${result.length} image(s)!`);
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const res = await fetch(`${API_URL}/images/${id}`, {
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

  const handleUpdateImageCategory = async (id, categoryIdOrName) => {
    let finalValue = categoryIdOrName;
    if (categoryIdOrName === 'NEW') {
      const newCat = window.prompt("Enter new category name:");
      if (!newCat || newCat.trim().length === 0) return;
      finalValue = newCat.trim();
    }

    try {
      const res = await fetch(`${API_URL}/images/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ category: finalValue })
      });
      if (res.ok) {
        fetchImages();
        fetchCategories();
      } else {
        alert('Failed to update image category');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Image Reordering logic
  const handleMoveImage = async (index, direction) => {
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    
    // Swap images in local state
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    setImages(newImages);

    // Save order immediately to backend
    try {
      const imageIds = newImages.map(img => img._id);
      const res = await fetch(`${API_URL}/images/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ imageIds })
      });
      if (!res.ok) {
        console.error('Failed to save image order');
      }
    } catch (err) {
      console.error('Error reordering images:', err);
    }
  };

  // 3. Services Management
  const handleServiceFormSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, featuresText, category } = serviceForm;
    
    const payload = {
      name,
      description,
      price: parseFloat(price),
      features: featuresText.split('\n').map(f => f.trim()).filter(f => f.length > 0),
      category
    };

    try {
      let res;
      if (isEditingService) {
        // Edit Mode
        res = await fetch(`${API_URL}/services/${isEditingService._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        // Create Mode
        res = await fetch(`${API_URL}/services`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        setServiceForm({
          name: '',
          description: '',
          price: '',
          featuresText: '',
          category: 'Weddings'
        });
        setIsEditingService(null);
        fetchServices();
      } else {
        alert('Failed to save service');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditServiceClick = (service) => {
    setIsEditingService(service);
    setServiceForm({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      featuresText: service.features.join('\n'),
      category: service.category
    });
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service package?')) return;
    
    try {
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Booking Inquiries Management
  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchBookings();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalSize = uploadFiles.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-[#131316] border-r border-white/[0.06] md:min-h-screen flex flex-col">
        <div className="p-6 border-b border-white/[0.06]">
          <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            Luminos<span className="text-amber-400">CMS.</span>
          </h2>
          <p className="text-[10px] text-bw-light/40 uppercase tracking-widest mt-1">Studio Staff Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm ${
              activeTab === 'bookings' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/10' : 'text-bw-light/70 hover:bg-[#1E1E24] hover:text-white'
            }`}
          >
            <Calendar size={15} /> Bookings
          </button>
          
          <button 
            onClick={() => setActiveTab('upload')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm ${
              activeTab === 'upload' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/10' : 'text-bw-light/70 hover:bg-[#1E1E24] hover:text-white'
            }`}
          >
            <UploadCloud size={15} /> Upload Photos
          </button>
          
          <button 
            onClick={() => setActiveTab('manage')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm ${
              activeTab === 'manage' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/10' : 'text-bw-light/70 hover:bg-[#1E1E24] hover:text-white'
            }`}
          >
            <ImageIcon size={15} /> Reorder Gallery
          </button>
          
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm ${
              activeTab === 'services' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/10' : 'text-bw-light/70 hover:bg-[#1E1E24] hover:text-white'
            }`}
          >
            <Briefcase size={15} /> Services
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm ${
              activeTab === 'settings' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/10' : 'text-bw-light/70 hover:bg-[#1E1E24] hover:text-white'
            }`}
          >
            <Settings size={15} /> Settings
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/[0.06]">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-red-400 hover:bg-red-950/10 rounded-sm transition-colors">
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-screen">
        
        {/* TAB 1: BOOKING INQUIRIES */}
        {activeTab === 'bookings' && (
          <div className="animate-fade-in space-y-8">
            <h1 className="text-3xl font-serif mb-8 flex justify-between items-center text-white">
              Customer Bookings
              <span className="text-xs font-sans text-bw-light/50 font-semibold bg-[#131316] px-4 py-1.5 rounded-full border border-white/[0.06]">
                {bookings.length} Inquiries Total
              </span>
            </h1>

            <div className="bg-[#131316] border border-white/[0.06] rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-bw-black/40 border-b border-white/[0.06] text-[10px] uppercase tracking-wider text-bw-light/50 font-semibold">
                      <th className="p-4">Customer</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Event Date</th>
                      <th className="p-4">Services Selected</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-sm">
                    {bookings.map(booking => (
                      <tr key={booking._id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-4 font-semibold text-white">
                          {booking.customerName}
                        </td>
                        <td className="p-4 text-bw-light/70 text-xs">
                          <div className="flex items-center gap-1.5"><Mail size={12} className="text-amber-500" /> {booking.customerEmail}</div>
                          {booking.notes && (
                            <div className="mt-2 text-bw-light/45 max-w-[220px] truncate" title={booking.notes}>
                              <FileText size={11} className="inline mr-1" /> {booking.notes}
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-white">
                          {new Date(booking.eventDate).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-xs space-y-1">
                          {booking.services.map((s, idx) => (
                            <div key={idx} className="bg-white/[0.03] border border-white/[0.04] px-2 py-0.5 rounded text-bw-light/80">
                              {s.name} (₹{s.price.toLocaleString('en-IN')})
                            </div>
                          ))}
                        </td>
                        <td className="p-4 text-amber-400 font-semibold font-sans">
                          ₹{booking.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            booking.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            booking.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                            booking.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                            'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end items-center gap-2">
                            <select 
                              value={booking.status}
                              onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
                              className="bg-[#0A0A0C] border border-white/[0.08] text-xs py-1 px-2 text-bw-light/80 focus:outline-none focus:border-amber-500/50 rounded-sm"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan="7" className="p-8 text-center text-bw-light/50 italic">No bookings found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UPLOAD PHOTOS */}
        {activeTab === 'upload' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-serif mb-8 text-white">Upload New Work</h1>
            
            <form onSubmit={handleUpload} className="space-y-8 bg-[#131316] p-8 border border-white/[0.06] rounded-md shadow-lg">
              {/* Drag and Drop Zone */}
              <div 
                className={`relative border-2 border-dashed p-12 text-center rounded transition-colors ${
                  dragActive ? 'border-amber-500 bg-amber-500/5' : 'border-white/[0.08] hover:border-amber-500/40'
                } ${uploadFiles.length > 0 ? 'bg-white/[0.01] border-amber-500/30' : ''}`}
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
                  <UploadCloud className="text-bw-light/40 mb-4" size={48} strokeWidth={1} />
                  <p className="text-white font-medium mb-1">Drag and drop images here</p>
                  <p className="text-bw-light/50 text-xs">or click to browse — select multiple files at once</p>
                </div>
              </div>

              {/* Selected Files List */}
              {uploadFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] uppercase tracking-wider text-bw-light/50 font-semibold">
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
                  <div className="max-h-48 overflow-y-auto space-y-1.5 border border-white/[0.08] rounded p-3 bg-bw-black/30">
                    {uploadFiles.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="flex items-center justify-between py-1.5 px-3 bg-white/[0.02] text-xs rounded-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <ImageIcon size={14} className="text-amber-500 flex-shrink-0" />
                          <span className="text-bw-light/85 truncate">{file.name}</span>
                          <span className="text-bw-light/30 flex-shrink-0">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
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
                  <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">Gallery Category</label>
                  <select 
                    className="w-full bg-[#0A0A0C] border border-white/[0.08] focus:border-amber-500/50 py-3 px-4 text-white text-sm rounded-sm focus:outline-none appearance-none" 
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
                  <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">Caption (Optional — applies to all)</label>
                  <input 
                    type="text" 
                    className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors" 
                    value={uploadCaption}
                    onChange={e => setUploadCaption(e.target.value)}
                    placeholder="Enter a description for these images..."
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={uploading || uploadFiles.length === 0} 
                className="w-full btn-primary py-3.5 flex justify-center items-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Uploading {uploadFiles.length} image(s)...
                  </>
                ) : (
                  <>
                    <UploadCloud size={20} />
                    Upload {uploadFiles.length > 0 ? `${uploadFiles.length} Photo${uploadFiles.length > 1 ? 's' : ''}` : 'Photos'}
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: MANAGE GALLERIES & REORDER */}
        {activeTab === 'manage' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-serif mb-8 flex justify-between items-center text-white">
              Manage Galleries & Reorder
              <span className="text-xs font-sans text-bw-light/50 font-semibold bg-[#131316] px-4 py-1.5 rounded-full border border-white/[0.06]">
                {images.length} Photos Total
              </span>
            </h1>
            
            <p className="text-sm text-bw-light/50 font-light mb-8">
              Adjust sequence by clicking the Up and Down arrow buttons next to each photo. The changes save dynamically to the database.
            </p>

            <div className="bg-[#131316] border border-white/[0.06] rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bw-black/40 border-b border-white/[0.06] text-[10px] uppercase tracking-wider text-bw-light/50 font-semibold">
                    <th className="p-4">Position</th>
                    <th className="p-4">Preview</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 hidden md:table-cell">Caption</th>
                    <th className="p-4">Reorder</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {images.map((img, index) => (
                    <tr key={img._id} className="hover:bg-white/[0.01] transition-colors text-sm">
                      <td className="p-4 font-mono text-xs text-bw-light/40">
                        #{index + 1}
                      </td>
                      <td className="p-4">
                        <img src={img.url} alt="thumbnail" className="w-14 h-14 object-cover bg-bw-black border border-white/[0.06] rounded-sm" />
                      </td>
                      <td className="p-4">
                        <select
                          value={img.category?._id || ''}
                          onChange={(e) => handleUpdateImageCategory(img._id, e.target.value)}
                          className="bg-[#0A0A0C] border border-white/[0.08] text-xs py-1.5 px-2 text-bw-light/80 focus:outline-none focus:border-amber-500/50 rounded-sm w-full max-w-[150px]"
                        >
                          <option value="" disabled>Select Category</option>
                          {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                          ))}
                          <option value="NEW">+ Add New Category</option>
                        </select>
                      </td>
                      <td className="p-4 text-bw-light/70 text-xs hidden md:table-cell max-w-[200px] truncate">{img.caption || '—'}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleMoveImage(index, 'up')}
                            disabled={index === 0}
                            className={`p-1.5 rounded border transition-colors ${
                              index === 0 
                                ? 'border-white/[0.03] text-bw-light/20 cursor-not-allowed' 
                                : 'border-white/[0.08] hover:border-amber-500/40 text-bw-light/70 hover:text-amber-400 hover:bg-white/[0.02]'
                            }`}
                            title="Move Up"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button 
                            onClick={() => handleMoveImage(index, 'down')}
                            disabled={index === images.length - 1}
                            className={`p-1.5 rounded border transition-colors ${
                              index === images.length - 1 
                                ? 'border-white/[0.03] text-bw-light/20 cursor-not-allowed' 
                                : 'border-white/[0.08] hover:border-amber-500/40 text-bw-light/70 hover:text-amber-400 hover:bg-white/[0.02]'
                            }`}
                            title="Move Down"
                          >
                            <ArrowDown size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDeleteImage(img._id)} className="p-2 text-bw-light/50 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Delete Image">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {images.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-bw-light/50 italic">No images found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SERVICES MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Catalog List */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl font-serif mb-6 text-white flex justify-between items-center">
                Service Catalog
                <span className="text-xs font-sans text-bw-light/50 font-semibold bg-[#131316] px-4 py-1.5 rounded-full border border-white/[0.06]">
                  {services.length} Packages
                </span>
              </h1>

              <div className="space-y-4">
                {services.map(service => (
                  <div key={service._id} className="bg-[#131316] border border-white/[0.06] p-6 rounded-md flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <span className="text-[9px] font-semibold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full mb-2 inline-block">
                        {service.category}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-white truncate">{service.name}</h3>
                      <p className="text-xs text-bw-light/50 font-light mt-1 line-clamp-2 leading-relaxed">{service.description}</p>
                      <span className="text-sm font-semibold text-amber-400 mt-2 block font-sans">₹{service.price.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button 
                        onClick={() => handleEditServiceClick(service)}
                        className="p-2 text-bw-light/50 hover:text-amber-400 hover:bg-amber-400/10 rounded transition-colors"
                        title="Edit Package"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteService(service._id)}
                        className="p-2 text-bw-light/50 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                        title="Delete Package"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {services.length === 0 && (
                  <div className="text-center py-12 border border-white/5 border-dashed rounded-md bg-bw-dark/30 text-bw-light/50 italic text-sm">
                    No service packages currently cataloged.
                  </div>
                )}
              </div>
            </div>

            {/* Service Form */}
            <div className="lg:col-span-5 bg-[#131316] border border-white/[0.06] p-6 rounded-md shadow-lg">
              <h2 className="text-xl font-serif mb-6 font-semibold text-white flex items-center gap-2">
                <Plus size={18} className="text-amber-400" />
                {isEditingService ? 'Edit Package' : 'Create Package'}
              </h2>

              <form onSubmit={handleServiceFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">Package Name</label>
                  <input 
                    type="text" 
                    value={serviceForm.name}
                    onChange={e => setServiceForm({ ...serviceForm, name: e.target.value })}
                    className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors" 
                    placeholder="e.g. Cinematic Wedding Highlight"
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">Price (₹)</label>
                    <input 
                      type="number" 
                      value={serviceForm.price}
                      onChange={e => setServiceForm({ ...serviceForm, price: e.target.value })}
                      className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors" 
                      placeholder="e.g. 50000"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">Category</label>
                    <select 
                      value={serviceForm.category}
                      onChange={e => setServiceForm({ ...serviceForm, category: e.target.value })}
                      className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors appearance-none" 
                    >
                      <option value="Weddings">Weddings</option>
                      <option value="Portraits">Portraits</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Birthdays">Birthdays</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">Description</label>
                  <textarea 
                    value={serviceForm.description}
                    onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })}
                    className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors resize-none" 
                    placeholder="Provide description of package..."
                    rows="3" 
                    required 
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">
                    Features / Customisations (One per line)
                  </label>
                  <textarea 
                    value={serviceForm.featuresText}
                    onChange={e => setServiceForm({ ...serviceForm, featuresText: e.target.value })}
                    className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors resize-none" 
                    placeholder="e.g. 10 Hours of coverage&#10;Digital delivery in 4K&#10;Photobook included"
                    rows="4" 
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-3">
                  <button 
                    type="submit" 
                    className="flex-1 btn-primary py-2.5 text-sm"
                  >
                    <Save size={16} />
                    {isEditingService ? 'Update Package' : 'Save Package'}
                  </button>
                  {isEditingService && (
                    <button 
                      type="button"
                      onClick={() => {
                        setIsEditingService(null);
                        setServiceForm({
                          name: '',
                          description: '',
                          price: '',
                          featuresText: '',
                          category: 'Weddings'
                        });
                      }}
                      className="px-5 border border-white/[0.08] hover:bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-bw-light/60 hover:text-white rounded-sm transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS & CATEGORIES */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-serif mb-8 text-white">CMS Settings</h1>
            
            <div className="bg-[#131316] p-8 border border-white/[0.06] rounded-md mb-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                <BookOpen size={20} className="text-amber-400" /> Manage Categories
              </h3>
              <form onSubmit={handleCreateCategory} className="flex gap-4 items-end mb-8">
                <div className="flex-1">
                  <label className="block text-xs uppercase tracking-wider text-bw-light/50 mb-2 font-medium">New Category Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-bw-black/60 border border-white/[0.08] focus:border-amber-500/50 rounded-sm py-2.5 px-4 text-white text-sm focus:outline-none transition-colors" 
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Birthday Bashes"
                    required 
                  />
                </div>
                <button type="submit" className="btn-outline py-2.5 px-6 text-sm">Add Category</button>
              </form>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-bw-light/50 mb-4 font-semibold">Active Categories</h4>
                <div className="flex flex-wrap gap-2.5">
                  {categories.map(cat => (
                    <span key={cat._id} className="bg-bw-black/60 border border-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white rounded-sm">
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
