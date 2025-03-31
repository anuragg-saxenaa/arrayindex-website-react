import React from 'react';

const Tools: React.FC = () => {
  const tools = [
    {
      title: "Spring Boot",
      description: "Enterprise-grade framework for building Java applications",
      image: "/assets/img/springboot.png",
      link: "https://spring.io/projects/spring-boot"
    },
    {
      title: "Kubernetes",
      description: "Container orchestration platform for scalable applications",
      image: "/assets/img/kubernetes.jpg",
      link: "https://kubernetes.io"
    },
    {
      title: "GraphQL",
      description: "Query language for your API",
      image: "/assets/img/graphql.jpg",
      link: "https://graphql.org"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
              Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">Tools</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12">
              Explore our tech stack and development tools.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <a
              key={index}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden bg-white/5 p-8 flex items-center justify-center">
                <img
                  src={tool.image}
                  alt={tool.title}
                  className="max-w-[200px] max-h-[100px] object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{tool.title}</h3>
                <p className="text-gray-400">{tool.description}</p>
              </div>
              <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
            </a>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-black to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Stack",
                description: "Using the latest technologies and frameworks",
                icon: "⚡"
              },
              {
                title: "Best Practices",
                description: "Following industry standards and patterns",
                icon: "✨"
              },
              {
                title: "Scalable",
                description: "Built for growth and high performance",
                icon: "🚀"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools; 