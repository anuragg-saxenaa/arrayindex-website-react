import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setIsVisible(true);
    // Initialize EmailJS with your public key
    emailjs.init("iSa7hM9dsxKoq8jYg");
  }, []);

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
          subject: formData.subject,
          message: formData.message,
          to_email: 'arrayindexio@gmail.com'
        }
      );

      console.log('EmailJS Response:', response);

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className={`relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 font-mono">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">Touch</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12 font-mono">
              Have a project in mind? Let's work together.
            </p>
          </div>
        </div>
      </div>

      {/* Company Address Section */}
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 transition-all duration-1000 delay-200 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-black/90 rounded-2xl p-8 border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4 font-mono">Company Headquarters</h2>
            <p className="text-gray-300 font-mono">
              3191 Sorrento Crescent<br />
              Burlington, ON L7M 0N2
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 transition-all duration-1000 delay-300 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-black/90 rounded-2xl p-8 border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all duration-300 font-mono"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all duration-300 font-mono"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all duration-300 font-mono"
                placeholder="Project inquiry"
                required
              />
            </div>
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all duration-300 font-mono"
                placeholder="Tell us about your project..."
                required
              />
            </div>
            <div className="flex flex-col items-end space-y-4">
              {submitStatus === 'success' && (
                <p className="text-green-500 font-mono">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 font-mono">Failed to send message. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-primary-color text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 font-mono ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-color/90'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 