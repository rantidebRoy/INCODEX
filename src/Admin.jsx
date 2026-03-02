import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Trash, Check, Plus, LogOut, ChevronRight, MessageSquare, BookOpen, Eye, Edit3 } from 'lucide-react';

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
    const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', image: '' });
    const [editingId, setEditingId] = useState(null);

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

    return (
        <div className="min-h-screen bg-black text-white p-6 pt-32">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 border-b border-white/5 pb-10">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Command Center</h1>
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">Managing Digital Assets</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="px-6 py-3 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-white transition-all flex items-center gap-2"
                        >
                            <LogOut size={14} /> Exit
                        </button>
                    </div>
                </div>

                <div className="flex gap-10 mb-12">
                    <button
                        onClick={() => setActiveTab('quotes')}
                        className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'quotes' ? 'text-white border-b-2 border-white pb-2' : 'text-white/20 hover:text-white/40 pb-2'}`}
                    >
                        <MessageSquare size={16} /> Quotes {quotes.length > 0 && `(${quotes.length})`}
                    </button>
                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'blogs' ? 'text-white border-b-2 border-white pb-2' : 'text-white/20 hover:text-white/40 pb-2'}`}
                    >
                        <BookOpen size={16} /> Journal
                    </button>
                </div>

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
                                <h2 className="text-xl font-black uppercase tracking-widest mb-8">{editingId ? 'Edit Journal' : 'Publish New'}</h2>
                                <form className="space-y-5" onSubmit={handleAddBlog}>
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
                                        {/* No image handler for simplicity in demo */}
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
            </div>
        </div>
    );
};

export default Admin;
