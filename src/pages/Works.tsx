import React, { useState } from 'react';

const Works: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

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

  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => ({ ...prev, [imagePath]: true }));
  };

  const handleImageError = (imagePath: string) => {
    setImageErrors(prev => ({ ...prev, [imagePath]: true }));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 font-mono">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">Works</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12 font-mono">
              Explore our cutting-edge projects and innovative solutions.
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
    </div>
  );
};

export default Works; 