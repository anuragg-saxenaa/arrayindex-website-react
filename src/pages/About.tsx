import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">ArrayIndex</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12">
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

      {/* Team Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Founder & CEO",
                image: "/assets/img/about-history.jpg"
              },
              {
                name: "Jane Smith",
                role: "Lead Developer",
                image: "/assets/img/about-philosophy.jpg"
              },
              {
                name: "Mike Johnson",
                role: "Design Lead",
                image: "/assets/img/about-winners.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="group relative">
                <div className="relative overflow-hidden rounded-xl aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                    <p className="text-gray-300">{member.role}</p>
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