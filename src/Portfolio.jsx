import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout, Link as LinkIcon, ChevronRight } from 'lucide-react';

const Portfolio = ({ Reveal }) => {
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

    return (
        <section id="portfolio" className="pt-40 pb-32 px-6 bg-black relative min-h-screen">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <Reveal className="mx-auto">
                        <span className="text-white/30 text-xs font-bold tracking-[0.5em] uppercase mb-4 block">Proven Excellence</span>
                    </Reveal>
                    <Reveal delay={0.1} className="mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">Our Projects</h2>
                    </Reveal>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.a
                            key={i}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group block bg-neutral-950 border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-500 rounded-xl"
                        >
                            <div className="flex flex-col h-full">
                                <div className="relative aspect-[16/10] bg-neutral-900 flex items-center justify-center overflow-hidden border-b border-white/5">
                                    {/* Actual Project Image */}
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-contain p-4 opacity-70 group-hover:opacity-100 transition-opacity duration-700 bg-black/40"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />

                                    <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                                        <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-2xl">
                                            <LinkIcon size={14} />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-4">
                                        <span className="text-white/30 text-[8px] font-bold tracking-[0.2em] uppercase mb-1 block">{project.category}</span>
                                        <h3 className="text-lg font-black text-white uppercase group-hover:text-white/80 transition-colors tracking-tight leading-tight">{project.title}</h3>
                                    </div>

                                    <p className="text-white/50 text-xs leading-relaxed font-light mb-6 flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center text-white/20 text-[9px] font-bold tracking-[0.2em] group-hover:text-white transition-colors uppercase">
                                        OPEN PROJECT <ChevronRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="text-white/20 hover:text-white text-[10px] font-bold tracking-[0.4em] uppercase transition-colors"
                    >
                        Back to top
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
