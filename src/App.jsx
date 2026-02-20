import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Shield, Zap, Globe, Layout, ChevronRight, Github, Twitter, Linkedin, Sun, Moon, Link as LinkIcon, ShoppingCart, Quote, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl font-black tracking-tight text-white cursor-default group"
        >
          IN<span className="text-white/40 group-hover:text-white transition-colors duration-500">CODEX</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {['Home', 'Quote', 'Blog', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-bold text-white/50 hover:text-white transition-colors tracking-widest uppercase"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {['Home', 'Quote', 'Blog', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xl font-bold text-white uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Reveal = ({ children, delay = 0, className = "" }) => (
  <div className={`relative overflow-hidden w-fit ${className}`}>
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden bg-black">
      {/* Background large text for texture */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="text-[80px] md:text-[150px] lg:text-[220px] font-black leading-none tracking-tighter text-white/[0.05]">
          INCODEX
        </span>
      </div>

      {/* Background decoration with floating animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/[0.03] blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.03] blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-20 py-12 md:py-20">
        <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <Reveal className="mx-auto lg:mx-0">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 leading-[1.2] tracking-tight uppercase">
              Beautiful things
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto lg:mx-0">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 leading-[1.2] tracking-tight uppercase">
              come together
            </h1>
          </Reveal>
          <Reveal delay={0.2} className="mx-auto lg:mx-0">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.2] tracking-tight uppercase whitespace-nowrap">
              ONE <span className="text-white/40">BYTE</span> at a time.
            </h1>
          </Reveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg lg:text-xl text-white/50 mb-10 leading-relaxed font-light px-4 md:px-0"
          >
            You have no idea how <span className="text-white font-bold">RAPIDLY YOU CAN GROW.</span> <br className="hidden md:block" />
            Let’s find out together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button className="bg-white text-black px-10 py-5 rounded-full font-black text-base flex items-center group hover:bg-neutral-200 transition-all duration-300 shadow-2xl relative">
              <span className="relative z-10 uppercase tracking-[0.2em]">START PROJECT</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
          </motion.div>
        </div>

        {/* Right side animation - Neural Data Grid */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center z-10 overflow-hidden group">
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Central Neural Core */}
          <div className="relative z-20">
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-32 h-32 bg-white blur-[60px] -translate-x-1/2 -translate-y-1/2"
            />
            <div className="w-4 h-4 bg-white rounded-none rotate-45 shadow-[0_0_30px_white] relative z-30" />

            {/* Core Orbitals */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
                className="absolute border border-white/10"
                style={{
                  width: `${160 + i * 80}px`,
                  height: `${160 + i * 80}px`,
                  borderRadius: i % 2 === 0 ? '0%' : '50%',
                  top: '50%',
                  left: '50%',
                  marginLeft: `-${(160 + i * 80) / 2}px`,
                  marginTop: `-${(160 + i * 80) / 2}px`,
                }}
              />
            ))}
          </div>

          {/* Migrating Data Nodes (Bytes) */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                opacity: 0
              }}
              animate={{
                x: [(Math.random() - 0.5) * 500, (Math.random() - 0.5) * 500],
                y: [(Math.random() - 0.5) * 500, (Math.random() - 0.5) * 500],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 8,
                repeat: Infinity,
                delay: i * 0.4
              }}
              className="absolute w-1 h-1 bg-white flex items-center justify-center"
            >
              <div className="absolute w-4 h-[1px] bg-white/20 rotate-45" />
            </motion.div>
          ))}

          {/* Technical Readouts */}
          <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 opacity-20 pointer-events-none hidden md:flex">
            <span className="text-[8px] font-mono text-white tracking-[0.3em] uppercase">SYSTEM_STATE: STABLE</span>
            <span className="text-[8px] font-mono text-white tracking-[0.3em] uppercase">BYTE_STREAM: ACTIVE</span>
            <div className="w-24 h-1 bg-white/10">
              <motion.div
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="h-full bg-white"
              />
            </div>
          </div>

          {/* Scanning Beam */}
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-6 z-30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

