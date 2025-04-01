import React, { useState } from 'react';

const Tools: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [yamlInput, setYamlInput] = useState('');
  const [yamlOutput, setYamlOutput] = useState('');
  const [calculatorInput, setCalculatorInput] = useState('');
  const [calculatorResult, setCalculatorResult] = useState('');
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      // Simple YAML formatting (you might want to use a proper YAML parser)
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
      // Using Function constructor for safe evaluation
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

  const getSimpleResponse = (input: string): string => {
    const input_lower = input.toLowerCase();
    
    // Simple response rules
    if (input_lower.includes('hello') || input_lower.includes('hi')) {
      return "Hello! I'm Array, your friendly chat companion! How can I help you today? 🚀";
    }
    if (input_lower.includes('how are you')) {
      return "I'm doing great, thanks for asking! As Array, I'm always ready to help! 💻";
    }
    if (input_lower.includes('help')) {
      return "As Array, I'd love to help! I can chat about programming, tell jokes, or just keep you company. What interests you? ⚡";
    }
    if (input_lower.includes('bye') || input_lower.includes('goodbye')) {
      return "Goodbye! Array will be here when you want to chat again! Take care! 🚀";
    }
    if (input_lower.includes('thank')) {
      return "You're welcome! Array is always happy to help! Let me know if you need anything else! 💻";
    }
    if (input_lower.includes('weather')) {
      return "As Array, I'm more interested in code than weather! But I hope you have a great day! ⚡";
    }
    if (input_lower.includes('name')) {
      return "I'm Array, your friendly chat companion! I love helping with programming and chatting with developers! 🚀";
    }
    if (input_lower.includes('time')) {
      return "Array doesn't have a watch, but I can help you with coding! What would you like to work on? 💻";
    }
    if (input_lower.includes('joke')) {
      const jokes = [
        "Why don't programmers like nature? It has too many bugs! 🐞",
        "Why did the developer go broke? Because he used up all his cache! 💰",
        "What's a programmer's favorite place? The foo bar! 🍻",
        "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25! 🎃"
      ];
      return "Array loves programming jokes! Here's one: " + jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // Default responses
    const defaultResponses = [
      "Array's listening! Could you tell me more about that? ⚡",
      "That's interesting! Array would love to hear more details! 🚀",
      "Array's here to help! Could you be more specific? 💻",
      "Hmm, Array's not quite sure about that. Could you explain further? ⚡",
      "Array's always eager to learn! What would you like to know more about? 🚀"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user' as const, content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    try {
      // Get response from simple rule-based system
      const aiResponse = getSimpleResponse(chatInput);
      
      // Simulate network delay for more natural feeling
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add AI response to chat
      setChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 font-mono">
              Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">Tools</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12 font-mono">
              Useful utilities for developers
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
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

          {/* AI Chatbot */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4 font-mono">Chat with Array 🚀</h2>
            <p className="text-gray-400 mb-4 font-mono">Your friendly programming companion</p>
            <div className="space-y-4">
              <div className="h-96 overflow-y-auto bg-black border border-white/10 rounded-lg p-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary-color text-white'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="text-left">
                    <div className="inline-block p-3 rounded-lg bg-white/10 text-white">
                      Thinking...
                    </div>
                  </div>
                )}
              </div>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 bg-black border border-white/10 rounded-lg p-4 text-white font-mono"
                  placeholder="Type your message..."
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-color/90 transition-colors font-mono disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-gradient-to-b from-black to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
    </div>
  );
};

export default Tools; 