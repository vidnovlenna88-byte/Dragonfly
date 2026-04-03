/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './components/Logo';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  Send, 
  MessageCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Layers,
  Hand,
  Sparkles,
  Quote
} from 'lucide-react';

// --- Constants ---

const SAMPLE_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-white-marble-texture-background-41263-large.mp4";

const TEXTURES = [
  {
  title: "Травертин",
  desc: "Класична італійська естетика...",
  img: "/images/handmade_5.mp4",
  },
  {
  title: "Травертин",
  desc: "Класична італійська естетика...",
  img: "/images/handmade_2.mp4",
  },
  {
  title: "Травертин",
  desc: "Класична італійська естетика...",
  img: "/images/handmade_3.mp4",
  },
  {
  title: "Травертин",
  desc: "Класична італійська естетика...",
  img: "/images/handmade_1.mp4",
  },
  {
  title: "Травертин",
  desc: "Класична італійська естетика...",
  img: "/images/handmade_6.mp4",
  },
  {
  title: "Травертин",
  desc: "Класична італійська естетика...",
  img: "/images/gray_3.mp4",
  },
];

const PROJECTS = [
  {title: "Авторська графічна фактура",
    type: "Інтер’єр | Світло і ритм",
    desc: "Ми створили поверхню, яка взаємодіє зі світлом і рухом людини..Кожна лінія працює з простором, підкреслюючи його глибину та створюючи відчуття впорядкованості.",
    img: "/images/line.jpg",
    gallery: [
      "/images/line_1.jpg",
      "/images/line_2.jpg",
      "/images/line_3.jpg",
      "/images/line_4.jpg",
      "/images/line_5.jpg",
    ]
  },
  {
    title: "Тактильна тиша",
    type: "Фактура | Дотик і спокій",
    desc: "Поверхня, яку хочеться відчути руками.М’яка, рівна, вона створює фон, що не відволікає — а заспокоює.",
    img: "/images/texture.jpg",
    gallery: [
      "/images/texture_1.jpg",
      "/images/texture_2.jpg",
      "/images/texture_3.jpg",
      "/images/texture_4.jpg",
      "/images/texture.jpg",
    ]
  },
  {
    title: "Тонка геометрія",
    type: "Фактура | Ритм і порядок",
    desc: "Світло м’яко підкреслює ритм, створюючи спокійну, вивірену структуру простору. Так з’являється фактура, де геометрія стає живою частиною простору.",
    img: "/images/traf.jpg",
    gallery: [
      "/images/traf_1.jpg",
      "/images/traf_2.jpg",
      "/images/traf_3.jpg",
      "/images/traf.jpg",
    ]
  },
  {
    title: "Народження форми",
    type: "Фактура | Графіка і глибина",
    desc: "Контур інтегрується в поверхню, стаючи її частиною. Світло підкреслює кожен вигин, додаючи об’єм і живу пластику.",
    img: "/images/wall.jpg",
    gallery: [
      "/images/wall_1.jpg",
      "/images/wall_2.jpg",
      "/images/wall_3.jpg",
      "/images/wall.jpg",
    ]
  },
  {
    title: "Глибина мінералу",
    type: "Фактура | Простір і глибина",
    desc: "Цілісна поверхня з багатошаровою структурою. Вона не читається одразу — розкривається поступово, залежно від світла і дистанції.",
    img: "/images/gold.jpg",
    gallery: [
      "/images/gold_1.jpg",
      "/images/gold_2.jpg",
      "/images/gold_3.jpg",
      "/images/gold.jpg",
    ]
  },
  {
    title: "Фрагмент архітектури",
    type: "Арт-композиція | Легкість і символ",
    desc: "Знайомий образ набуває нової форми через матеріал. Фактура і структура змінюють сприйняття, залишаючи лише відчуття.",
    img: "/images/art.jpg",
    gallery: [
      "/images/art_1.jpg",
      "/images/art_2.jpg",
      "/images/art_3.jpg",
      "/images/art_4.jpg",
      "/images/art.jpg",
    ]
  },
  {
    title: "Баланс простору",
    type: "Інтер’єр | Цілісність і світло",
    desc: "М’яка фактура, яка працює разом зі світлом.Світло, матеріал і геометрія працюють разом, створюючи гармонію без зайвих акцентів. ",
    img: "/images/gray_2.jpg",
    gallery: [
      "/images/gray.jpg",
      "/images/gray_1.jpg",
      "/images/gray_2.jpg",
    ]
  },
  {
    title: "Геометрія світла",
    type: "Інтер’єр | Ритм і площина",
    desc: "Кожен елемент створюється з увагою до пропорцій і ритму. Це робота, де геометрія переходить у матеріал.",
    img: "/images/texture_u.jpg",
    gallery: [
      "/images/texture_u_1.jpg",
      "/images/texture_u_2.jpg",
      "/images/texture_u.jpg",
      "/images/texture_u_3.jpg",
    ]
  },
];

