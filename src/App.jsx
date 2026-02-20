import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Shield, Zap, Globe, Layout, ChevronRight, Github, Twitter, Linkedin, Sun, Moon } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md py-4 border-b border-black/5 dark:border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter text-black dark:text-white"
        >
          IN<span className="text-black/40 dark:text-white/60">CODEX</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Quote', 'Blog', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-black/60 dark:text-white/70 hover:text-black dark:hover:text-white transition-all uppercase tracking-widest px-2">
              {item}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle & Theme toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-black dark:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
            className="md:hidden bg-white dark:bg-black border-b border-black/5 dark:border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {['Home', 'Quote', 'Blog', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xl font-bold text-black dark:text-white uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>
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

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-black/5 dark:bg-white/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black/5 dark:bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-8 leading-[1.1] tracking-tight">
            Beautiful things <br />
            come together <br />
            <span className="text-outline-black dark:text-outline-white text-transparent">one byte</span> <br />
            at a time.
          </h1>
          <p className="text-lg md:text-xl text-black/50 dark:text-white/50 mb-12 max-w-xl mx-auto leading-relaxed font-light">
            You have no idea how <span className="text-black dark:text-white font-bold">RAPIDLY YOU CAN GROW.</span> <br className="hidden md:block" />
            Let’s find out together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full font-black text-lg flex items-center group hover:scale-105 transition-all duration-300 shadow-xl shadow-black/10 dark:shadow-white/5">
              START NOW <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Right side animation */}
        <div className="hidden lg:block relative h-[500px]">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-black/10 dark:border-white/10 rounded-full"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-black/20 dark:border-white/20 rounded-[40%] flex items-center justify-center"
          >
            <div className="w-4 h-4 bg-black dark:bg-white rounded-full shadow-[0_0_20px_currentColor]" />
          </motion.div>

          {/* Floating bytes/dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute w-1.5 h-1.5 bg-black dark:bg-white rounded-full"
              style={{
                top: `${20 + i * 12}%`,
                right: `${15 + (i % 3) * 10}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-6"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-black dark:from-white to-transparent" />
      </motion.div>
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
  ];

  return (
    <section id="quote" className="py-32 px-6 bg-white dark:bg-black border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-6 tracking-tight uppercase">OUR EXPERTISE</h2>
          <div className="w-20 h-1 bg-black dark:bg-white mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group p-10 rounded-none border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-all duration-500 bg-neutral-50 dark:bg-neutral-950"
            >
              <div className="w-12 h-12 text-black dark:text-white mb-8 group-hover:scale-110 transition-transform duration-500">
                <f.icon size={40} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-black text-black dark:text-white mb-6 leading-tight tracking-wider">
                {f.title}
              </h3>
              <p className="text-black/40 dark:text-white/40 leading-relaxed font-light group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors">
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
  <section className="py-24 px-6 bg-black dark:bg-white overflow-hidden relative transition-colors duration-500">
    <div className="absolute top-0 right-0 opacity-5">
      <span className="text-[200px] font-black pointer-events-none text-white dark:text-black">INCODEX</span>
    </div>
    <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
      <div>
        <h2 className="text-5xl md:text-7xl font-black text-white dark:text-black mb-6">READY TO SCALE?</h2>
        <p className="text-xl text-white/60 dark:text-black/60 max-w-xl">
          Join 200+ companies that have transformed their technology stack with INCODEX.
        </p>
      </div>
      <button className="bg-white dark:bg-black text-black dark:text-white px-12 py-6 rounded-full font-black text-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors shadow-2xl">
        Consultation Request
      </button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white dark:bg-black text-black dark:text-white py-16 px-6 border-t border-black/5 dark:border-white/10 transition-colors duration-500">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="text-3xl font-black mb-6">INCODEX</div>
          <p className="text-black/50 dark:text-white/50 max-w-sm mb-8">
            Superior software engineering firm specializing in complex system architectures and intelligent product development.
          </p>
          <div className="flex space-x-4">
            <button className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all">
              <Twitter size={18} />
            </button>
            <button className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all">
              <Linkedin size={18} />
            </button>
            <button className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all">
              <Github size={18} />
            </button>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Company</h4>
          <ul className="space-y-4 text-black/40 dark:text-white/50">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Legal</h4>
          <ul className="space-y-4 text-black/40 dark:text-white/50">
            <li><a href="#" className="hover:underline">Terms</a></li>
            <li><a href="#" className="hover:underline">Security</a></li>
            <li><a href="#" className="hover:underline">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-black/5 dark:border-white/5 text-center text-black/30 dark:text-white/30 text-sm">
        © {new Date().getFullYear()} INCODEX Systems Corp. All rights reserved. Built for the modern web.
      </div>
    </div>
  </footer>
);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-black min-h-screen font-sans selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black transition-colors duration-500">
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Hero />
        <Features />
        <CTA />
        <Footer />
      </div>
    </div>
  );
};

export default App;
