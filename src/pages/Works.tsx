import React from 'react';

const Works: React.FC = () => {
  const projects = [
    {
      title: "Victory Gaming Platform",
      description: "A revolutionary gaming platform built with React and Node.js",
      image: "/assets/img/work-victory.jpg",
      tags: ["React", "Node.js", "WebSocket", "MongoDB"]
    },
    {
      title: "Service Mesh Architecture",
      description: "Enterprise-grade service mesh solution for microservices",
      image: "/assets/img/service-mesh.jpg",
      tags: ["Kubernetes", "Istio", "Docker", "Go"]
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio website with stunning animations",
      image: "/assets/img/work-metiew-smith.jpg",
      tags: ["React", "Three.js", "GSAP", "Tailwind"]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">Works</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12">
              Explore our latest projects and innovative solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm bg-primary-color/20 text-primary-color rounded-full"
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
    </div>
  );
};

export default Works; 