import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">arrayindex</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12 font-mono">
              We are a team of passionate developers and designers creating innovative digital solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
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
      </div>

      {/* Innovation Showcase Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
      </div>

      {/* Technology Stack Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
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
      </div>

      {/* Cloud Providers Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
      </div>

      {/* AI & ML Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
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
      </div>

      {/* Advanced Java Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
    </div>
  );
};

export default About; 