// --- Components ---

const MediaItem = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
  const isVideo = src.includes('.mp4') || src.includes('video');
  
  if (isVideo) {
    return (
      <video 
        src={src} 
        autoPlay 
        muted 
        loop 
        playsInline 
        className={className}
      />
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      referrerPolicy="no-referrer"
    />
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-12 md:mb-20">
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 0.6, y: 0 }}
        viewport={{ once: true }}
        className={`uppercase text-[9px] md:text-[10px] tracking-[0.4em] mb-3 md:mb-4 font-medium ${light ? 'text-ivory/60' : 'text-warm-gray'}`}
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-3xl md:text-6xl font-light leading-tight tracking-tight ${light ? 'text-ivory' : 'text-deep-taupe'}`}
    >
      {title}
    </motion.h2>
  </div>
);

  const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-ivory/90 backdrop-blur-lg py-4 shadow-sm' : 'bg-transparent py-6 md:py-10'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
        <div 
          onClick={scrollToTop}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <Logo className="h-12 md:h-20 w-auto transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(197,179,154,0.5)] drop-shadow-md" />
          <div className="text-lg md:text-xl font-serif tracking-[0.3em] uppercase font-medium text-deep-taupe transition-colors duration-500 group-hover:text-gold-dust">Dragonfly</div>
        </div>
        
        <div className="hidden md:flex gap-14 text-[10px] uppercase tracking-[0.25em] font-medium opacity-70 text-deep-taupe">
          <a href="#philosophy" className="hover:opacity-100 transition-opacity">Філософія</a>
          <a href="#palette" className="hover:opacity-100 transition-opacity">Фактури</a>
          <a href="#portfolio" className="hover:opacity-100 transition-opacity">Роботи</a>
          <a href="#contact" className="hover:opacity-100 transition-opacity">Контакт</a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-deep-taupe">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-ivory border-b border-cream absolute top-full left-0 w-full"
          >
            <div className="flex flex-col p-10 gap-8 text-[10px] uppercase tracking-[0.3em] font-medium text-deep-taupe">
              <a href="#philosophy" onClick={() => setIsOpen(false)}>Філософія</a>
              <a href="#palette" onClick={() => setIsOpen(false)}>Фактури</a>
              <a href="#portfolio" onClick={() => setIsOpen(false)}>Роботи</a>
              <a href="#contact" onClick={() => setIsOpen(false)}>Контакт</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Main App ---

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const paletteScrollRef = useRef<HTMLDivElement>(null);
  const [activeTexture, setActiveTexture] = useState<any | null>(null);
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const textureModalScrollRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || isSubmitting) return;

    setIsSubmitting(true);
    setStatus('idle');
    try {
      const response = await fetch('/.netlify/functions/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          page: window.location.href
        }),
      });

      const data = await response.json();
      if (data.success) {
        setFormData({ name: '', contact: '', message: '' });
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Infinite scroll duplication
  const infiniteTextures = [...TEXTURES, ...TEXTURES, ...TEXTURES];
  const infiniteProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  useEffect(() => {
    // Initialize scroll to middle set
    const initScroll = (ref: React.RefObject<HTMLDivElement | null>, itemCount: number) => {
      if (ref.current) {
        const itemWidth = ref.current.scrollWidth / 3;
        ref.current.scrollLeft = itemWidth;
      }
    };

    initScroll(paletteScrollRef, TEXTURES.length);
    initScroll(scrollContainerRef, PROJECTS.length);
  }, []);

  useEffect(() => {
    if (activeProject) {
      // Small delay to ensure the modal is rendered and ref is attached
      const timer = setTimeout(() => {
        if (modalScrollRef.current) {
          const itemWidth = modalScrollRef.current.scrollWidth / 3;
          modalScrollRef.current.scrollLeft = itemWidth;
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeProject]);

  useEffect(() => {
    if (activeTexture) {
      const timer = setTimeout(() => {
        if (textureModalScrollRef.current) {
          const itemWidth = textureModalScrollRef.current.scrollWidth / 3;
          textureModalScrollRef.current.scrollLeft = itemWidth;
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeTexture]);

  const handleInfiniteScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth } = ref.current;
    const oneThird = scrollWidth / 3;

    if (scrollLeft <= 0) {
      ref.current.scrollLeft = oneThird;
    } else if (scrollLeft >= oneThird * 2) {
      ref.current.scrollLeft = oneThird;
    }
  };

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen selection:bg-gold-dust selection:text-white bg-ivory text-deep-taupe">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ivory py-20 md:py-0">
        <div className="absolute inset-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.25 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src="https://picsum.photos/seed/interior-art-1/1920/1080?grayscale" 
            alt="Texture Background" 
            className="w-full h-full object-cover blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory/40 to-ivory"></div>
        </div>

        <div className="relative z-10 text-center px-6 md:px-8 max-w-5xl pt-24 md:pt-32 pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-deep-taupe font-serif text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-light mb-6 md:mb-10 leading-[1.1] tracking-tight drop-shadow-sm"
          >
            Простір як стан. <br className="hidden md:block" /> Мистецтво живих стін.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="text-deep-taupe/90 text-base md:text-2xl font-light max-w-3xl mx-auto mb-10 md:mb-16 leading-relaxed"
          >
            Ми створюємо авторські декоративні поверхні, що перетворюють інтер'єр на джерело спокою та художньої глибини. Кожна текстура розробляється індивідуально, щоб підкреслити унікальний характер вашого дому.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
          >
            <div className="flex flex-col items-center gap-4 w-full md:w-auto">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-6 bg-deep-taupe text-ivory px-10 md:px-12 py-5 md:py-6 text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gold-dust transition-all duration-500 group shadow-lg w-full md:w-auto"
              >
                Обговорити проєкт
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
              </a>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-deep-taupe/60 font-medium text-center max-w-[280px] md:max-w-none">Консультація включає підбір фактур та обговорення концепції</p>
            </div>
            <a 
              href="#portfolio" 
              className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-deep-taupe/70 hover:text-deep-taupe transition-colors border-b-2 border-deep-taupe/20 pb-1"
            >
              Переглянути роботи
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-deep-taupe/20"
        >
          <ChevronDown size={28} strokeWidth={1} />
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section id="philosophy" className="py-20 md:py-32 px-6 md:px-8 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            subtitle="The Essence" 
            title="Естетика тактильності" 
          />
          <div className="max-w-3xl mb-16 text-lg md:text-2xl font-light leading-relaxed text-warm-gray">
            <p>Ми створюємо не просто декоративні поверхні, а відчуття простору, яке розкривається через світло, рельєф і тактильність.</p>
            <p className="mt-4">Кожен проєкт — це індивідуальна робота з матеріалом, де фактура стає частиною атмосфери дому.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[
              {
                title: "Авторські рецептури",
                text: "Кожна фактура створюється під конкретний простір, а не береться з готового шаблону. Ми підбираємо матеріали, глибину рельєфу та характер поверхні так, щоб результат був унікальним і не тиражувався."
              },
              {
                title: "Світлова архітектура",
                text: "Ми працюємо не лише з кольором і рельєфом, а й зі світлом. Поверхня змінюється протягом дня, по-різному розкриваючи глибину, м’якість або виразність текстури у вашому інтер’єрі."
              },
              {
                title: "Архітектурна міцність",
                text: "Естетика тут поєднується з практичністю. Ми використовуємо якісні матеріали та професійні системи нанесення, щоб покриття залишалось виразним, стійким і довговічним у щоденному просторі."
              }
            ].map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-serif tracking-wide">{benefit.title}</h3>
                <p className="text-warm-gray font-light leading-relaxed">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Texture Showcase */}
      <section id="palette" className="py-20 md:py-32 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading 
            subtitle="The Palette" 
            title="Матерія та світло" 
          />
          
          <p className="max-w-3xl mb-8 text-lg md:text-2xl font-light leading-relaxed text-warm-gray">
            Ми працюємо з фактурами, які не просто прикрашають стіну, а формують настрій простору — через рельєф, світло, тишу і глибину матеріалу.
          </p>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-16 text-[11px] md:text-[13px] uppercase tracking-[0.2em] font-medium text-deep-taupe/70 leading-relaxed max-w-5xl"
          >
            <span className="text-gold-dust/80 mr-2">Техніки, що ми використовуємо:</span>
            Травертин | Марморіно | Венеціанська штукатурка | Мікроцемент | Бетон та loft-ефекти | Пісочні та мінеральні текстури | Мокрий шовк | Оксамитові покриття | Перламутрові та світлові ефекти | Трафаретна техніка | Арт-панно та рельєфні композиції | Авторські фактури Dragonfly
          </motion.p>

          <div className="relative group">
            <div 
              ref={paletteScrollRef}
              onScroll={() => handleInfiniteScroll(paletteScrollRef)}
              className="flex gap-8 md:gap-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {infiniteTextures.map((texture, idx) => (
                <motion.div 
                  key={`${texture.title}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % TEXTURES.length) * 0.05 }}
                  onClick={() => {
                    if (texture.gallery && texture.gallery.length > 1) {
                      setActiveTexture(texture);
                    }
                  }}
                  className={`flex-none w-[280px] md:w-[320px] snap-start group/card ${
                    texture.gallery && texture.gallery.length > 1 ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <MediaItem 
                      src={texture.img} 
                      alt={texture.title} 
                      className={`w-full h-full object-cover object-center transition-transform duration-1000 ${
                        texture.gallery && texture.gallery.length > 1 ? 'group-hover/card:scale-105' : ''
                      }`}
                    />
                    <div className={`absolute inset-0 bg-deep-taupe/10 transition-colors duration-500 ${
                      texture.gallery && texture.gallery.length > 1 ? 'group-hover/card:bg-transparent' : ''
                    }`}></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={(e) => { e.stopPropagation(); scroll('left', paletteScrollRef); }}
              className="absolute -left-4 md:-left-6 top-[35%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-ivory/90 backdrop-blur-md border border-gold-dust/20 flex items-center justify-center text-deep-taupe hover:bg-gold-dust hover:text-white transition-all duration-500 z-20 shadow-lg md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft size={20} strokeWidth={1} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); scroll('right', paletteScrollRef); }}
              className="absolute -right-4 md:-right-6 top-[35%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-ivory/90 backdrop-blur-md border border-gold-dust/20 flex items-center justify-center text-deep-taupe hover:bg-gold-dust hover:text-white transition-all duration-500 z-20 shadow-lg md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight size={20} strokeWidth={1} />
            </button>
          </div>
          
          <div className="mt-12">
            <p className="text-center text-[10px] uppercase tracking-[0.3em] text-deep-taupe/60">
              Унікальні рішення, створені під конкретний простір і задум
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 md:py-32 bg-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading 
            subtitle="Selected Works" 
            title="Кураторська добірка" 
          />
          
          <div className="relative group">
            <div 
              ref={scrollContainerRef}
              onScroll={() => handleInfiniteScroll(scrollContainerRef)}
              className="flex gap-8 md:gap-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {infiniteProjects.map((project, idx) => (
                <motion.div 
                  key={`${project.title}-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveProject(project)}
                  className="flex-none w-[85vw] md:w-[500px] snap-start space-y-6 cursor-pointer group/card"
                >
                  <div className="aspect-[16/10] overflow-hidden relative group/img">
                    <MediaItem 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-deep-taupe/5 group-hover/img:bg-transparent transition-colors duration-700"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                      <div className="bg-ivory/90 backdrop-blur-sm px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-deep-taupe">
                        Переглянути галерею
                      </div>
                    </div>
                  </div>
                  <div className="max-w-lg">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold-dust mb-2 font-medium">{project.type}</p>
                    <h3 className="text-xl md:text-2xl font-serif mb-3 group-hover/card:text-gold-dust transition-colors">{project.title}</h3>
                    <p className="text-xs md:text-sm text-warm-gray font-light leading-relaxed">{project.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={(e) => { e.stopPropagation(); scroll('left', scrollContainerRef); }}
              className="absolute -left-4 md:-left-6 top-[30%] md:top-[calc(500px*10/16/2)] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-ivory/90 backdrop-blur-md border border-gold-dust/20 flex items-center justify-center text-deep-taupe hover:bg-gold-dust hover:text-white transition-all duration-500 z-20 shadow-lg md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft size={20} strokeWidth={1} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); scroll('right', scrollContainerRef); }}
              className="absolute -right-4 md:-right-6 top-[30%] md:top-[calc(500px*10/16/2)] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-ivory/90 backdrop-blur-md border border-gold-dust/20 flex items-center justify-center text-deep-taupe hover:bg-gold-dust hover:text-white transition-all duration-500 z-20 shadow-lg md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight size={20} strokeWidth={1} />
            </button>
          </div>
        </div>
      </section>

      {/* About the Author */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-cream">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1 relative aspect-square overflow-hidden shadow-xl">
            <img 
              src="images/photo.jpg"
              alt="The Artisan" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="order-1 md:order-2 max-w-xl">
            <SectionHeading 
              subtitle="The Artisan" 
              title="Іванна. Майстерність, втілена в матерії." 
            />
            <div className="space-y-8 md:space-y-10 text-lg md:text-xl text-warm-gray font-light leading-relaxed">
              <p>
                Мій підхід поєднує глибоке знання хімії матеріалів та художню інтуїцію. Я працюю з об'ємом і тінню, щоб створити поверхні, які не просто декорують, а формують атмосферу дому.
              </p>
              <p>
                Я несу особисту відповідальність за кожен сантиметр фактури. Моя мета — створити простір, який резонуватиме з вашим внутрішнім світом і приноситиме естетичне задоволення щодня.
              </p>
              <div className="pt-6 border-t border-gold-dust/20">
                <p className="text-xs uppercase tracking-[0.3em] font-semibold opacity-40">Особистий нагляд за кожним етапом втілення</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Approach */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-ivory border-y border-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading 
            subtitle="Collaboration" 
            title="Синергія з вашим баченням" 
          />
          <div className="space-y-8 md:space-y-12 text-lg md:text-2xl text-warm-gray font-light leading-relaxed">
            <p>
              Ми працюємо у тісному контакті з дизайнерами та архітекторами, стаючи руками вашої ідеї. Формат співпраці — від акцентної стіни до повного оформлення — ми визначаємо під час першої зустрічі.
            </p>
            <p>
              Кожен проєкт починається з глибокого розуміння ваших побажань. Ми створюємо індивідуальні взірці, доки не досягнемо ідеального поєднання кольору та текстури під ваше освітлення.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 md:py-32 px-6 md:px-8 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            subtitle="The Ritual" 
            title="Шлях до результату" 
          />
          
          <div className="grid md:grid-cols-4 gap-16">
            {[
              { icon: <MessageCircle size={28} strokeWidth={1} />, title: "Запит", text: "Залиште заявку, і ми зв'яжемося з вами для обговорення ідеї. Після першої розмови ми призначимо зустріч для детального знайомства з об'єктом." },
              { icon: <Layers size={28} strokeWidth={1} />, title: "Взірці", text: "Я розробляю унікальні планшети у матеріалі спеціально під архітектуру вашого об'єкта." },
              { icon: <Hand size={28} strokeWidth={1} />, title: "Втілення", text: "Тихий процес нанесення фактури, де кожен рух майстра має значення для фінального образу." },
              { icon: <Sparkles size={28} strokeWidth={1} />, title: "Результат", text: "Фінальне покриття, що захищає мистецтво та робить його частиною вашої історії." }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-gold-dust mb-10">{step.icon}</div>
                <h3 className="text-2xl font-serif mb-5 tracking-tight">{step.title}</h3>
                <p className="text-sm text-warm-gray font-light leading-relaxed">{step.text}</p>
                {idx < 3 && <div className="hidden lg:block absolute top-3.5 -right-8 w-16 h-px bg-gold-dust/30"></div>}
              </div>
            ))}
          </div>
          <p className="mt-20 text-center text-[10px] uppercase tracking-[0.3em] text-warm-gray/40">Від першого контакту до презентації індивідуальних взірців зазвичай проходить 3-5 робочих днів</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            subtitle="Testimonials" 
            title="Тиха довіра" 
          />
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                quote: "Стіни стали головним об'єктом у домі. Світло на них грає неймовірно, створюючи щоразу інший настрій.",
                author: "Олена, дизайнер інтер'єру",
                context: "Приватний будинок, Конча-Заспа"
              },
              {
                quote: "Все чітко, вчасно і дуже красиво. Фактура бетону в передпокої вийшла саме такою, як ми уявляли. Справжня майстерність без зайвого клопоту.",
                author: "Марк та Анна",
                context: "Апартаменти, ЖК RiverStone"
              },
              {
                quote: "Іванна відчула наш настрій з першої зустрічі. Результат перевершив очікування — це справжнє мистецтво.",
                author: "Сергій, архітектор",
                context: "Офіс креативної агенції"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-ivory p-10 border border-gold-dust/10 space-y-6"
              >
                <Quote className="text-gold-dust/20" size={32} />
                <p className="text-lg font-light italic leading-relaxed text-deep-taupe/80">\"{item.quote}\"</p>
                <div className="pt-4 border-t border-cream">
                  <p className="text-sm font-medium uppercase tracking-wider">{item.author}</p>
                  <p className="text-[10px] text-warm-gray uppercase tracking-widest mt-1">{item.context}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-6 md:px-8 bg-ivory">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <SectionHeading 
              subtitle="The Invitation" 
              title="Запрошення до діалогу" 
            />
            <p className="text-lg md:text-xl text-warm-gray font-light leading-relaxed mb-12 md:mb-16 max-w-md">
              Залиште ваші контакти — я особисто зателефоную вам протягом робочого дня, щоб обговорити деталі вашого майбутнього проєкту.
            </p>
            <div className="space-y-8">
              <div className="flex items-center gap-5 text-warm-gray">
                <MapPin size={18} strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Україна | Міжнародні проекти</span>
              </div>
              <div className="flex gap-8 pt-4">
                <a href="https://instagram.com/dragonflly_art" className="text-warm-gray hover:text-gold-dust transition-colors duration-500"><Instagram size={24} strokeWidth={1.5} /></a>
                <a href="https://t.me/Dragonflyyart" className="text-warm-gray hover:text-gold-dust transition-colors duration-500"><Send size={24} strokeWidth={1.5} /></a>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-cream p-8 md:p-12 border border-gold-dust/10"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-3">
                <label className="text-[9px] uppercase tracking-[0.4em] text-warm-gray font-bold">Ваше ім’я</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-gold-dust/20 py-4 focus:border-gold-dust outline-none transition-all duration-500 font-light text-lg"
                  placeholder="Як до вас звертатися"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] uppercase tracking-[0.4em] text-warm-gray font-bold">Контактний номер або месенджер</label>
                <input 
                  type="text" 
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-gold-dust/20 py-4 focus:border-gold-dust outline-none transition-all duration-500 font-light text-lg"
                  placeholder="+380..."
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] uppercase tracking-[0.4em] text-warm-gray font-bold">Думки про майбутній проект</label>
                <textarea 
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-gold-dust/20 py-4 focus:border-gold-dust outline-none transition-all duration-500 font-light text-lg resize-none"
                  placeholder="Локація, ідея чи відчуття, які ви шукаєте"
                ></textarea>
              </div>
              <div className="space-y-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-deep-taupe text-ivory py-7 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold-dust transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Надсилаємо...' : 'Надіслати запит'}
                </button>
                
                {status === 'success' && (
                  <p className="text-[10px] text-center text-green-600 uppercase tracking-widest font-bold">Заявку надіслано</p>
                )}
                {status === 'error' && (
                  <p className="text-[10px] text-center text-red-600 uppercase tracking-widest font-bold">Помилка. Спробуйте ще раз</p>
                )}

                <p className="text-[9px] text-center text-warm-gray/60 uppercase tracking-widest">Ваші дані в безпеці. Ми використовуємо їх лише для зв'язку з вами щодо вашого запиту.</p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Block */}
      <section className="py-24 px-6 md:px-8 bg-cream text-center border-t border-gold-dust/10">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-deep-taupe leading-tight">Створіть простір, що надихає.</h2>
          <p className="text-lg text-warm-gray font-light">Ми готові втілити ваші художні задуми в реальність. Почніть трансформацію вашого дому з професійної консультації.</p>
          <div className="pt-6">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-6 bg-deep-taupe text-ivory px-12 py-6 text-[10px] uppercase tracking-[0.3em] font-semibold hover:bg-gold-dust transition-all duration-500 group"
            >
              Обговорити проєкт
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-10 px-8 bg-ivory border-t border-gold-dust/20 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <Logo className="h-10 w-auto opacity-100 transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(197,179,154,0.5)]" />
              <p className="font-serif text-2xl text-deep-taupe tracking-[0.3em] uppercase font-medium transition-colors duration-500 group-hover:text-gold-dust">Dragonfly</p>
            </div>
            
            <div className="flex gap-6 text-deep-taupe/60">
              <a href="https://instagram.com/Dragonflly_art" target="_blank" rel="noopener noreferrer" className="hover:text-gold-dust transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://t.me/Dragonflyyart" target="_blank" rel="noopener noreferrer" className="hover:text-gold-dust transition-colors">
                <Send size={20} />
              </a>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-deep-taupe font-bold">Естетика тактильності. Авторські поверхні. 2026.</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-warm-gray font-medium opacity-60">Всі права захищено</p>
          </div>
        </div>
      </footer>

      {/* Texture Modal */}
      <AnimatePresence>
        {activeTexture && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-deep-taupe/90 backdrop-blur-md"
            onClick={() => setActiveTexture(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ivory max-w-4xl w-full max-h-[90vh] overflow-y-auto md:overflow-hidden scrollbar-hide shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveTexture(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 text-deep-taupe hover:text-gold-dust transition-colors bg-ivory/50 backdrop-blur-sm rounded-full p-1 md:bg-transparent"
              >
                <X size={24} />
              </button>
              
              <div className="grid md:grid-cols-2 h-full">
                <div className="aspect-square md:aspect-auto md:h-full overflow-hidden relative group/modal">
                  <div 
                    ref={textureModalScrollRef}
                    onScroll={() => handleInfiniteScroll(textureModalScrollRef)}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full"
                  >
                    {[...activeTexture.gallery, ...activeTexture.gallery, ...activeTexture.gallery].map((src: string, i: number) => (
                      <div key={i} className="flex-none w-full h-full snap-center">
                        <MediaItem 
                          src={src} 
                          alt={`${activeTexture.title} ${i + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); scroll('left', textureModalScrollRef); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-ivory/20 hover:bg-ivory/40 backdrop-blur-sm border border-ivory/20 flex items-center justify-center text-deep-taupe transition-all duration-500 z-10 rounded-full md:opacity-0 md:group-hover/modal:opacity-100"
                  >
                    <ChevronLeft size={20} strokeWidth={1.5} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); scroll('right', textureModalScrollRef); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-ivory/20 hover:bg-ivory/40 backdrop-blur-sm border border-ivory/20 flex items-center justify-center text-deep-taupe transition-all duration-500 z-10 rounded-full md:opacity-0 md:group-hover/modal:opacity-100"
                  >
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="p-8 md:p-16 flex flex-col justify-center">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold-dust mb-3 md:mb-4 font-bold">Приклад фактури</p>
                  <h3 className="text-2xl md:text-5xl font-serif mb-6 md:mb-8">{activeTexture.title}</h3>
                  <p className="text-base md:text-lg text-warm-gray font-light leading-relaxed mb-8 md:mb-10">
                    Це лише один із варіантів виконання. Кожна робота Dragonfly адаптується під ваші побажання щодо глибини рельєфу, відтінку та гри світла.
                  </p>
                  <button 
                    onClick={() => setActiveTexture(null)}
                    className="inline-flex items-center justify-center bg-deep-taupe text-ivory px-8 py-4 md:px-10 md:py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold-dust transition-all duration-500"
                  >
                    Закрити
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Gallery Modal (Carousel) */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-taupe/95 backdrop-blur-xl"
            onClick={() => setActiveProject(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="w-full h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 md:p-10">
                <div className="pr-12">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-gold-dust mb-1 font-bold">{activeProject.type}</p>
                  <h3 className="text-lg md:text-3xl font-serif text-ivory leading-tight">{activeProject.title}</h3>
                </div>
                <button 
                  onClick={() => setActiveProject(null)}
                  className="w-10 h-10 md:w-12 md:h-12 flex-none flex items-center justify-center text-ivory hover:text-gold-dust transition-colors border border-ivory/20 rounded-full"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>

              <div className="flex-1 relative flex items-center justify-center px-2 md:px-20 overflow-hidden">
                <div 
                  ref={modalScrollRef}
                  onScroll={() => handleInfiniteScroll(modalScrollRef)}
                  className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full h-full items-center"
                >
                  {[...activeProject.gallery, ...activeProject.gallery, ...activeProject.gallery].map((src: string, i: number) => (
                    <div key={i} className="flex-none w-full h-[70vh] md:h-[85vh] snap-center flex items-center justify-center px-4 md:px-20">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <MediaItem 
                          src={src} 
                          alt={`${activeProject.title} ${i + 1}`}
                          className="max-w-full max-h-full object-contain shadow-2xl border border-ivory/5"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modal Navigation Arrows */}
                <button 
                  onClick={(e) => { e.stopPropagation(); scroll('left', modalScrollRef); }}
                  className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 bg-ivory/10 hover:bg-ivory/20 backdrop-blur-sm border border-ivory/20 flex items-center justify-center text-ivory transition-all duration-500 z-20 rounded-full"
                >
                  <ChevronLeft size={20} className="md:w-6 md:h-6" strokeWidth={1} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); scroll('right', modalScrollRef); }}
                  className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 bg-ivory/10 hover:bg-ivory/20 backdrop-blur-sm border border-ivory/20 flex items-center justify-center text-ivory transition-all duration-500 z-20 rounded-full"
                >
                  <ChevronRight size={20} className="md:w-6 md:h-6" strokeWidth={1} />
                </button>
                
                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4">
                  {activeProject.gallery.map((_: any, i: number) => (
                    <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-ivory/30"></div>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-10 text-center">
                <p className="text-ivory/60 text-xs md:text-sm max-w-2xl mx-auto font-light italic">
                  Гортайте, щоб переглянути всі деталі об'єкта. Кожен ракурс розкриває нові нюанси фактури при різному освітленні.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
