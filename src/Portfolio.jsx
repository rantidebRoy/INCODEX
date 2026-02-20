import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Link as LinkIcon, ChevronRight, X, Maximize2, ExternalLink, Globe, Monitor, Smartphone, Tablet } from 'lucide-react';

const Portfolio = ({ Reveal }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewTitle, setPreviewTitle] = useState("");
    const [viewMode, setViewMode] = useState('desktop');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const projects = [
        {
            title: "Ajker Bangla News",
            subtitle: "আজকের বাংলা - দেশের কণ্ঠ প্রান্তিকের অন্তর",
            description: "A comprehensive digital news portal delivering real-time updates on politics, economy, and culture across Bangladesh.",
            url: "https://ajkerbangla.news",
            category: "Media & News",
            image: "https://ajkerbangla.news/wp-content/uploads/2025/09/logo_AB.png"
        },
        {
            title: "MCRL - DU",
            subtitle: "Material Chemistry Research Lab",
            description: "An extraordinary research facility at the University of Dhaka focusing on material science innovations and chemical engineering.",
            url: "https://mcrl.du.ac.bd",
            category: "Research",
            image: "https://mcrl.du.ac.bd/wp-content/uploads/2025/11/IMG-20251028-WA0000.jpg"
        },
        {
            title: "DUNC - Nanotech Center",
            subtitle: "Dhaka University Nanotechnology Centre",
            description: "Leading the frontier of nanoscale engineering and material physics. Architects of tomorrow's technological foundations.",
            url: "https://dunc.incodexbd.com",
            category: "Engineering",
            image: "https://dunc.incodexbd.com/wp-content/uploads/2026/02/dunc_logo-04-2048x639.png"
        },
        {
            title: "Criminology - DU",
            subtitle: "Department of Criminology",
            description: "Official academic portal for the Department of Criminology at University of Dhaka, showcasing research, faculty, and programs.",
            url: "https://criminology.du.ac.bd",
            category: "Academic",
            image: "https://criminology.du.ac.bd/images/du_logo.png"
        }
    ];

    const openPreview = (url, title) => {
        setPreviewUrl(url);
        setPreviewTitle(title);
        document.body.style.overflow = 'hidden';
    };

    const closePreview = () => {
        setPreviewUrl(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section id="portfolio" className="pt-40 pb-32 px-6 bg-black relative min-h-screen">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <Reveal className="mx-auto">
                        <span className="text-white/30 text-xs font-bold tracking-[0.5em] uppercase mb-4 block text-center">Proven Excellence</span>
                    </Reveal>
                    <Reveal delay={0.1} className="mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase text-center">Portfolio</h2>
                    </Reveal>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-neutral-950 border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-500 rounded-xl flex flex-col"
                        >
                            <div className="relative aspect-[16/10] bg-neutral-900 flex items-center justify-center overflow-hidden border-b border-white/5 cursor-pointer"
                                onClick={() => openPreview(project.url, project.title)}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-contain p-8 opacity-70 group-hover:scale-110 transition-transform duration-700 bg-black/40"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />

                                {/* Overlay Icon */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <div className="bg-white text-black px-6 py-3 rounded-full font-black text-[10px] tracking-widest uppercase flex items-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                                        <Maximize2 size={12} className="mr-2" /> Live Preview
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <span className="text-white/30 text-[8px] font-bold tracking-[0.2em] uppercase mb-1 block">{project.category}</span>
                                    <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight">{project.title}</h3>
                                </div>

                                <p className="text-white/50 text-xs leading-relaxed font-light mb-8 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                    <button
                                        onClick={() => openPreview(project.url, project.title)}
                                        className="text-white/40 hover:text-white text-[9px] font-black tracking-widest uppercase flex items-center transition-colors">
                                        PREVIEW <Maximize2 size={12} className="ml-2" />
                                    </button>
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/40 hover:text-white text-[9px] font-black tracking-widest uppercase flex items-center transition-colors">
                                        VISIT <ExternalLink size={12} className="ml-2" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center text-white/10 text-[8px] tracking-[0.3em] uppercase">
                    Architects of Digital Infrastructure
                </div>
            </div>

            {/* Premium Site Preview Modal */}
            <AnimatePresence>
                {previewUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-10 py-10 bg-black/90 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full h-full max-w-6xl bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                        >
                            {/* Modal Header / Browser Top Bar */}
                            <div className="h-14 bg-neutral-950 border-b border-white/5 flex items-center justify-between px-6 shrink-0">
                                <div className="flex items-center space-x-2 w-32">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                </div>

                                <div className="hidden md:flex items-center bg-white/5 px-4 py-1.5 rounded-full border border-white/10 flex-grow max-w-md mx-4">
                                    <Globe size={10} className="text-white/20 mr-2" />
                                    <span className="text-[10px] text-white/40 font-bold truncate tracking-wider">{previewUrl}</span>
                                </div>

                                <div className="flex items-center space-x-4 justify-end w-32">
                                    {/* Responsive View Toggles */}
                                    <div className="hidden lg:flex items-center space-x-2 mr-4 border-r border-white/10 pr-4">
                                        <button onClick={() => setViewMode('desktop')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-white text-black' : 'text-white/20'}`}><Monitor size={14} /></button>
                                        <button onClick={() => setViewMode('tablet')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'tablet' ? 'bg-white text-black' : 'text-white/20'}`}><Tablet size={14} /></button>
                                        <button onClick={() => setViewMode('mobile')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-white text-black' : 'text-white/20'}`}><Smartphone size={14} /></button>
                                    </div>
                                    <button
                                        onClick={closePreview}
                                        className="h-8 w-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Iframe Viewport Area */}
                            <div className="flex-grow bg-[#050505] relative flex items-center justify-center overflow-auto p-4 md:p-8">
                                <motion.div
                                    animate={{
                                        width: viewMode === 'desktop' ? '100%' : viewMode === 'tablet' ? '768px' : '375px',
                                        maxWidth: '100%'
                                    }}
                                    className="h-full bg-white rounded-lg overflow-hidden shadow-2xl relative"
                                >
                                    <iframe
                                        src={previewUrl}
                                        className="w-full h-full border-none bg-white"
                                        title={previewTitle}
                                    />
                                    {/* Glass protector to stop scroll capture when not active */}
                                    <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
                                </motion.div>
                            </div>

                            {/* Modal Footer */}
                            <div className="h-12 bg-neutral-950 border-t border-white/5 flex items-center justify-between px-8 shrink-0">
                                <span className="text-[10px] font-black text-white/20 tracking-[0.2em] uppercase">Live Preview: {previewTitle}</span>
                                <a
                                    href={previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[9px] font-black text-white px-4 h-7 bg-white/5 hover:bg-white rounded-full hover:text-black flex items-center transition-all uppercase tracking-widest"
                                >
                                    Open in New Tab <ExternalLink size={10} className="ml-2" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;
