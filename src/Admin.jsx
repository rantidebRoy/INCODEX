import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash, Check, Plus, LogOut, ChevronRight, MessageSquare, BookOpen, Eye, Edit3, Image as ImageIcon, Users, Settings as SettingsIcon, Mail, Phone, MapPin, Globe, Share2, Quote, Lock, Zap, DollarSign, Layout, MoreVertical, Menu, X, ExternalLink } from 'lucide-react';

const getApiUrl = () => {
    let base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    if (base.endsWith('/')) base = base.slice(0, -1);
    return base.endsWith('/api') ? base : `${base}/api`;
};
const API_URL = getApiUrl();

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [activeTab, setActiveTab] = useState(localStorage.getItem('adminActiveTab') || 'quotes');
    const [loading, setLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('adminActiveTab', activeTab);
    }, [activeTab]);

    // Login State
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    // Data State
    const [quotes, setQuotes] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [projects, setProjects] = useState([]);
    const [expertise, setExpertise] = useState([]);
    const [services, setServices] = useState([]);
    const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', image: '' });
    const [projectForm, setProjectForm] = useState({ title: '', subtitle: '', description: '', url: '', category: '', image: '' });
    const [expertiseForm, setExpertiseForm] = useState({ title: '', description: '', icon: 'Layout' });
    const [serviceForm, setServiceForm] = useState({ title: '', priceRange: '', items: [] });
    const [serviceItem, setServiceItem] = useState('');
    const [editingId, setEditingId] = useState(null);

    // Profile & Settings State
    const [aboutInfo, setAboutInfo] = useState({ title: '', description: '', mission: '', image: '', team: [] });
    const [settingsInfo, setSettingsInfo] = useState({ email: '', notificationEmail: '', phone: '', address: '', socials: { facebook: '', twitter: '', linkedin: '', github: '' } });
    const [newTeamMember, setNewTeamMember] = useState({ name: '', role: '', image: '', bio: '' });
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [uploading, setUploading] = useState(false);
    const [reviewPhotos, setReviewPhotos] = useState({}); // { reviewId: imageUrl }

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
            } else if (activeTab === 'projects') {
                const res = await axios.get(`${API_URL}/projects`, config);
                setProjects(res.data);
            } else if (activeTab === 'expertise') {
                const res = await axios.get(`${API_URL}/expertise`, config);
                setExpertise(res.data);
            } else if (activeTab === 'services') {
                const res = await axios.get(`${API_URL}/services`, config);
                setServices(res.data);
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
            console.error('Login Error:', err);
            if (err.response) {
                setError(err.response.data.message || 'Invalid username or password');
            } else if (err.request) {
                setError('Cannot connect to server. Check your API URL.');
            } else {
                setError('An unexpected error occurred.');
            }
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

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            if (editingId) {
                await axios.patch(`${API_URL}/projects/${editingId}`, projectForm, config);
                setEditingId(null);
            } else {
                await axios.post(`${API_URL}/projects/add`, projectForm, config);
            }
            setProjectForm({ title: '', subtitle: '', description: '', url: '', category: '', image: '' });
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Error saving project.');
        }
    };

    const handleEditProject = (project) => {
        setEditingId(project._id);
        setProjectForm({
            title: project.title,
            subtitle: project.subtitle || '',
            description: project.description || '',
            url: project.url || '',
            category: project.category || '',
            image: project.image || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm('Delete this project?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`${API_URL}/projects/${id}`, config);
            fetchData();
        } catch (err) {
            console.error(err);
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
            const payload = { status };
            if (status === 'approved' && reviewPhotos[id]) {
                payload.image = reviewPhotos[id];
            }
            await axios.patch(`${API_URL}/reviews/${id}/status`, payload, config);
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
            // Remove manual Content-Type: multipart/form-data; Axios handles it with the correct boundary
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.post(`${API_URL}/upload/image`, formData, config);
            const url = res.data.url;

            if (type === 'project') setProjectForm(prev => ({ ...prev, image: url }));
            else if (type === 'blog') setBlogForm(prev => ({ ...prev, image: url }));
            else if (type === 'about') setAboutInfo(prev => ({ ...prev, image: url }));
            else if (type === 'team_new') setNewTeamMember(prev => ({ ...prev, image: url }));
            else if (type === 'team_edit') {
                const updatedTeam = [...aboutInfo.team];
                updatedTeam[index].image = url;
                setAboutInfo(prev => ({ ...prev, team: updatedTeam }));
            }
            else if (type === 'review_approval') {
                setReviewPhotos(prev => ({ ...prev, [index]: url }));
            }

        } catch (err) {
            console.error('Upload Error Details:', err);

            const status = err.response?.status;
            const message = err.response?.data?.message || err.message;

            if (status === 401) {
                alert('Session expired. Please sign in again.');
                handleLogout();
            } else {
                alert(`Upload failed: ${message} (Status: ${status || 'Network Error'})`);
            }
        } finally {
            setUploading(false);
        }
    };

    const handleSaveProfile = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post(`${API_URL}/about/update`, aboutInfo, config);
            alert('Profile updated successfully');
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveSettings = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post(`${API_URL}/settings/update`, settingsInfo, config);
            alert('Settings updated successfully');
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Error updating settings');
        }
    };

    const handleAddExpertise = async () => {
        if (!expertiseForm.title || !expertiseForm.description) return;
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const newList = [...expertise, expertiseForm];
            await axios.post(`${API_URL}/expertise/update`, newList, config);
            setExpertiseForm({ title: '', description: '', icon: 'Layout' });
            fetchData();
        } catch (err) { console.error(err); }
    };

    const handleDeleteExpertise = async (index) => {
        if (!window.confirm('Delete this expertise?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const newList = expertise.filter((_, i) => i !== index);
            await axios.post(`${API_URL}/expertise/update`, newList, config);
            fetchData();
        } catch (err) { console.error(err); }
    };

    const handleAddService = async () => {
        if (!serviceForm.title || serviceForm.items.length === 0) return;
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const newList = [...services, serviceForm];
            await axios.post(`${API_URL}/services/update`, newList, config);
            setServiceForm({ title: '', priceRange: '', items: [] });
            fetchData();
        } catch (err) { console.error(err); }
    };

    const handleDeleteService = async (index) => {
        if (!window.confirm('Delete this package?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const newList = services.filter((_, i) => i !== index);
            await axios.post(`${API_URL}/services/update`, newList, config);
            fetchData();
        } catch (err) { console.error(err); }
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

    const handleAddTeamMember = async () => {
        if (!newTeamMember.name) return;
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const updatedTeam = [...aboutInfo.team, newTeamMember];
            await axios.post(`${API_URL}/about/update`, { ...aboutInfo, team: updatedTeam }, config);
            setNewTeamMember({ name: '', role: '', image: '', bio: '' });
            fetchData();
        } catch (err) { console.error(err); }
    };

    const handleRemoveTeamMember = async (index) => {
        if (!window.confirm('Remove this team member?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const updatedTeam = aboutInfo.team.filter((_, i) => i !== index);
            await axios.post(`${API_URL}/about/update`, { ...aboutInfo, team: updatedTeam }, config);
            fetchData();
        } catch (err) { console.error(err); }
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
                            <label className="text-[10px] font-black tracking-[0.3em] text-white/30 ml-4">Username</label>
                            <input
                                type="text"
                                placeholder="admin"
                                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/40 transition-all text-sm tracking-widest"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black tracking-[0.3em] text-white/30 ml-4">Password</label>
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
            className={`text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 relative group py-2 whitespace-nowrap ${active ? 'text-white' : 'text-white/30 hover:text-white'}`}
        >
            <div className="flex items-center gap-2">
                <Icon size={11} className={active ? 'text-white' : 'text-white/20 group-hover:text-white transition-colors'} />
                <span>{children}</span>
            </div>
            {active && <motion.div layoutId="adminActiveTab" className="absolute bottom-[-10px] left-0 w-full h-[1px] bg-white" />}
        </button>
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Top Navigation Bar - High Visibility */}
            <nav className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-10">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img src="/inc-02.png" alt="INCODEX" className="h-5 opacity-80 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <div className="hidden lg:flex items-center gap-8">
                            <AdminNavLink active={activeTab === 'quotes'} onClick={() => setActiveTab('quotes')} icon={MessageSquare}>Quotes</AdminNavLink>
                            <AdminNavLink active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')} icon={BookOpen}>Journal</AdminNavLink>
                            <AdminNavLink active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon={Layout}>Portfolio</AdminNavLink>
                            <AdminNavLink active={activeTab === 'expertise'} onClick={() => setActiveTab('expertise')} icon={Zap}>Expertise</AdminNavLink>
                            <AdminNavLink active={activeTab === 'services'} onClick={() => setActiveTab('services')} icon={DollarSign}>Pricing</AdminNavLink>
                            <AdminNavLink active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} icon={Quote}>Reviews</AdminNavLink>
                            <AdminNavLink active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={Users}>Team</AdminNavLink>
                            <AdminNavLink active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={SettingsIcon}>Settings</AdminNavLink>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-4 border-l border-white/10 ml-4 pl-4 font-bold text-white/50">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="flex items-center gap-2 text-[8px] uppercase tracking-widest hover:text-white transition-all"
                            >
                                <ExternalLink size={11} />
                                View Site
                            </button>
                            <div className="w-1 h-1 bg-white/20 rounded-full" />
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-[8px] uppercase tracking-widest text-red-500/50 hover:text-red-500 transition-all"
                            >
                                <LogOut size={11} />
                                Sign Out
                            </button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden text-white/80 hover:text-white transition-colors"
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-2xl z-[90] flex flex-col pt-32 px-10 gap-8 lg:hidden"
                        >
                            <div className="flex gap-4">
                                <button
                                    className="flex-grow flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-all font-bold"
                                    onClick={() => window.location.href = '/'}
                                >
                                    <ExternalLink size={18} />
                                    <span className="text-xs uppercase tracking-widest">Site</span>
                                </button>
                                <button
                                    className="flex-grow flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500/60 hover:text-red-500 transition-all font-bold"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={18} />
                                    <span className="text-xs uppercase tracking-widest">Exit</span>
                                </button>
                            </div>
                            <div className="h-px bg-white/5" />
                            <nav className="flex flex-col gap-4">
                                {[
                                    { id: 'quotes', icon: MessageSquare, label: 'Quotes' },
                                    { id: 'blogs', icon: BookOpen, label: 'Journal' },
                                    { id: 'projects', icon: Layout, label: 'Portfolio' },
                                    { id: 'expertise', icon: Zap, label: 'Expertise' },
                                    { id: 'services', icon: DollarSign, label: 'Pricing' },
                                    { id: 'reviews', icon: Quote, label: 'Reviews' },
                                    { id: 'profile', icon: Users, label: 'Team' },
                                    { id: 'settings', icon: SettingsIcon, label: 'Settings' }
                                ].map((tab, i) => (
                                    <motion.button
                                        key={tab.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                                        className={`flex items-center gap-6 p-4 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-white text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <tab.icon size={20} />
                                        <span className="text-xl font-black uppercase tracking-tighter">{tab.label}</span>
                                    </motion.button>
                                ))}
                            </nav>


                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <div className="max-w-7xl mx-auto px-6 pt-40 pb-32">
                <header className="mb-20">
                    <Reveal>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
                            {activeTab === 'quotes' && 'Incoming Signals'}
                            {activeTab === 'blogs' && 'Journal Archive'}
                            {activeTab === 'projects' && 'Portfolio Projects'}
                            {activeTab === 'expertise' && 'Expertise & Intelligence'}
                            {activeTab === 'services' && 'Pricing Structures'}
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
                                        <label className="text-[9px] font-black tracking-[0.3em] text-white/30 ml-2">Journal Cover</label>
                                        <div className="aspect-video bg-black border border-white/5 rounded-2xl overflow-hidden relative group">
                                            {blogForm.image ? (
                                                <img src={blogForm.image} className="w-full h-full object-cover" alt="" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-white/10">
                                                    <ImageIcon size={32} className="mb-2" />
                                                    <span className="text-[8px] font-black uppercase tracking-widest">No Cover Image</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-center p-4">
                                                <label className="cursor-pointer bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-200 transition-all">
                                                    {uploading ? 'Processing Signal...' : 'Upload cover'}
                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadImage(e.target.files[0], 'blog')} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black tracking-[0.3em] text-white/30 ml-2">Blog Title</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm"
                                            value={blogForm.title}
                                            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black tracking-[0.3em] text-white/30 ml-2">Slug (URL path)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm"
                                            value={blogForm.slug}
                                            onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black tracking-[0.3em] text-white/30 ml-2">Excerpt (Brief)</label>
                                        <textarea
                                            rows="3"
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm resize-none"
                                            value={blogForm.excerpt}
                                            onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black tracking-[0.3em] text-white/30 ml-2">Content (Journal Body)</label>
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

                {activeTab === 'projects' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-1">
                            <div className="bg-neutral-900 sticky top-32 p-8 rounded-3xl border border-white/10">
                                <h2 className="text-sm font-black uppercase tracking-[0.4em] mb-8 text-white/50">{editingId ? 'Edit Project' : 'New Project'}</h2>
                                <form onSubmit={handleAddProject} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="aspect-[16/9] bg-black border border-white/5 rounded-2xl overflow-hidden relative group">
                                            {projectForm.image ? (
                                                <img src={projectForm.image} className="w-full h-full object-cover" alt="" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-white/10">
                                                    <ImageIcon size={32} className="mb-2" />
                                                    <span className="text-[8px] font-black uppercase tracking-widest">No Image</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                                <label className="cursor-pointer bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                    {uploading ? 'Processing...' : 'Upload Image'}
                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadImage(e.target.files[0], 'project')} />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black tracking-[0.3em] text-white/30 ml-2">Project Title</label>
                                            <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-bold" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black tracking-[0.3em] text-white/30 ml-2">Subtitle</label>
                                            <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" value={projectForm.subtitle} onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black tracking-[0.3em] text-white/30 ml-2">Live URL</label>
                                            <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" value={projectForm.url} onChange={(e) => setProjectForm({ ...projectForm, url: e.target.value })} required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black tracking-[0.3em] text-white/30 ml-2">Category</label>
                                            <input className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm" value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black tracking-[0.3em] text-white/30 ml-2">Description</label>
                                            <textarea rows="4" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm resize-none" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} required />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="flex-grow py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2">
                                            {editingId ? <Check size={16} /> : <Plus size={16} />}
                                            {editingId ? 'Update' : 'Add Project'}
                                        </button>
                                        {editingId && (
                                            <button type="button" onClick={() => { setEditingId(null); setProjectForm({ title: '', subtitle: '', description: '', url: '', category: '', image: '' }); }} className="px-6 py-4 border border-white/10 text-white/40 uppercase font-black text-[10px] tracking-widest rounded-xl hover:text-white transition-all">Cancel</button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-2 grid gap-6">
                            {projects.map((project) => (
                                <div key={project._id} className="bg-neutral-950 border border-white/10 rounded-3xl p-6 group hover:border-white/20 transition-all flex gap-6 items-center">
                                    <div className="w-32 h-20 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                                        <img src={project.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-lg font-black uppercase tracking-tight mb-1">{project.title}</h4>
                                        <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest mb-3">{project.category} • {project.url}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEditProject(project)} className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:border-white transition-all"><Edit3 size={16} /></button>
                                        <button onClick={() => handleDeleteProject(project._id)} className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-red-500 hover:border-red-500 transition-all"><Trash size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'expertise' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-1">
                            <div className="bg-neutral-900 sticky top-32 p-8 rounded-3xl border border-white/10">
                                <h2 className="text-sm font-black uppercase tracking-[0.4em] mb-8 text-white/50">Modify Intel</h2>
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <input placeholder="Service Title" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-bold" value={expertiseForm.title} onChange={e => setExpertiseForm({ ...expertiseForm, title: e.target.value })} />
                                        <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white/40" value={expertiseForm.icon} onChange={e => setExpertiseForm({ ...expertiseForm, icon: e.target.value })}>
                                            {['Layout', 'Globe', 'Zap', 'LinkIcon', 'ShoppingCart', 'Monitor', 'Smartphone', 'Code', 'Search'].map(icon => (
                                                <option key={icon} value={icon}>{icon}</option>
                                            ))}
                                        </select>
                                        <textarea placeholder="Description" rows="4" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm resize-none" value={expertiseForm.description} onChange={e => setExpertiseForm({ ...expertiseForm, description: e.target.value })} />
                                    </div>
                                    <button
                                        onClick={handleAddExpertise}
                                        className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Plus size={16} /> Stack Intel
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 grid gap-4">
                            {expertise.map((f, i) => (
                                <div key={i} className="bg-neutral-950 border border-white/10 rounded-3xl p-6 group flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20"><Zap size={20} /></div>
                                        <div>
                                            <h4 className="font-black uppercase tracking-tight">{f.title}</h4>
                                            <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest">{f.icon}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDeleteExpertise(i)} className="text-white/10 hover:text-red-500 transition-all"><Trash size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'services' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-1">
                            <div className="bg-neutral-900 sticky top-32 p-8 rounded-3xl border border-white/10">
                                <h2 className="text-sm font-black uppercase tracking-[0.4em] mb-8 text-white/50">Market Entry</h2>
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <input placeholder="Package Name" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-widest" value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} />
                                        <input placeholder="Price Range (e.g. $100 - $500)" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-bold" value={serviceForm.priceRange} onChange={e => setServiceForm({ ...serviceForm, priceRange: e.target.value })} />

                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black tracking-widest text-white/20">Features</label>
                                            <div className="flex gap-2">
                                                <input placeholder="New Feature" className="flex-grow bg-black border border-white/10 rounded-xl px-4 py-2 text-xs" value={serviceItem} onChange={e => setServiceItem(e.target.value)} />
                                                <button onClick={() => { if (serviceItem) { setServiceForm({ ...serviceForm, items: [...serviceForm.items, serviceItem] }); setServiceItem(''); } }} className="bg-white/5 border border-white/10 px-4 rounded-xl hover:bg-white/10"><Plus size={14} /></button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {serviceForm.items.map((item, i) => (
                                                    <span key={i} className="text-[8px] bg-white/5 px-2 py-1 rounded-md border border-white/5 flex items-center gap-2">
                                                        {item}
                                                        <button onClick={() => setServiceForm({ ...serviceForm, items: serviceForm.items.filter((_, idx) => idx !== i) })}><Plus size={8} className="rotate-45" /></button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleAddService}
                                        className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Plus size={16} /> Deploy Package
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 grid gap-6">
                            {services.map((s, i) => (
                                <div key={i} className="bg-neutral-950 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-black uppercase tracking-tighter mb-1">{s.title}</h3>
                                            <p className="text-white/20 font-black tracking-[0.2em] text-[10px] uppercase">{s.priceRange}</p>
                                        </div>
                                        <button onClick={() => handleDeleteService(i)} className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/10 hover:text-red-500 transition-all"><Trash size={16} /></button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {s.items.map((item, idx) => (
                                            <span key={idx} className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/5 rounded-full text-white/40">{item}</span>
                                        ))}
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
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Narrative Hero Cover</label>
                                        <div className="aspect-video mb-4 bg-black border border-white/5 rounded-2xl overflow-hidden relative group">
                                            {aboutInfo.image ? (
                                                <img src={aboutInfo.image} className="w-full h-full object-cover" alt="" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-white/10">
                                                    <ImageIcon size={32} className="mb-2" />
                                                    <span className="text-[8px] font-black uppercase tracking-widest">No Hero Image</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                                <label className="cursor-pointer bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                    {uploading ? 'Uploading...' : 'Change Cover'}
                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadImage(e.target.files[0], 'about')} />
                                                </label>
                                            </div>
                                        </div>
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
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-2xl bg-black border border-white/10 overflow-hidden shrink-0 relative group">
                                        {newTeamMember.image ? (
                                            <img src={newTeamMember.image} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-white/5">
                                                <ImageIcon size={20} />
                                            </div>
                                        )}
                                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                                            <Plus size={14} className="text-white" />
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadImage(e.target.files[0], 'team_new')} />
                                        </label>
                                    </div>
                                    <div className="flex-grow space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <input placeholder="Architect Name" className="bg-black border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-widest uppercase" value={newTeamMember.name} onChange={e => setNewTeamMember({ ...newTeamMember, name: e.target.value })} />
                                            <input placeholder="Architect Role" className="bg-black border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-widest uppercase" value={newTeamMember.role} onChange={e => setNewTeamMember({ ...newTeamMember, role: e.target.value })} />
                                        </div>
                                        <button onClick={handleAddTeamMember} className="w-full py-3 bg-white text-black font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 text-[10px] hover:bg-neutral-200 transition-all">
                                            {uploading ? 'Deploying...' : <><Plus size={14} /> Deploy Architect</>}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {aboutInfo.team?.map((member, i) => (
                                    <div key={i} className="bg-neutral-950 border border-white/10 rounded-3xl p-6 flex gap-6 items-center group">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden shrink-0 relative group/member">
                                            <img src={member.image || '/avatar.png'} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt="" />
                                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/member:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                                                <Plus size={12} className="text-white" />
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadImage(e.target.files[0], 'team_edit', i)} />
                                            </label>
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
                            <div key={review._id} className="bg-neutral-950 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all flex flex-col md:flex-row justify-between items-center group gap-8">
                                <div className="flex gap-6 items-start flex-grow">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden shrink-0 relative group/photo">
                                        {(review.image || reviewPhotos[review._id]) ? (
                                            <img src={review.image || reviewPhotos[review._id]} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/10"><ImageIcon size={20} /></div>
                                        )}
                                        {review.status === 'pending' && (
                                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/photo:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                                                <Plus size={14} className="text-white" />
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadImage(e.target.files[0], 'review_approval', review._id)} />
                                            </label>
                                        )}
                                    </div>
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
                                </div>
                                <div className="flex gap-3">
                                    {review.status === 'pending' && (
                                        <button
                                            onClick={() => handleUpdateReviewStatus(review._id, 'approved')}
                                            className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all ${reviewPhotos[review._id] ? 'bg-green-500 border-green-500 text-black' : 'hover:bg-white hover:text-black'}`}
                                            title={reviewPhotos[review._id] ? "Approve with Photo" : "Approve Signal"}
                                        >
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

                                <div className="bg-neutral-900 border border-red-500/10 rounded-3xl p-10 mt-10">
                                    <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-4 text-red-500 opacity-50">Danger Zone</h3>
                                    <p className="text-white/20 text-[10px] mb-10 tracking-widest font-black uppercase">Terminate current cryptographic session</p>
                                    <button onClick={handleLogout} className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-[0.3em] rounded-xl hover:bg-red-700 transition-all shadow-lg active:scale-95">Sign Out Everywhere</button>
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
