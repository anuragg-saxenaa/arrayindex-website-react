import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

interface Section {
  id: string;
  title: string;
  subtitle: string;
  items: {
    title: string;
    description: string;
    icon?: string;
  }[];
}

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [isScrolling, setIsScrolling] = useState(false);
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I\'m Array, your friendly programming companion. You can ask me anything about programming, or use the default prompt "Help me with React" to get started! 🚀'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [yamlInput, setYamlInput] = useState('');
  const [yamlOutput, setYamlOutput] = useState('');
  const [calculatorInput, setCalculatorInput] = useState('');
  const [calculatorResult, setCalculatorResult] = useState('');
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');

  const sections: Section[] = [
    {
      id: 'intro',
      title: 'We create digital experiences',
      subtitle: 'Innovation & Technology',
      items: [
        {
          title: 'Digital Innovation',
          description: 'Transforming ideas into reality through cutting-edge technology.',
          icon: '🚀'
        },
        {
          title: 'Expert Solutions',
          description: 'Tailored solutions for your unique business needs.',
          icon: '💡'
        },
        {
          title: 'Future-Ready',
          description: 'Preparing your business for tomorrow\'s challenges.',
          icon: '🔮'
        }
      ]
    },
    {
      id: 'services',
      title: 'Our Services',
      subtitle: 'What We Do',
      items: [
        {
          title: 'Cloud Solutions',
          description: 'Scalable and secure cloud infrastructure.',
          icon: '☁️'
        },
        {
          title: 'AI & ML',
          description: 'Advanced AI and machine learning solutions.',
          icon: '🤖'
        },
        {
          title: 'Web Development',
          description: 'Modern web applications and platforms.',
          icon: '🌐'
        }
      ]
    },
    {
      id: 'works',
      title: 'Selected Work',
      subtitle: 'Our Portfolio',
      items: [
        {
          title: 'Enterprise Solutions',
          description: 'Large-scale business transformations.',
          icon: '🏢'
        },
        {
          title: 'Startup Projects',
          description: 'Innovative solutions for growing businesses.',
          icon: '🚀'
        },
        {
          title: 'Digital Products',
          description: 'User-centric digital experiences.',
          icon: '💻'
        }
      ]
    },
    {
      id: 'about',
      title: 'About Us',
      subtitle: 'Our Story',
      items: [
        {
          title: 'Our Mission',
          description: 'Empowering businesses through technology.',
          icon: '🎯'
        },
        {
          title: 'Our Vision',
          description: 'Leading digital transformation globally.',
          icon: '👀'
        },
        {
          title: 'Our Values',
          description: 'Innovation, quality, and client success.',
          icon: '💎'
        }
      ]
    },
    {
      id: 'tools',
      title: 'Development Tools',
      subtitle: 'Useful Utilities',
      items: [
        {
          title: 'JSON Formatter',
          description: 'Format and validate JSON data.',
          icon: '📝'
        },
        {
          title: 'YAML Formatter',
          description: 'Format and validate YAML data.',
          icon: '📋'
        },
        {
          title: 'Base64 Converter',
          description: 'Encode and decode Base64 strings.',
          icon: '🔄'
        }
      ]
    },
    {
      id: 'contact',
      title: 'Get in Touch',
      subtitle: 'Let\'s Talk',
      items: [
        {
          title: 'Start a Project',
          description: 'Begin your digital journey with us.',
          icon: '📱'
        },
        {
          title: 'Consultation',
          description: 'Get expert advice for your needs.',
          icon: '💼'
        },
        {
          title: 'Support',
          description: '24/7 technical assistance.',
          icon: '💬'
        }
      ]
    }
  ];

  const projects = [
    {
      title: "Cloud Migration Platform",
      description: "Automated cloud migration platform with intelligent workload analysis and cost optimization",
      image: "/assets/img/cloud-migration.jpg",
      tags: ["AWS", "Azure", "GCP", "Terraform"]
    },
    {
      title: "Microservices Orchestrator",
      description: "Advanced service mesh platform for distributed microservices architecture",
      image: "/assets/img/microservices.jpg",
      tags: ["Kubernetes", "Istio", "gRPC", "Prometheus"]
    },
    {
      title: "Satellite Ground Control",
      description: "Real-time satellite tracking and control system with predictive maintenance",
      image: "/assets/img/satellite-control.jpg",
      tags: ["Python", "WebSocket", "ML", "Docker"]
    },
    {
      title: "Space Mission Simulator",
      description: "3D visualization and simulation platform for space missions",
      image: "/assets/img/space-simulator.jpg",
      tags: ["Three.js", "WebGL", "Physics", "TypeScript"]
    },
    {
      title: "Aerospace Analytics",
      description: "AI-powered analytics platform for aircraft performance optimization",
      image: "/assets/img/aerospace-analytics.jpg",
      tags: ["TensorFlow", "React", "D3.js", "Python"]
    },
    {
      title: "Cloud-Native Security",
      description: "Zero-trust security platform for cloud-native applications",
      image: "/assets/img/cloud-security.jpg",
      tags: ["Zero Trust", "Kubernetes", "Istio", "OAuth"]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach((section) => {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          const sectionBottom = sectionTop + section.clientHeight;

          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            const sectionId = section.getAttribute('data-section');
            if (sectionId) {
              setActiveSection(sectionId);
            }
          }
        });

        setTimeout(() => setIsScrolling(false), 800);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("iSa7hM9dsxKoq8jYg");
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsScrolling(true);
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => setIsScrolling(false), 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await emailjs.send(
        'service_w8x77bt',
        'template_zgnpxfr',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'arrayindexio@gmail.com'
        }
      );

      console.log('EmailJS Response:', response);

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSimpleResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return 'Hello! How can I help you with your programming needs today? 💻';
    }
    
    if (lowerInput.includes('how are you')) {
      return 'I\'m doing great! Ready to help you with any programming questions or challenges you have. ⚡';
    }
    
    if (lowerInput.includes('help')) {
      return 'I can help you with:\n- Programming questions\n- Code debugging\n- Best practices\n- Technical concepts\nWhat would you like to know? 🤖';
    }
    
    if (lowerInput.includes('bye') || lowerInput.includes('goodbye')) {
      return 'Goodbye! Feel free to come back if you have more questions. Happy coding! 👋';
    }
    
    if (lowerInput.includes('joke')) {
      const jokes = [
        'Why do programmers prefer dark mode? Because light attracts bugs! 🪲',
        'Why did the developer go broke? Because he used up all his cache! 💰',
        'What do you call a programmer from Finland? Nerdic! 🇫🇮',
        'Why do programmers hate nature? It has too many bugs! 🐛',
        'What did the Java code say to the C code? You\'ve got no class! 🎓'
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    return 'I\'m not sure about that. Could you rephrase your question? I\'m here to help with programming-related topics! 💡';
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = getSimpleResponse(userMessage);
    setChatMessages(prev => [...prev, { sender: 'bot', text: response }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => ({ ...prev, [imagePath]: true }));
  };

  const handleImageError = (imagePath: string) => {
    setImageErrors(prev => ({ ...prev, [imagePath]: true }));
  };

  // Add tool functions
  const formatJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (error) {
      setJsonOutput('Invalid JSON');
    }
  };

  const formatYAML = () => {
    try {
      const lines = yamlInput.split('\n');
      let formatted = '';
      let indent = 0;
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('-')) {
          formatted += '  '.repeat(indent) + trimmed + '\n';
        } else if (trimmed.includes(':')) {
          formatted += '  '.repeat(indent) + trimmed + '\n';
          indent++;
        } else {
          formatted += '  '.repeat(indent) + trimmed + '\n';
        }
      });
      
      setYamlOutput(formatted);
    } catch (error) {
      setYamlOutput('Invalid YAML');
    }
  };

  const calculate = () => {
    try {
      const result = new Function('return ' + calculatorInput)();
      setCalculatorResult(result.toString());
    } catch (error) {
      setCalculatorResult('Invalid expression');
    }
  };

  const encodeBase64 = () => {
    try {
      const encoded = btoa(base64Input);
      setBase64Output(encoded);
    } catch (error) {
      setBase64Output('Error encoding text');
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = atob(base64Input);
      setBase64Output(decoded);
    } catch (error) {
      setBase64Output('Error decoding text');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <div className="relative h-8 w-8">
                  <img
                    src="/assets/img/logo.png"
                    alt="arrayindex"
                    className="h-8 w-auto object-contain"
                    style={{ 
                      filter: 'brightness(1) contrast(1) saturate(1)',
                      mixBlendMode: 'normal',
                      opacity: 1,
                      backgroundColor: 'transparent'
                    }}
                    onError={(e) => {
                      console.error('Error loading logo:', e);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-2xl font-bold text-white font-mono">arrayindex</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleNavClick(section.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'text-primary-color'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section data-section="intro" className="section relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-color/10 via-transparent to-transparent opacity-30"></div>
        </div>

        {/* Astronaut Image */}
        <div className="absolute right-0 lg:right-[10%] top-1/2 -translate-y-1/2 w-[90%] md:w-[60%] lg:w-[45%] xl:w-[40%] aspect-square z-0 animate-float">
          <img
            src="/assets/img/introduction-visual.png"
            alt="Astronaut in Space"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-center min-h-[calc(100vh-4rem)]">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Explore The
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500 block">
                Digital Frontier
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-xl animate-fade-in-delay">
              Your Gateway to Digital Innovation and Technological Excellence
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-primary-color to-blue-600 hover:from-primary-color/90 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-color/20"
              >
                Get Started
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white border border-white/10 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-color/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section data-section="services" className="section relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">Services</span>
            </h2>
            <p className="text-xl text-gray-400 font-mono">
              "Innovation distinguishes between a leader and a follower." - Steve Jobs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Cards */}
            {[
              {
                title: "Quantum Computing Solutions",
                description: "Harnessing the power of quantum mechanics for next-gen computing",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                quote: "The future of computing is quantum."
              },
              {
                title: "AI & Machine Learning",
                description: "Advanced AI solutions with neural networks and deep learning",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                quote: "AI is the new electricity."
              },
              {
                title: "Edge Computing",
                description: "Real-time processing at the network edge for ultra-low latency",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                quote: "The edge is where innovation happens."
              },
              {
                title: "Blockchain & Web3",
                description: "Decentralized solutions and smart contract development",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                quote: "Web3 is the future of the internet."
              },
              {
                title: "Cybersecurity",
                description: "Advanced threat detection and zero-trust security solutions",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                quote: "Security is not a product, but a process."
              },
              {
                title: "Cloud Native Solutions",
                description: "Microservices architecture and container orchestration",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
                quote: "Cloud is the foundation of digital transformation."
              }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-color/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
                  <div className="text-primary-color mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 font-mono">{service.title}</h3>
                  <p className="text-gray-400 mb-4 font-mono">{service.description}</p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-primary-color italic font-mono">"{service.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Innovation Quote */}
          <div className="mt-16 text-center">
            <p className="text-xl text-gray-400 font-mono">
              "The best way to predict the future is to create it." - Peter Drucker
            </p>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section data-section="works" className="section relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">Works</span>
            </h2>
            <p className="text-xl text-gray-400">
              Explore our cutting-edge projects and innovative solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="relative aspect-video overflow-hidden">
                  {!loadedImages[project.image] && !imageErrors[project.image] && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
                  )}
                  <img
                    src={imageErrors[project.image] ? '/assets/img/placeholder.svg' : project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      loadedImages[project.image] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(project.image)}
                    onError={() => handleImageError(project.image)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 font-mono">{project.title}</h3>
                  <p className="text-gray-400 mb-4 font-mono">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-sm bg-primary-color/20 text-primary-color rounded-full font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section data-section="about" className="section relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">arrayindex</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12 font-mono">
              We are a team of passionate developers and designers creating innovative digital solutions.
            </p>
          </div>

          {/* Values Section */}
          <div className="py-16 bg-gradient-to-b from-black to-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description: "We push the boundaries of what's possible in technology.",
                  icon: "🚀"
                },
                {
                  title: "Quality",
                  description: "We deliver excellence in every line of code.",
                  icon: "✨"
                },
                {
                  title: "Collaboration",
                  description: "We work together to achieve extraordinary results.",
                  icon: "🤝"
                }
              ].map((value, index) => (
                <div key={index} className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Innovation Showcase Section */}
          <div className="py-16">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">innovation hub</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI & Machine Learning",
                  description: "Pioneering AI solutions with advanced algorithms and neural networks",
                  icon: "🤖",
                  stats: "95%",
                  statLabel: "Accuracy Rate"
                },
                {
                  title: "Cloud Architecture",
                  description: "Building scalable cloud solutions with microservices architecture",
                  icon: "☁️",
                  stats: "99.9%",
                  statLabel: "Uptime"
                },
                {
                  title: "Blockchain Integration",
                  description: "Implementing secure blockchain solutions for enterprise clients",
                  icon: "⛓️",
                  stats: "100%",
                  statLabel: "Security"
                }
              ].map((item, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-color/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 mb-4">{item.description}</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-primary-color">{item.stats}</span>
                      <span className="ml-2 text-gray-400">{item.statLabel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack Section */}
          <div className="py-16 bg-gradient-to-b from-black to-gray-900">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">our tech stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "React", icon: "⚛️" },
                { name: "Node.js", icon: "🟢" },
                { name: "Python", icon: "🐍" },
                { name: "Java", icon: "☕" },
                { name: "Spring Boot", icon: "🌱" },
                { name: "Rust", icon: "🦀" },
                { name: "AWS", icon: "☁️" },
                { name: "Docker", icon: "🐳" },
                { name: "Kubernetes", icon: "⚙️" },
                { name: "GraphQL", icon: "📊" },
                { name: "MongoDB", icon: "🍃" }
              ].map((tech, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <span className="text-4xl mb-2">{tech.icon}</span>
                  <span className="text-white font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud Providers Section */}
          <div className="py-16">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">cloud expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "AWS",
                  description: "Amazon Web Services - Cloud infrastructure and services",
                  icon: "☁️",
                  features: ["EC2", "S3", "Lambda", "RDS"]
                },
                {
                  name: "Azure",
                  description: "Microsoft Azure - Enterprise cloud solutions",
                  icon: "🌤️",
                  features: ["App Services", "Azure SQL", "Functions", "AKS"]
                },
                {
                  name: "GCP",
                  description: "Google Cloud Platform - Scalable cloud infrastructure",
                  icon: "🌥️",
                  features: ["Compute Engine", "Cloud Storage", "Cloud Functions", "GKE"]
                }
              ].map((cloud, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-color/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
                    <div className="text-4xl mb-4">{cloud.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{cloud.name}</h3>
                    <p className="text-gray-400 mb-4">{cloud.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {cloud.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1 text-sm bg-primary-color/20 text-primary-color rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI & ML Section */}
          <div className="py-16 bg-gradient-to-b from-black to-gray-900">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">ai & machine learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Agents",
                  description: "Building intelligent agents for automation and decision-making",
                  icon: "🤖",
                  features: ["Natural Language Processing", "Computer Vision", "Reinforcement Learning"]
                },
                {
                  title: "Machine Learning",
                  description: "Advanced ML models and predictive analytics",
                  icon: "🧠",
                  features: ["Deep Learning", "Neural Networks", "Transfer Learning"]
                },
                {
                  title: "MCP Systems",
                  description: "Multi-agent Control and Planning systems",
                  icon: "🎯",
                  features: ["Distributed Control", "Task Planning", "Resource Optimization"]
                }
              ].map((ai, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-color/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
                    <div className="text-4xl mb-4">{ai.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{ai.title}</h3>
                    <p className="text-gray-400 mb-4">{ai.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {ai.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1 text-sm bg-primary-color/20 text-primary-color rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Java Section */}
          <div className="py-16">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">advanced java technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Spring Ecosystem",
                  description: "Enterprise-grade Spring applications and microservices",
                  icon: "🌱",
                  features: ["Spring Boot", "Spring Cloud", "Spring Security", "Spring Data"]
                },
                {
                  title: "Reactive Programming",
                  description: "Non-blocking, event-driven applications",
                  icon: "⚡",
                  features: ["Project Reactor", "WebFlux", "RSocket", "Reactive Streams"]
                },
                {
                  title: "Enterprise Java",
                  description: "Robust enterprise solutions and architectures",
                  icon: "🏢",
                  features: ["JPA/Hibernate", "EJB", "JMS", "Java EE"]
                }
              ].map((java, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-color/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
                    <div className="text-4xl mb-4">{java.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{java.title}</h3>
                    <p className="text-gray-400 mb-4">{java.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {java.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1 text-sm bg-primary-color/20 text-primary-color rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section data-section="tools" className="section relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">Tools</span>
            </h2>
            <p className="text-xl text-gray-400 font-mono">
              Useful utilities for developers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* JSON Formatter */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 font-mono">JSON Formatter</h2>
              <div className="space-y-4">
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full h-40 bg-black border border-white/10 rounded-lg p-4 text-white font-mono"
                  placeholder="Paste your JSON here..."
                />
                <button
                  onClick={formatJSON}
                  className="px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-color/90 transition-colors font-mono"
                >
                  Format JSON
                </button>
                <textarea
                  value={jsonOutput}
                  readOnly
                  className="w-full h-40 bg-black border border-white/10 rounded-lg p-4 text-white font-mono"
                />
              </div>
            </div>

            {/* YAML Formatter */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 font-mono">YAML Formatter</h2>
              <div className="space-y-4">
                <textarea
                  value={yamlInput}
                  onChange={(e) => setYamlInput(e.target.value)}
                  className="w-full h-40 bg-black border border-white/10 rounded-lg p-4 text-white font-mono"
                  placeholder="Paste your YAML here..."
                />
                <button
                  onClick={formatYAML}
                  className="px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-color/90 transition-colors font-mono"
                >
                  Format YAML
                </button>
                <textarea
                  value={yamlOutput}
                  readOnly
                  className="w-full h-40 bg-black border border-white/10 rounded-lg p-4 text-white font-mono"
                />
              </div>
            </div>

            {/* Calculator */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 font-mono">Calculator</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={calculatorInput}
                  onChange={(e) => setCalculatorInput(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg p-4 text-white font-mono"
                  placeholder="Enter mathematical expression..."
                />
                <button
                  onClick={calculate}
                  className="px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-color/90 transition-colors font-mono"
                >
                  Calculate
                </button>
                <div className="bg-black border border-white/10 rounded-lg p-4 text-white font-mono">
                  Result: {calculatorResult}
                </div>
              </div>
            </div>

            {/* Base64 Converter */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 font-mono">Base64 Converter</h2>
              <div className="space-y-4">
                <textarea
                  value={base64Input}
                  onChange={(e) => setBase64Input(e.target.value)}
                  className="w-full h-40 bg-black border border-white/10 rounded-lg p-4 text-white font-mono"
                  placeholder="Enter text to encode/decode..."
                />
                <div className="flex space-x-4">
                  <button 
                    onClick={encodeBase64}
                    className="px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-color/90 transition-colors font-mono"
                  >
                    Encode
                  </button>
                  <button 
                    onClick={decodeBase64}
                    className="px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-color/90 transition-colors font-mono"
                  >
                    Decode
                  </button>
                </div>
                <textarea
                  value={base64Output}
                  readOnly
                  className="w-full h-40 bg-black border border-white/10 rounded-lg p-4 text-white font-mono"
                  placeholder="Result will appear here..."
                />
              </div>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-12 text-center font-mono">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Regex Tester",
                  description: "Test and validate regular expressions",
                  icon: "🔍"
                },
                {
                  title: "Color Picker",
                  description: "Convert between different color formats",
                  icon: "🎨"
                },
                {
                  title: "Hash Generator",
                  description: "Generate various types of hashes",
                  icon: "🔐"
                }
              ].map((tool, index) => (
                <div key={index} className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2 font-mono">{tool.title}</h3>
                  <p className="text-gray-400 font-mono">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section data-section="contact" className="section relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-400">
              Let's Talk
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-black border border-white/10 rounded-lg p-4 text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-black border border-white/10 rounded-lg p-4 text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full bg-black border border-white/10 rounded-lg p-4 text-white font-mono"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 bg-primary-color text-white rounded-lg hover:bg-primary-color/90 transition-colors font-mono ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-500 text-sm font-mono">Thank you! Your message has been sent successfully. We'll get back to you soon! ✨</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>

            {/* Contact Info and Chatbot */}
            <div className="space-y-8">
              {/* Headquarters */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
                <h3 className="text-xl font-semibold text-white mb-4 font-mono">Our Headquarters</h3>
                <div className="space-y-4 text-gray-400 font-mono">
                  <p>3191 Sorrento Crescent</p>
                  <p>Burlington, ON L7M 0N2</p>
                  <p>Canada</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Email: contact@arrayindex.com</p>
                </div>
                {/* Social Media Icons */}
                <div className="mt-6 flex space-x-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-color transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-color transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-color transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-color transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Chatbot */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
                <h3 className="text-xl font-semibold text-white mb-4 font-mono">Chat with Array 🚀</h3>
                <p className="text-gray-400 mb-4 font-mono">Your friendly programming companion</p>
                <div className="space-y-4 chat-container">
                  <div className="h-64 overflow-y-auto bg-black/40 rounded-lg p-4 mb-4 scrollbar-thin scrollbar-thumb-primary-color scrollbar-track-transparent">
                    <div className="space-y-4">
                      {chatMessages.map((message, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-primary-color/20 flex items-center justify-center">
                              <span className="text-primary-color">
                                {message.sender === 'bot' ? 'A' : 'U'}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-mono whitespace-pre-line">{message.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Tell me a programmer joke!"
                        className="w-full bg-black border border-white/10 rounded-lg p-4 text-white font-mono"
                      />
                    </div>
                    <button
                      onClick={sendMessage}
                      className="px-6 py-3 bg-primary-color text-white rounded-lg hover:bg-primary-color/90 transition-colors font-mono"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Add these animations to your CSS/Tailwind config
const styles = `
@keyframes float {
  0%, 100% { transform: translateY(-50%) translateX(0); }
  50% { transform: translateY(-53%) translateX(-10px); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fade-in 1s ease-out 0.3s forwards;
  opacity: 0;
}

.animate-fade-in-delay-2 {
  animation: fade-in 1s ease-out 0.6s forwards;
  opacity: 0;
}

/* Custom scrollbar styles */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #00ff9d;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: #00cc7d;
}

/* Prevent page scroll when chat container is focused */
.chat-container:focus-within {
  overflow: hidden;
}
`;

export default Home; 