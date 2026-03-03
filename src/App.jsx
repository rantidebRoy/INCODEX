import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useParams
} from 'react-router-dom';
import { Menu, X, ArrowRight, Shield, Zap, Globe, Layout, ChevronRight, Github, Twitter, Linkedin, Sun, Moon, Link as LinkIcon, ShoppingCart, Quote, User } from 'lucide-react';
import Portfolio from './Portfolio';
import Admin from './Admin';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname.startsWith('/admin')) return null;

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all duration-500 relative group overflow-hidden"
    >
      <span className="block group-hover:-translate-y-full transition-transform duration-500">{children}</span>
      <span className="absolute top-full left-0 block group-hover:-translate-y-full transition-transform duration-500 text-white">{children}</span>
    </Link>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 px-6 py-8 ${isScrolled ? 'bg-black/95 backdrop-blur-3xl py-6 border-b border-white/5' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="relative group overflow-hidden">
          <img src="/inc-02.png" alt="INCODEX" className="h-6 md:h-7 opacity-80 group-hover:opacity-100 transition-all duration-700 hover:scale-105" />
        </Link>

        <div className="hidden md:flex items-center space-x-12">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/#quote">Quote</NavLink>
          <NavLink to="/#blog">Blog</NavLink>
          <NavLink to="/#about">About</NavLink>
          <NavLink to="/#contact">Contact</NavLink>
        </div>

        <button
          className="md:hidden text-white group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-px bg-white mb-2 group-hover:w-8 transition-all duration-500"></div>
          <div className="w-6 h-px bg-white group-hover:w-4 transition-all duration-500"></div>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black z-[101] flex flex-col p-12 justify-center"
          >
            <button className="absolute top-12 right-12 text-white text-sm font-black uppercase tracking-widest hover:opacity-50 transition-all" onClick={() => setIsMobileMenuOpen(false)}>CLOSE [X]</button>
            <div className="flex flex-col space-y-12">
              {['Home', 'Portfolio', 'Quote', 'Blog', 'About', 'Contact'].map((item) => (
                <Link key={item} to={item === 'Home' ? '/' : (item === 'Portfolio' ? '/portfolio' : `/#${item.toLowerCase()}`)} onClick={() => setIsMobileMenuOpen(false)} className="text-5xl font-black text-white uppercase tracking-tighter hover:italic hover:translate-x-4 transition-all duration-500">
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
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
        <img
          src="/inc-02.png"
          alt="INCODEX"
          className="w-[300px] md:w-[600px] lg:w-[900px] opacity-[0.05] grayscale brightness-200"
        />
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

      <div className="max-w-7xl mx-auto w-full relative z-20 pt-12 pb-20 flex flex-col items-center justify-center min-h-[80vh]">

        {/* Central Atomic Animation - High Frequency */}
        <div className="relative w-full h-[150px] flex items-center justify-center mb-6 pointer-events-none scale-75 md:scale-100 will-change-transform">
          {/* Nucleus */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_white] z-30"
          />
          <div className="absolute w-20 h-20 bg-white/5 blur-[35px] rounded-full z-10" />

          {/* 4 Primary Orbits - Speed Optimized */}
          {[0, 90, 45, 135].map((rotate, i) => (
            <div
              key={i}
              className="absolute will-change-transform"
              style={{
                width: '120px',
                height: '120px',
                transform: `rotateZ(${rotate}deg) rotateX(65deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div
                className="absolute inset-0 border border-white/10 rounded-full"
                style={{ transform: 'translateZ(0)' }}
              />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: (1 + i * 0.4) * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0"
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"
                  style={{ transform: 'rotateX(-65deg)' }}
                />
              </motion.div>
            </div>
          ))}
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <Reveal className="mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-2 leading-[1.1] tracking-tight uppercase">
              Beautiful things
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-2 leading-[1.1] tracking-tight uppercase">
              come together
            </h1>
          </Reveal>
          <Reveal delay={0.2} className="mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight uppercase">
              ONE <span className="text-white/40">BYTE</span> at a time.
            </h1>
          </Reveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg lg:text-xl text-white/50 mb-12 leading-relaxed font-light px-4 max-w-2xl mx-auto text-center"
          >
            You have no idea how <span className="text-white font-bold">RAPIDLY YOU CAN GROW.</span> <br className="hidden md:block" />
            Let's find out together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="bg-white text-black px-12 py-6 rounded-full font-black text-lg flex items-center group hover:bg-neutral-200 transition-all duration-300 shadow-2xl relative overflow-hidden">
              <span className="relative z-10 uppercase tracking-[0.2em]">START PROJECT</span>
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
            </button>
          </motion.div>
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
          <h2 className="text-3xl md:text-6xl font-black mb-10 tracking-tight leading-[1] max-w-5xl mx-auto uppercase flex flex-col md:flex-row items-center justify-center gap-4">
            BUSINESSES GROWING WITH <img src="/inc-02.png" alt="INCODEX" className="h-8 md:h-16 w-auto inline-block" />
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
    <section id="about" className="py-32 px-6 bg-black border-t border-white/5 relative overflow-hidden">
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

const QuoteSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    { id: 'web-dev', name: 'Web Development', price: 400 },
    { id: 'ui-ux', name: 'UI/UX Design', price: 150 },
    { id: 'e-commerce', name: 'E-commerce Solution', price: 600 },
    { id: 'seo', name: 'SEO Optimization', price: 200 },
    { id: 'logo', name: 'Logo Design', price: 50 },
    { id: 'backlinks', name: 'Backlink Building', price: 100 },
  ];

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalCost = selectedServices.reduce((acc, id) => {
    const service = services.find(s => s.id === id);
    return acc + (service ? service.price : 0);
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        selectedServices: selectedServices.map(id => services.find(s => s.id === id).name),
        totalCost
      };
      await axios.post(`${API_URL}/quotes/submit`, payload);
      alert('Quote request sent successfully! We will contact you soon.');
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      setSelectedServices([]);
    } catch (err) {
      console.error(err);
      alert('Error sending quote request. Please try again.');
    }
  };

  return (
    <section id="quote" className="py-32 px-6 bg-black border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03] z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)] blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Reveal className="mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">Request a Quote</h2>
          </Reveal>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/50 font-light text-sm tracking-wide"
          >
            FILL OUT THE FORM BELOW AND WE'LL GET BACK TO YOU WITH A TAILORED PROPOSAL.
          </motion.p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">First Name</label>
              <input
                type="text"
                placeholder="John"
                className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-white/40 transition-all duration-300 placeholder:text-white/10 text-sm font-bold tracking-widest"
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-white/40 transition-all duration-300 placeholder:text-white/10 text-sm font-bold tracking-widest"
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-white/40 transition-all duration-300 placeholder:text-white/10 text-sm font-bold tracking-widest"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Subject</label>
              <input
                type="text"
                placeholder="Project Inquiry"
                className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-white/40 transition-all duration-300 placeholder:text-white/10 text-sm font-bold tracking-widest"
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
          </div>

          {/* Service Multi-select */}
          <div className="space-y-6">
            <div className="flex items-end justify-between px-4 mb-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Select Services</label>
              <div className="text-right">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 block mb-1">Estimated Investment</span>
                <motion.div
                  key={totalCost}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-baseline"
                >
                  <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">${totalCost}</span>
                  <span className="text-white/20 text-[10px] font-bold ml-1">USD</span>
                </motion.div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {services.map(service => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceToggle(service.id)}
                  className={`group relative px-4 py-5 rounded-2xl border text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${selectedServices.includes(service.id)
                    ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                    : 'bg-neutral-950 text-white/40 border-white/5 hover:border-white/20'
                    }`}
                >
                  <span className="relative z-10">{service.name}</span>
                  <div className={`absolute inset-0 bg-white transition-transform duration-500 ${selectedServices.includes(service.id) ? 'scale-100' : 'scale-0'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Your Message</label>
            <textarea
              rows="6"
              placeholder="Tell us about your project..."
              className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-8 py-6 text-white focus:outline-none focus:border-white/40 transition-all duration-300 placeholder:text-white/10 text-sm font-bold tracking-widest resize-none"
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="flex justify-center pt-12 border-t border-white/5">
            <button className="group relative w-full md:w-auto overflow-hidden bg-white text-black px-24 py-7 rounded-full font-black text-xl transition-all duration-500 hover:bg-neutral-200">
              <span className="relative z-10 uppercase tracking-[0.3em]">Quote</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const TeamSection = ({ data }) => {
  if (!data?.team || data.team.length === 0) return null;
  return (
    <section id="about" className="py-32 px-6 bg-black relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <Reveal className="mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase">BEHIND THE BYTES</h2>
          </Reveal>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 80 }} viewport={{ once: true }} className="h-1 bg-white mx-auto opacity-20" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {data.team.map((member, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-700 bg-neutral-950 mb-8">
                <img src={member.image || "/avatar.png"} alt={member.name} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
              </div>
              <h4 className="text-xl font-black uppercase text-white mb-1 group-hover:translate-x-2 transition-transform duration-500">{member.name}</h4>
              <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] group-hover:translate-x-2 transition-transform duration-700 delay-100 italic">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = ({ settings }) => (
  <section id="contact" className="py-24 px-6 bg-black overflow-hidden relative transition-colors duration-500 border-t border-white/5">
    <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center justify-center gap-12">
      <div className="max-w-4xl">
        <Reveal className="mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight uppercase">
            BEAUTIFUL THINGS <br />
            COME TOGETHER <br />
            ONE <span className="text-white/40">BYTE</span> AT A TIME.
          </h2>
        </Reveal>
        <div className="space-y-4 mb-10">
          <p className="text-xl text-white/60 mb-8 italic">Ready to transform your vision?</p>
          {settings && (
            <div className="flex flex-col md:flex-row justify-center gap-8 text-[12px] font-black uppercase tracking-[0.3em] text-white/30">
              <span className="hover:text-white transition-colors">{settings.email}</span>
              <span className="hidden md:block opacity-20">|</span>
              <span className="hover:text-white transition-colors">{settings.phone}</span>
            </div>
          )}
        </div>
      </div>
      <a href="/#quote" className="bg-white text-black px-12 py-6 rounded-full font-black text-xl hover:bg-neutral-200 transition-colors shadow-2xl uppercase tracking-widest">
        ORDER NOW
      </a>
    </div>
  </section>
);

const Footer = ({ data }) => (
  <footer id="footer" className="bg-black text-white py-24 px-6 border-t border-white/10 transition-colors duration-500 relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16 items-start">
        {/* Left Section: Branding */}
        <div className="lg:col-span-5">
          <div className="mb-8">
            <img src="/inc-02.png" alt="INCODEX" className="h-8 md:h-10 w-auto opacity-80" />
          </div>
          <p className="text-white/50 max-w-md mb-10 text-base md:text-lg leading-relaxed font-light">
            Superior software engineering firm specializing in complex system architectures and intelligent product development. We bridge the gap between imagination and digital reality.
          </p>
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-black group">
              <div className="w-8 h-[1px] bg-white/10 group-hover:w-12 transition-all"></div>
              {data?.email || "admin@incodex.com"}
            </div>
            <div className="flex items-center gap-4 text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-black group">
              <div className="w-8 h-[1px] bg-white/10 group-hover:w-12 transition-all"></div>
              {data?.phone || "+880 1234 567 890"}
            </div>
          </div>
          <div className="flex space-x-6">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <button key={i} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-500 group">
                <Icon size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="lg:col-span-2">
          <h4 className="font-black mb-8 uppercase tracking-[0.3em] text-[10px] text-white/30">Company</h4>
          <ul className="space-y-4 text-sm font-bold tracking-widest uppercase">
            {['About Us', 'Careers', 'Press', 'Privacy'].map((item) => (
              <li key={item}><a href="#" className="text-white/40 hover:text-white transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-black mb-8 uppercase tracking-[0.3em] text-[10px] text-white/30">Legal</h4>
          <ul className="space-y-4 text-sm font-bold tracking-widest uppercase">
            {['Terms', 'Security', 'Cookies', 'Support'].map((item) => (
              <li key={item}><a href="#" className="text-white/40 hover:text-white transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Right Section: 3D Asset Illustration */}
        <div className="hidden lg:flex lg:col-span-3 items-center justify-center pt-8">
          <motion.div
            animate={{
              y: [0, -50, 0],
              rotateY: [0, 15, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-full max-w-[200px]"
          >
            <img
              src="/inc-04.png"
              alt="INCODEX 3D Asset"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)] grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-xs font-bold tracking-widest uppercase">
        <div>© {new Date().getFullYear()} INCODEX Systems Corp.</div>
        <div className="flex space-x-8">
          <span>Global Access</span>
          <span>Architects of Alpha</span>
        </div>
      </div>
    </div>

    {/* Subtle Decorative Background Element */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.02] z-0">
      <div className="w-full h-full bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)] blur-[100px]" />
    </div>
  </footer>
);

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', comment: '', rating: 5 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/reviews/approved`).then(res => setReviews(res.data));
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/reviews/submit`, reviewForm);
      alert('Review sent for approval!');
      setReviewForm({ name: '', email: '', comment: '', rating: 5 });
    } catch (err) {
      console.error('Review Submission Error:', err);
      const msg = err.response?.data?.message || 'Transmission failed. Try again.';
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-32 px-6 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          <div className="w-full lg:w-1/2">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-16 tracking-tight uppercase leading-[0.9]">USER VOICES</h2>
            </Reveal>
            <div className="grid gap-12">
              {reviews.length === 0 ? (
                <div className="p-12 border border-white/5 rounded-3xl opacity-20">
                  <p className="uppercase font-black tracking-widest text-xs italic text-white">Awaiting high-frequency signals...</p>
                </div>
              ) : reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-10 border border-white/5 hover:border-white/20 transition-all rounded-3xl bg-neutral-950/50"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, star) => (
                      <div key={star} className={`w-1.5 h-1.5 rounded-full ${star < review.rating ? 'bg-white' : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <p className="text-xl font-light text-white/50 mb-8 italic leading-relaxed">"{review.comment}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white">{review.name[0]}</div>
                    <h4 className="font-black text-white uppercase tracking-widest text-[10px]">— {review.name}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-neutral-950 border border-white/10 p-12 rounded-3xl sticky top-32">
            <h3 className="text-xl font-black uppercase text-white tracking-[0.2em] mb-10 italic">LEAVE A REVIEW</h3>
            <form className="space-y-6" onSubmit={handleReviewSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Display Name</label>
                <input placeholder="Your Name" className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-sm font-bold text-white outline-none focus:border-white/40 transition-all uppercase placeholder:text-white/5" value={reviewForm.name} onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Email ID (Private)</label>
                <input type="email" placeholder="email@example.com" className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-sm font-bold text-white outline-none focus:border-white/40 transition-all uppercase placeholder:text-white/5" value={reviewForm.email} onChange={e => setReviewForm({ ...reviewForm, email: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Experience Summary</label>
                <textarea placeholder="Write your bytes..." rows="4" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:border-white/40 transition-all uppercase placeholder:text-white/5 resize-none" value={reviewForm.comment} onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })} required />
              </div>
              <div className="flex items-center gap-4 py-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Rating</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: star })} className={`w-8 h-8 rounded-full border transition-all ${reviewForm.rating >= star ? 'bg-white border-white' : 'border-white/10 hover:border-white/30'}`} />
                  ))}
                </div>
              </div>
              <button disabled={submitting} className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] rounded-full hover:bg-neutral-200 transition-all disabled:opacity-20 flex items-center justify-center gap-4">
                {submitting ? 'Transmitting...' : 'Send Byte'} <Zap size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/blogs`);
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
          {loading ? (
            <div className="col-span-3 text-center py-20 opacity-20 uppercase font-black tracking-widest">Accessing Journal Archive...</div>
          ) : posts.length === 0 ? (
            <div className="col-span-3 text-center py-20 opacity-20 uppercase font-black tracking-widest">No entries found.</div>
          ) : posts.map((post, i) => (
            <Link key={i} to={`/blog/${post.slug}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex flex-col h-full cursor-pointer"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-8 border border-white/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                  />
                </div>
                <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mb-4 group-hover:text-white transition-colors duration-500">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const [blogSlugs, setBlogSlugs] = useState([]);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchSlugs = async () => {
      try {
        const res = await axios.get(`${API_URL}/blogs`);
        setBlogSlugs(res.data.map(b => b.slug));
      } catch (err) {
        console.error(err);
      }
    };
    fetchSlugs();
  }, []);

  const currentIndex = blogSlugs.indexOf(slug);
  const prevSlug = currentIndex > 0 ? blogSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < blogSlugs.length - 1 ? blogSlugs[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    if (slug) {
      axios.get(`${API_URL}/blogs/${slug}`)
        .then(res => {
          setBlog(res.data);
          setContent(res.data.content);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [slug]);

  if (!blog) return <div className="min-h-screen pt-40 px-6 text-center text-white">Blog not found.</div>;

  return (
    <div className="min-h-screen pt-40 pb-32 px-6 bg-black text-white selection:bg-white selection:text-black">
      <div className="max-w-3xl mx-auto">
        <Link to="/#blog" className="inline-flex items-center text-[10px] font-black text-white/40 hover:text-white uppercase tracking-[0.3em] transition-all duration-500 mb-12 group">
          <ArrowRight size={14} className="mr-4 rotate-180 group-hover:-translate-x-2 transition-transform" /> BACK TO JOURNAL
        </Link>
        <motion.div
          key={slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mb-6">{blog.date}</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-12 tracking-tight uppercase leading-[1.1]">{blog.title}</h1>
          <div className="w-12 h-1 bg-white opacity-20 mb-16" />

          <div className="w-full aspect-video rounded-3xl overflow-hidden mb-16 border border-white/5">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          <div className="prose prose-invert prose-lg max-w-none mb-24">
            {loading ? (
              <div className="animate-pulse space-y-4 flex flex-col">
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-4 bg-white/10 rounded w-1/2"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
              </div>
            ) : (
              <div className="text-white/60 leading-relaxed font-light whitespace-pre-wrap text-lg md:text-xl">
                {content}
              </div>
            )}
          </div>

          {/* Post Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-white/5">
            <div className="w-full md:w-1/2">
              {prevSlug && (
                <Link to={`/blog/${prevSlug}`} className="group block text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4 block group-hover:text-white/40 transition-colors italic">PREVIOUS STORY</span>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight group-hover:translate-x-[-10px] transition-transform duration-500">{prevSlug}</h4>
                </Link>
              )}
            </div>
            <div className="w-full md:w-1/2 text-right">
              {nextSlug && (
                <Link to={`/blog/${nextSlug}`} className="group block text-right">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4 block group-hover:text-white/40 transition-colors italic">NEXT STORY</span>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight group-hover:translate-x-[10px] transition-transform duration-500">{nextSlug}</h4>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const AppContents = () => {
  const location = useLocation();
  const [aboutData, setAboutData] = useState(null);
  const [settingsData, setSettingsData] = useState(null);

  useEffect(() => {
    // Fetch global company data
    axios.get(`${API_URL}/about`).then(res => setAboutData(res.data));
    axios.get(`${API_URL}/settings`).then(res => setSettingsData(res.data));

    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (location.pathname === '/') {
        window.scrollTo(0, 0);
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-white selection:text-black transition-colors duration-500">
      {!location.pathname.startsWith('/admin') && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <ProgressInfo />
            <Features />
            <TeamSection data={aboutData} />
            <QuoteSection />
            <ServicesInfo />
            <Testimonials />
            <Blog />
            <CTA settings={settingsData} />
          </>
        } />
        <Route path="/portfolio" element={<Portfolio Reveal={Reveal} />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!location.pathname.startsWith('/admin') && <Footer data={settingsData} />}
    </div>
  );
};

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Router>
      <AppContents />
    </Router>
  );
};

export default App;