const ProgressInfo = () => {
  return (
    <section className="py-32 px-6 bg-black text-white transition-colors duration-500 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <Reveal className="mx-auto">
          <h2 className="text-3xl md:text-6xl font-black mb-10 tracking-tight leading-[1] max-w-5xl mx-auto uppercase">
            BUSINESSES GROWING WITH IN<span className="text-white/40">CODEX</span>
          </h2>
        </Reveal>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-16 mb-24">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-white/70"
          >
            FREE MAINTENANCE FIRST MONTH
          </motion.span>
          <div className="hidden md:block w-12 h-[1px] bg-white/10" />
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-white/70"
          >
            POWERFUL UPGRADE OPTIONS
          </motion.span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto mt-20">
          {/* Package 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -10 }}
            className="p-12 border border-white/10 bg-neutral-950 text-left relative group overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 left-0 w-1 h-0 bg-white group-hover:h-full transition-all duration-700" />
            <div className="absolute top-0 right-0 w-1 h-0 bg-white/20 group-hover:h-full transition-all duration-700 delay-100" />
            <h3 className="text-3xl font-black mb-2 tracking-tight uppercase">FIFTY SHADES OF WEBSITE</h3>
            <p className="text-2xl font-light text-white/30 mb-10 tracking-tight">$157 – $900</p>
            <ul className="space-y-5 mb-12 flex-grow">
              {['E-commerce', 'Portfolio', 'Personal Blogs', 'News Portal', 'Organisations', 'Travel Agency', 'Fundraising'].map((item) => (
                <li key={item} className="flex items-center text-white/60 font-light text-sm tracking-wide">
                  <span className="w-1.5 h-1.5 bg-white mr-4 rounded-none opacity-30 group-hover:opacity-100 transition-opacity" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-5 border border-white text-white font-black hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-[0.2em] text-xs">
              Order Now
            </button>
          </motion.div>

          {/* Package 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="p-12 border border-white/10 bg-neutral-950 text-left relative group overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 left-0 w-1 h-0 bg-white group-hover:h-full transition-all duration-700" />
            <div className="absolute top-0 right-0 w-1 h-0 bg-white/20 group-hover:h-full transition-all duration-700 delay-100" />
            <h3 className="text-3xl font-black mb-2 tracking-tight uppercase">INNOVATIVE GRAPHICS & SEO</h3>
            <p className="text-2xl font-light text-white/30 mb-10 tracking-tight">$17 – $500</p>
            <ul className="space-y-5 mb-12 flex-grow">
              {['Logo Design', 'Banner Design', 'Vector Illustrations', 'UI/UX Design', 'On-Page SEO', 'Off-Page SEO'].map((item) => (
                <li key={item} className="flex items-center text-white/60 font-light text-sm tracking-wide">
                  <span className="w-1.5 h-1.5 bg-white mr-4 rounded-none opacity-30 group-hover:opacity-100 transition-opacity" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-5 border border-white text-white font-black hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-[0.2em] text-xs">
              Contact Now
            </button>
          </motion.div>
        </div>
      </div>

    </section>
  );
};
const ServicesInfo = () => {
  return (
    <section className="py-24 px-6 bg-black text-white transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Reveal className="mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight uppercase leading-[1.1]">
              TOP-NOTCH SERVICES <br /> FOR YOUR BUSINESS
            </h2>
          </Reveal>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
            Our expertise in website design, development, graphic design, and SEO ensures that you not only stand out online but also attract and engage your target audience. With a commitment to quality and innovation, we are dedicated to helping your business thrive in the digital landscape.
          </p>
          <div className="mt-12 w-24 h-1 bg-white mx-auto opacity-20" />
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="p-8 rounded-3xl bg-neutral-900 border border-white/5 hover:border-white/20 transition-all group"
  >
    <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-white/5 group-hover:rotate-6 transition-transform">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-white/50 leading-relaxed mb-6">
      {description}
    </p>
    <a href="#" className="inline-flex items-center text-sm font-bold text-white group-hover:underline">
      Learn more <ChevronRight size={16} className="ml-1" />
    </a>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      icon: Layout,
      title: "WEB DESIGN AND DEVELOPMENT",
      description: "Crafting immersive digital experiences with cutting-edge technologies. From responsive interfaces to complex backend systems, we build for performance and scale."
    },
    {
      icon: Globe,
      title: "SEO OPTIMISATION & MARKETING",
      description: "Driving growth through data-backed strategies. We optimize your digital presence to ensure your brand reaches the right audience at the perfect moment."
    },
    {
      icon: Zap,
      title: "GRAPHICS DESIGN",
      description: "Visual storytelling that resonates. Our design philosophy combines minimalist aesthetics with powerful brand identity to make your vision unforgettable."
    },
    {
      icon: LinkIcon,
      title: "BACKLINK BUILDING",
      description: "Strengthening your domain authority through high-quality backlink strategies. We focus on ethical, high-impact link acquisition to boost your search rankings."
    },
    {
      icon: ShoppingCart,
      title: "E-COMMERCE SOLUTION",
      description: "Building scalable online stores that convert. From seamless checkout experiences to inventory management, we create shops that drive revenue."
    }
  ];

  return (
    <section id="quote" className="py-32 px-6 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <Reveal className="mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase">OUR EXPERTISE</h2>
          </Reveal>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1 bg-white mx-auto opacity-20"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group p-10 border border-white/10 hover:border-white transition-all duration-500 bg-neutral-950 flex flex-col relative w-full md:w-[45%] lg:w-[30%] min-h-[400px] flex-grow-0 flex-shrink-0"
            >
              {/* Corner decor */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-4 right-4 w-4 h-[1px] bg-white" />
                <div className="absolute top-4 right-4 h-4 w-[1px] bg-white" />
              </div>

              <div className="w-12 h-12 text-white mb-8 group-hover:scale-110 transition-transform duration-500">
                <f.icon size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black text-white mb-6 leading-tight tracking-widest uppercase">
                {f.title}
              </h3>
              <p className="text-white/40 leading-relaxed font-light group-hover:text-white/70 transition-colors flex-grow">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="py-24 px-6 bg-black overflow-hidden relative transition-colors duration-500 border-t border-white/5">
    <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center justify-center gap-12">
      <div className="max-w-4xl">
        <Reveal className="mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight uppercase">
            BEAUTIFUL THINGS <br />
            COME TOGETHER <br />
            ONE <span className="text-white/40">BYTE</span> AT A TIME.
          </h2>
        </Reveal>
        <p className="text-xl text-white/60 max-w-xl">
          Discover just how capable you really are
        </p>
      </div>
      <button className="bg-white text-black px-12 py-6 rounded-full font-black text-xl hover:bg-neutral-200 transition-colors shadow-2xl uppercase">
        ORDER NOW
      </button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black text-white py-16 px-6 border-t border-white/10 transition-colors duration-500">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="text-3xl font-black mb-6">IN<span className="text-white/40">CODEX</span></div>
          <p className="text-white/50 max-w-sm mb-8">
            Superior software engineering firm specializing in complex system architectures and intelligent product development.
          </p>
          <div className="flex space-x-4">
            <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Twitter size={18} />
            </button>
            <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Linkedin size={18} />
            </button>
            <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Github size={18} />
            </button>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Company</h4>
          <ul className="space-y-4 text-white/50">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Legal</h4>
          <ul className="space-y-4 text-white/50">
            <li><a href="#" className="hover:underline">Terms</a></li>
            <li><a href="#" className="hover:underline">Security</a></li>
            <li><a href="#" className="hover:underline">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 text-center text-white/30 text-sm">
        © {new Date().getFullYear()} INCODEX Systems Corp. All rights reserved. Built for the modern web.
      </div>
    </div>
  </footer>
);

const Testimonials = () => {
  const reviews = [
    {
      title: "A game-changer for our online news portal!",
      content: "The team at INCODEX delivered a fast, dynamic website for our news agency. The design perfectly balances aesthetics with functionality, easy to navigate and stay updated. We’ve got more engagement and traffic.",
      author: "A R Ahmed Sujon",
      role: "Editor, Nobojug News",
      image: "/review1.png"
    },
    {
      title: "Our online store to a sales powerhouse!",
      content: "We couldn’t be happier with the e-commerce website built by INCODEX. The design is sleek, user-friendly, and optimized for conversions. Our customers love the smooth shopping experience, and we’ve already seen an increase in sales.",
      author: "Shamim Reza",
      role: "Owner, Shopping 24",
      image: "/review2.png"
    },
    {
      title: "A perfect platform for our mission!",
      content: "The website INCODEX created is professional, user-friendly, and truly reflects our organization’s values. It’s made connecting with our community much easier. We’re thrilled with the results and highly recommend their work!",
      author: "Tasbil Tonmoy",
      role: "President, CDFB",
      image: "/review3.png"
    }
  ];

  return (
    <section className="py-32 px-6 bg-black border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full -mr-20 -mt-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <Reveal className="mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase">CLIENT VOICES</h2>
          </Reveal>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1 bg-white mx-auto opacity-20"
          />
        </div>

        {/* Priority Spotlight Review */}
        <div className="max-w-4xl mx-auto mb-32 border-b border-white/5 pb-24 text-center">
          <div className="flex justify-center mb-10">
            <Quote size={40} className="text-white opacity-20" />
          </div>
          <Reveal className="mx-auto">
            <h3 className="text-2xl md:text-4xl font-black text-white mb-10 tracking-tight uppercase leading-[1.1]">
              "We feel confident to use their skills <br /> to boost our presence online!"
            </h3>
          </Reveal>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-white/50 mb-12 leading-relaxed italic font-light max-w-3xl mx-auto"
          >
            Working with INCODEX was a great experience. They developed a modern, user-friendly website that exceeded our expectations. Their attention to detail and dedication to delivering high-quality work stood out. The positive feedback from our users has been overwhelming. We highly recommend their services.
          </motion.p>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-6 relative bg-white/5 rounded-full overflow-hidden flex items-center justify-center">
              <User size={40} className="text-white opacity-20 absolute" />
              <img
                src="/chairman.png"
                alt="Chairman"
                className="w-full h-full object-contain relative z-10 transition-opacity duration-500"
                onLoad={(e) => { e.target.style.opacity = 1; }}
                onError={(e) => { e.target.style.opacity = 0; }}
                style={{ opacity: 0 }}
              />
            </div>
            <span className="text-white font-black text-sm tracking-[0.4em] uppercase">Chairman</span>
            <span className="text-white/30 text-[10px] mt-2 tracking-[0.2em] uppercase max-w-xs cursor-default">Dept. of Criminology, University of Dhaka</span>
          </div>
        </div>

        {/* Secondary Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {reviews.map((reveiw, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group flex flex-col h-full"
            >
              <Quote size={20} className="text-white opacity-10 mb-6 group-hover:opacity-100 transition-opacity duration-500" />
              <h4 className="text-lg font-black text-white mb-6 uppercase tracking-tight leading-tight flex-grow">
                {reveiw.title}
              </h4>
              <p className="text-sm text-white/40 leading-relaxed mb-10 font-light">
                {reveiw.content}
              </p>
              <div className="mt-auto flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-neutral-900 overflow-hidden relative flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-white opacity-20 absolute" />
                  <img
                    src={reveiw.image}
                    alt=""
                    className="w-full h-full object-cover relative z-10 transition-opacity duration-500"
                    onLoad={(e) => { e.target.style.opacity = 1; }}
                    onError={(e) => { e.target.style.opacity = 0; }}
                    style={{ opacity: 0 }}
                  />
                </div>
                <div>
                  <p className="text-white font-black text-[10px] uppercase tracking-widest">{reveiw.author}</p>
                  <p className="text-white/20 text-[8px] uppercase tracking-widest mt-1">{reveiw.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    {
      title: "The Importance of Website Maintenance",
      date: "October 1, 2024",
      excerpt: "Launching a website is just the beginning; ongoing maintenance is crucial to ensure its continued success. Regular website maintenance involves updating content, monitoring performance, and addressing technical issues to provide…"
    },
    {
      title: "Harnessing the Power of Cloud Computing",
      date: "September 28, 2024",
      excerpt: "Cloud computing has revolutionized the way we store, manage, and access data. By providing on-demand computing resources over the internet, cloud computing offers numerous benefits that cater to the needs…"
    },
    {
      title: "The Importance of Machine Learning in Today’s World",
      date: "August 2, 2024",
      excerpt: "Machine learning, a subset of artificial intelligence, has become a game-changer in various industries. It involves training algorithms to learn from data, enabling systems to make predictions and decisions without…"
    }
  ];

  return (
    <section id="blog" className="py-32 px-6 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <Reveal className="mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase">THE JOURNAL</h2>
          </Reveal>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1 bg-white mx-auto opacity-20"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <a key={i} href="#" className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex flex-col h-full cursor-pointer"
              >
                <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mb-8 group-hover:text-white transition-colors duration-500">
                  {post.date}
                </div>
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-500">
                  {post.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-10 font-light flex-grow">
                  {post.excerpt}
                </p>
                <div className="inline-flex items-center text-[10px] font-black text-white/40 group-hover:text-white uppercase tracking-[0.3em] transition-all duration-500">
                  READ STORY <ArrowRight size={14} className="ml-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const isDarkMode = true;

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="dark">
      <div className="bg-black min-h-screen font-sans selection:bg-white selection:text-black transition-colors duration-500">
        <Navbar />
        <Hero />
        <Features />
        <ServicesInfo />
        <ProgressInfo />
        <Testimonials />
        <Blog />
        <CTA />
        <Footer />
      </div>
    </div>
  );
};

export default App;
