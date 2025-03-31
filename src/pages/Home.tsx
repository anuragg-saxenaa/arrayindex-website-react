import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [isScrolling, setIsScrolling] = useState(false);

  const sections: Section[] = [
    {
      id: 'intro',
      title: 'We create digital experiences',
      subtitle: 'Innovation & Technology',
      items: [
        {
          title: 'Digital Transformation',
          description: 'We help businesses evolve through cutting-edge technology solutions.',
          icon: '🚀'
        },
        {
          title: 'Cloud Solutions',
          description: 'Scalable and secure cloud infrastructure for modern enterprises.',
          icon: '☁️'
        },
        {
          title: 'AI & Machine Learning',
          description: 'Leveraging AI to drive business growth and innovation.',
          icon: '🤖'
        }
      ]
    },
    {
      id: 'services',
      title: 'Our Services',
      subtitle: 'What We Do',
      items: [
        {
          title: 'Microservices',
          description: 'Building scalable and maintainable service architectures.',
          icon: '⚡'
        },
        {
          title: 'Cloud Migration',
          description: 'Seamless transition to cloud infrastructure.',
          icon: '🔄'
        },
        {
          title: 'Strategic Consulting',
          description: 'Data-driven insights for business growth.',
          icon: '📊'
        }
      ]
    },
    {
      id: 'works',
      title: 'Selected Work',
      subtitle: 'Our Portfolio',
      items: [
        {
          title: 'Victory',
          description: 'A revolutionary gaming platform.',
          icon: '🎮'
        },
        {
          title: 'Service Mesh',
          description: 'Enterprise-grade service mesh solution.',
          icon: '🔗'
        },
        {
          title: 'Alex Nowak',
          description: 'Personal portfolio website.',
          icon: '👤'
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
          description: 'To deliver exceptional digital experiences.',
          icon: '🎯'
        },
        {
          title: 'Our Vision',
          description: 'To be the leading digital transformation partner.',
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
      id: 'contact',
      title: 'Get in Touch',
      subtitle: 'Let\'s Talk',
      items: [
        {
          title: 'App Design',
          description: 'Start your project with us.',
          icon: '📱'
        },
        {
          title: 'Consulting',
          description: 'Get expert advice.',
          icon: '💼'
        },
        {
          title: 'Freelance',
          description: 'Flexible solutions.',
          icon: '💻'
        }
      ]
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

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsScrolling(true);
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => setIsScrolling(false), 800);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
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
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-primary-color to-blue-600 hover:from-primary-color/90 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-color/20"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white border border-white/10 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-color/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-400">
              Comprehensive solutions for your digital needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Cards */}
            {[
              {
                title: "Web Development",
                description: "Custom web applications built with cutting-edge technologies",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Mobile Apps",
                description: "Native and cross-platform mobile applications",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Cloud Solutions",
                description: "Scalable cloud infrastructure and deployment",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-color/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
                  <div className="text-primary-color mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
`;

export default Home; 