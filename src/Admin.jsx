import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Trash, Check, Plus, LogOut, ChevronRight, MessageSquare, BookOpen, Eye, Edit3, Image as ImageIcon, Users, Settings as SettingsIcon, Mail, Phone, MapPin, Globe, Share2, Quote, Lock } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [activeTab, setActiveTab] = useState('quotes');
    const [loading, setLoading] = useState(false);

    // Login State
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    // Data State
    const [quotes, setQuotes] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', image: '' });
    const [editingId, setEditingId] = useState(null);

    // Profile & Settings State
    const [aboutInfo, setAboutInfo] = useState({ title: '', description: '', mission: '', image: '', team: [] });
    const [settingsInfo, setSettingsInfo] = useState({ email: '', notificationEmail: '', phone: '', address: '', socials: { facebook: '', twitter: '', linkedin: '', github: '' } });
    const [newTeamMember, setNewTeamMember] = useState({ name: '', role: '', image: '', bio: '' });
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [uploading, setUploading] = useState(false);

    const Reveal = ({ children, delay = 0 }) => (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
            fetchData();
        }
    }, [token, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            if (activeTab === 'quotes') {
                const res = await axios.get(`${API_URL}/quotes/all`, config);
                setQuotes(res.data);
            } else if (activeTab === 'blogs') {
                const res = await axios.get(`${API_URL}/blogs`, config);
                setBlogs(res.data);
            } else if (activeTab === 'reviews') {
                const res = await axios.get(`${API_URL}/reviews/all`, config);
                setReviews(res.data);
            } else if (activeTab === 'profile') {
                const res = await axios.get(`${API_URL}/about`, config);
                setAboutInfo(res.data);
            } else if (activeTab === 'settings') {
                const res = await axios.get(`${API_URL}/settings`, config);
                const data = res.data;
                // Ensure socials exist
                if (!data.socials) data.socials = { facebook: '', twitter: '', linkedin: '', github: '' };
                setSettingsInfo(data);
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) handleLogout();
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/auth/login`, credentials);
            localStorage.setItem('adminToken', res.data.token);
            setToken(res.data.token);
            setIsLoggedIn(true);
            setError('');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setIsLoggedIn(false);
    };

    const handleUpdateQuoteStatus = async (id, status) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.patch(`${API_URL}/quotes/${id}/status`, { status }, config);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteQuote = async (id) => {
        if (!window.confirm('Delete this quote?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`${API_URL}/quotes/${id}`, config);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm('Delete this blog?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`${API_URL}/blogs/${id}`, config);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddBlog = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            if (editingId) {
                await axios.patch(`${API_URL}/blogs/${editingId}`, blogForm, config);
                setEditingId(null);
            } else {
                await axios.post(`${API_URL}/blogs/add`, blogForm, config);
            }
            setBlogForm({ title: '', slug: '', excerpt: '', content: '', image: '' });
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Error saving blog. Check slug uniqueness.');
        }
    };

    const handleEditBlog = (blog) => {
        setEditingId(blog._id);
        setBlogForm({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            image: blog.image || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdateReviewStatus = async (id, status) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.patch(`${API_URL}/reviews/${id}/status`, { status }, config);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteReview = async (id) => {
        if (!window.confirm('Delete this review?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`${API_URL}/reviews/${id}`, config);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUploadImage = async (file, type, index = null) => {
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } };
            const res = await axios.post(`${API_URL}/upload/image`, formData, config);
            const url = res.data.url;

            if (type === 'blog') setBlogForm({ ...blogForm, image: url });
            if (type === 'about') setAboutInfo({ ...aboutInfo, image: url });
            if (type === 'team_new') setNewTeamMember({ ...newTeamMember, image: url });
            if (type === 'team_edit' && index !== null) {
                const updatedTeam = [...aboutInfo.team];
                updatedTeam[index].image = url;
                setAboutInfo({ ...aboutInfo, team: updatedTeam });
            }
        } catch (err) {
            console.error(err);
            alert('Upload failed. Check Cloudinary credentials in .env');
        } finally {
            setUploading(false);
        }
    };

    const handleSaveProfile = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post(`${API_URL}/about/update`, aboutInfo, config);
            alert('Profile updated successfully');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveSettings = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post(`${API_URL}/settings/update`, settingsInfo, config);
            alert('Settings updated successfully');
        } catch (err) {
            console.error(err);
            alert('Error updating settings');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post(`${API_URL}/auth/change-password`, {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            }, config);
            alert('Password updated successfully');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error changing password');
        }
    };

    const handleAddTeamMember = () => {
        setAboutInfo({ ...aboutInfo, team: [...aboutInfo.team, newTeamMember] });
        setNewTeamMember({ name: '', role: '', image: '', bio: '' });
    };

    const handleRemoveTeamMember = (index) => {
        const updatedTeam = aboutInfo.team.filter((_, i) => i !== index);
        setAboutInfo({ ...aboutInfo, team: updatedTeam });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setBlogForm({ title: '', slug: '', excerpt: '', content: '', image: '' });
    };

    if (!isLoggedIn) {
        return (
            <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-6 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-neutral-950 border border-white/10 rounded-3xl p-10"
                >
                    <div className="text-center mb-10">
                        <img src="/inc-02.png" alt="INCODEX" className="h-8 mx-auto mb-6" />
                        <h2 className="text-2xl font-black text-white uppercase tracking-widest text-center">Admin Access</h2>
                        {error && <p className="text-red-500 text-xs mt-4 font-bold tracking-widest uppercase">{error}</p>}
                    </div>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Username</label>
                            <input
                                type="text"
                                placeholder="admin"
                                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/40 transition-all text-sm tracking-widest"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/40 transition-all text-sm tracking-widest"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />
                        </div>
                        <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:bg-neutral-200 transition-all mt-4">
                            Authorize
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const AdminNavLink = ({ active, onClick, icon: Icon, children }) => (
        <button
            onClick={onClick}
            className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 relative group overflow-hidden px-4 py-2 ${active ? 'text-white' : 'text-white/40 hover:text-white'}`}
        >
            <div className="flex items-center gap-2">
                <Icon size={12} className={active ? 'text-white' : 'text-white/20 group-hover:text-white transition-colors'} />
                <span className={`block transition-transform duration-500 ${active ? '' : 'group-hover:-translate-y-full'}`}>{children}</span>
                {!active && <span className="absolute top-full left-7 block group-hover:-translate-y-full transition-transform duration-500 text-white">{children}</span>}
            </div>
            {active && <motion.div layoutId="adminActiveTab" className="absolute bottom-0 left-0 w-full h-[1px] bg-white" />}
        </button>
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Top Navigation Bar - Synced with Homepage */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 w-full z-[100] bg-black/90 backdrop-blur-3xl border-b border-white/5 px-6 py-6"
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-12">
                        <img src="/inc-02.png" alt="INCODEX" className="h-6 opacity-80" />

                        <div className="hidden lg:flex items-center space-x-6">
                            <AdminNavLink active={activeTab === 'quotes'} onClick={() => setActiveTab('quotes')} icon={MessageSquare}>Quotes</AdminNavLink>
                            <AdminNavLink active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')} icon={BookOpen}>Journal</AdminNavLink>
                            <AdminNavLink active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} icon={Quote}>Reviews</AdminNavLink>
                            <AdminNavLink active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={Users}>Team</AdminNavLink>
                            <AdminNavLink active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={SettingsIcon}>Settings</AdminNavLink>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={handleLogout}
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-red-500 transition-all duration-500 flex items-center gap-2"
                        >
                            <LogOut size={12} /> Sign Out
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Navigation Dock */}
            <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900/90 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl z-50 flex gap-2 shadow-2xl">
                {[
                    { id: 'quotes', icon: MessageSquare },
                    { id: 'blogs', icon: BookOpen },
                    { id: 'reviews', icon: Quote },
                    { id: 'profile', icon: Users },
                    { id: 'settings', icon: SettingsIcon }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`p-4 rounded-xl transition-all ${activeTab === tab.id ? 'bg-white text-black' : 'text-white/40'
                            }`}
                    >
                        <tab.icon size={20} />
                    </button>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-40 pb-32">
                <header className="mb-20">
                    <Reveal>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
                            {activeTab === 'quotes' && 'Incoming Signals'}
                            {activeTab === 'blogs' && 'Journal Archive'}
                            {activeTab === 'reviews' && 'Public Intelligence'}
                            {activeTab === 'profile' && 'Architect Registry'}
                            {activeTab === 'settings' && 'System Configuration'}
                        </h1>
                    </Reveal>
                    <div className="flex items-center gap-4">
                        <div className="h-px w-12 bg-white/20" />
                        <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.5em]">ADMIN PANEL // SECURE_HQ</p>
                    </div>
                </header>

                {activeTab === 'quotes' && (
                    <div className="grid gap-6">
                        {loading ? (
                            <div className="p-20 text-center opacity-20 uppercase font-black tracking-widest">Encrypting Communication...</div>
                        ) : quotes.length === 0 ? (
                            <div className="p-20 text-center opacity-20 uppercase font-black tracking-widest">No Incoming Signals.</div>
                        ) : quotes.map((quote) => (
                            <div key={quote._id} className="bg-neutral-950 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all flex flex-col md:flex-row justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${quote.status === 'pending' ? 'bg-amber-500/20 text-amber-500' : 'bg-green-500/20 text-green-500'}`}>
                                            {quote.status}
                                        </span>
                                        <span className="text-[8px] text-white/30 font-bold uppercase tracking-widest">Received {new Date(quote.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-xl font-black uppercase mb-1">{quote.firstName} {quote.lastName}</h3>
                                    <p className="text-white/40 text-xs mb-4 font-bold tracking-widest">{quote.email}</p>
                                    <p className="text-white/60 text-sm italic mb-6 leading-relaxed max-w-2xl">"{quote.message}"</p>
                                    <div className="flex flex-wrap gap-2">
                                        {quote.selectedServices?.map((s, i) => (
                                            <span key={i} className="text-[9px] border border-white/10 px-3 py-1 rounded-md text-white/40 uppercase font-black tracking-widest">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-row md:flex-col gap-3 justify-end items-end">
                                    <div className="text-right mb-4 hidden md:block">
                                        <p className="text-[10px] text-white/20 uppercase font-black tracking-[0.3em] mb-1">Investment</p>
                                        <p className="text-3xl font-black tracking-tighter">${quote.totalCost}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdateQuoteStatus(quote._id, 'contacted')}
                                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-black hover:border-green-500 transition-all"
                                            title="Mark as Contacted"
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteQuote(quote._id)}
                                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-500 hover:text-black hover:border-red-500 transition-all"
                                            title="Delete Signal"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'blogs' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-1">
                            <div className="sticky top-32 bg-neutral-900/50 border border-white/10 rounded-3xl p-8">
                                <h2 className="text-sm font-black uppercase tracking-[0.4em] mb-8 text-white/50">{editingId ? 'Edit Journal' : 'Publish New'}</h2>
                                <form className="space-y-5" onSubmit={handleAddBlog}>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Cover Image URL</label>
                                        <input
                                            type="text"
                                            placeholder="https://..."
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm"
                                            value={blogForm.image}
                                            onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Blog Title</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm"
                                            value={blogForm.title}
                                            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Slug (URL path)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm"
                                            value={blogForm.slug}
                                            onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Excerpt (Brief)</label>
                                        <textarea
                                            rows="3"
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm resize-none"
                                            value={blogForm.excerpt}
                                            onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Content (Journal Body)</label>
                                        <textarea
                                            rows="6"
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm resize-none"
                                            value={blogForm.content}
                                            onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="flex-grow py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2">
                                            {editingId ? <Check size={16} /> : <Plus size={16} />}
                                            {editingId ? 'Update' : 'Publish'}
                                        </button>
                                        {editingId && (
                                            <button
                                                type="button"
                                                onClick={cancelEdit}
                                                className="px-6 py-4 border border-white/10 text-white/40 uppercase font-black text-[10px] tracking-widest rounded-xl hover:text-white transition-all"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-2 grid gap-6">
                            {blogs.map((blog) => (
                                <div
                                    key={blog._id}
                                    className="bg-neutral-950 border border-white/10 rounded-3xl p-6 group hover:border-white/20 transition-all flex gap-6 items-center"
                                >
                                    <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hidden md:block">
                                        {blog.image ? (
                                            <img src={blog.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/5"><ImageIcon size={24} /></div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-lg font-black uppercase tracking-tight mb-1">{blog.title}</h4>
                                        <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest mb-3">Posted {new Date(blog.date).toLocaleDateString()} • /{blog.slug}</p>
                                        <p className="text-white/40 text-xs line-clamp-1">{blog.excerpt}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <a
                                            href={`/blog/${blog.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:border-white transition-all"
                                            title="View Live Story"
                                        >
                                            <Eye size={16} />
                                        </a>
                                        <button
                                            onClick={() => handleEditBlog(blog)}
                                            className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:border-white transition-all"
                                            title="Edit Story"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteBlog(blog._id); }}
                                            className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-red-500 hover:border-red-500 transition-all"
                                            title="Delete Story"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-1 border-r border-white/5 pr-10">
                            <div className="bg-neutral-900 self-start p-8 rounded-3xl border border-white/10">
                                <h2 className="text-sm font-black uppercase tracking-[0.4em] mb-8 text-white/50">Brand Strategy</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Hero Image URL</label>
                                        <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" value={aboutInfo.image} onChange={e => setAboutInfo({ ...aboutInfo, image: e.target.value })} placeholder="https://..." />
                                    </div>
                                    <input placeholder="Company Title" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" value={aboutInfo.title} onChange={e => setAboutInfo({ ...aboutInfo, title: e.target.value })} />
                                    <textarea placeholder="Mission Statement" rows="3" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm resize-none" value={aboutInfo.mission} onChange={e => setAboutInfo({ ...aboutInfo, mission: e.target.value })} />
                                    <textarea placeholder="Full Description" rows="6" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm resize-none" value={aboutInfo.description} onChange={e => setAboutInfo({ ...aboutInfo, description: e.target.value })} />
                                    <button onClick={handleSaveProfile} className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all">Update Narrative</button>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-neutral-900 border border-white/10 rounded-3xl p-8 mb-10">
                                <h2 className="text-sm font-black uppercase tracking-[0.4em] mb-8 text-white/50">Add Architect</h2>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <input placeholder="Full Name" className="bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-bold tracking-widest uppercase" value={newTeamMember.name} onChange={e => setNewTeamMember({ ...newTeamMember, name: e.target.value })} />
                                    <input placeholder="Role / Designation" className="bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-bold tracking-widest uppercase" value={newTeamMember.role} onChange={e => setNewTeamMember({ ...newTeamMember, role: e.target.value })} />
                                </div>
                                <div className="flex gap-4">
                                    <input placeholder="Member Photo URL" className="flex-grow bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" value={newTeamMember.image} onChange={e => setNewTeamMember({ ...newTeamMember, image: e.target.value })} />
                                    <button onClick={handleAddTeamMember} className="px-8 bg-white text-black font-black uppercase tracking-widest rounded-xl flex items-center gap-2"><Plus size={16} /> Deploy</button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {aboutInfo.team?.map((member, i) => (
                                    <div key={i} className="bg-neutral-950 border border-white/10 rounded-3xl p-6 flex gap-6 items-center group">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                                            <img src={member.image || '/avatar.png'} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt="" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-black uppercase tracking-tight text-white">{member.name}</h4>
                                            <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest italic">{member.role}</p>
                                        </div>
                                        <button onClick={() => handleRemoveTeamMember(i)} className="text-white/10 hover:text-red-500 transition-all"><Trash size={18} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="grid gap-6">
                        {loading ? (
                            <div className="p-20 text-center opacity-20 uppercase font-black tracking-widest">Scanning Signal Archive...</div>
                        ) : reviews.length === 0 ? (
                            <div className="p-20 text-center opacity-20 uppercase font-black tracking-widest">Gravity Well Empty (No Reviews).</div>
                        ) : reviews.map((review) => (
                            <div key={review._id} className="bg-neutral-950 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all flex justify-between items-center group">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${review.status === 'pending' ? 'bg-amber-500/20 text-amber-500' : 'bg-green-500/20 text-green-500'}`}>
                                            {review.status}
                                        </span>
                                        {[...Array(5)].map((_, s) => (
                                            <div key={s} className={`w-1 h-1 rounded-full ${s < review.rating ? 'bg-white' : 'bg-white/10'}`} />
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-black uppercase text-white mb-1 group-hover:translate-x-2 transition-transform">{review.name}</h3>
                                    <p className="text-[10px] text-white/20 font-black tracking-[0.4em] mb-4 uppercase italic">{review.email}</p>
                                    <p className="text-white/60 text-sm leading-relaxed max-w-2xl font-light italic">"{review.comment}"</p>
                                </div>
                                <div className="flex gap-3">
                                    {review.status === 'pending' && (
                                        <button onClick={() => handleUpdateReviewStatus(review._id, 'approved')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all" title="Approve Signal">
                                            <Check size={20} />
                                        </button>
                                    )}
                                    <button onClick={() => handleDeleteReview(review._id)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-500 hover:text-black transition-all" title="Decommission Review">
                                        <Trash size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="space-y-12">
                        <div className="grid lg:grid-cols-2 gap-10">
                            {/* Contact & Basics */}
                            <div className="space-y-10">
                                <div className="bg-neutral-900 border border-white/10 rounded-3xl p-10">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-2 text-white/50">
                                        <Mail size={16} className="text-white/20" /> Contact Signals
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Public Contact Email</label>
                                            <input className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-bold tracking-widest text-white outline-none focus:border-white/40" value={settingsInfo.email} onChange={e => setSettingsInfo({ ...settingsInfo, email: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Quote Receiver Email</label>
                                            <input className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-bold tracking-widest text-white outline-none focus:border-white/40" value={settingsInfo.notificationEmail} onChange={e => setSettingsInfo({ ...settingsInfo, notificationEmail: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Office Phone</label>
                                            <input className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-bold tracking-widest text-white outline-none focus:border-white/40" value={settingsInfo.phone} onChange={e => setSettingsInfo({ ...settingsInfo, phone: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Headquarters</label>
                                            <input className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-bold tracking-widest text-white outline-none focus:border-white/40" value={settingsInfo.address} onChange={e => setSettingsInfo({ ...settingsInfo, address: e.target.value })} />
                                        </div>
                                        <button onClick={handleSaveSettings} className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] rounded-xl hover:bg-neutral-200 transition-all mt-4">Save Core Settings</button>
                                    </div>
                                </div>

                                <div className="bg-neutral-900 border border-white/10 rounded-3xl p-10">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-2 text-white/50">
                                        <Share2 size={16} className="text-white/20" /> Social Presence
                                    </h3>
                                    <div className="space-y-6">
                                        {['facebook', 'twitter', 'linkedin', 'github'].map(key => (
                                            <div key={key} className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">{key.toUpperCase()}</label>
                                                <input className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-bold tracking-widest text-white outline-none focus:border-white/40" value={settingsInfo.socials?.[key] || ''} onChange={e => setSettingsInfo({ ...settingsInfo, socials: { ...settingsInfo.socials, [key]: e.target.value } })} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Security & Access */}
                            <div className="space-y-10">
                                <div className="bg-neutral-900 border border-white/10 rounded-3xl p-10">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-2 text-white/50">
                                        <Lock size={16} className="text-white/20" /> Access Security
                                    </h3>
                                    <form onSubmit={handlePasswordChange} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Current Key</label>
                                            <input
                                                type="password"
                                                className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-bold tracking-widest text-white outline-none focus:border-white/40"
                                                value={passwordData.currentPassword}
                                                onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">New Key</label>
                                            <input
                                                type="password"
                                                className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-bold tracking-widest text-white outline-none focus:border-white/40"
                                                value={passwordData.newPassword}
                                                onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Verify New Key</label>
                                            <input
                                                type="password"
                                                className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-bold tracking-widest text-white outline-none focus:border-white/40"
                                                value={passwordData.confirmPassword}
                                                onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="w-full py-5 border border-white/20 text-white font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white hover:text-black transition-all mt-4">Update Access Key</button>
                                    </form>
                                </div>

                                <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-10">
                                    <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-4 text-red-500">Danger Zone</h3>
                                    <p className="text-white/40 text-xs mb-8 tracking-wide font-light">Permanently terminate your current session and exit the command center.</p>
                                    <button onClick={handleLogout} className="w-full py-5 bg-red-600/10 text-red-500 border border-red-500/20 font-black uppercase tracking-[0.3em] rounded-xl hover:bg-red-600 hover:text-white transition-all">Sign Out Everywhere</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
