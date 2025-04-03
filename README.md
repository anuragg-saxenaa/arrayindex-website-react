# ArrayIndex Website

A modern, responsive website for ArrayIndex built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🔒 Type-safe with TypeScript
- 🎭 Smooth animations with Framer Motion
- 📧 Contact form integration
- 🗺️ Interactive map integration
- 🎯 SEO optimized

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Framer Motion
- React Router
- EmailJS
- Express (for production)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker (optional, for containerized deployment)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/anuragg-saxenaa/arrayindex-website-react.git
   cd arrayindex-website-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Docker Development

1. Build the Docker image:
   ```bash
   docker build -t arrayindex-website .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 arrayindex-website
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Docker Deployment on Render

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Select "Docker" as the environment
5. Render will automatically detect the `Dockerfile` and `render.yaml`

The application is configured to run in a Docker container with:
- Multi-stage build for optimized image size
- Production-ready Express server
- Static file serving
- Proper error handling
- Health checks

## Project Structure

```
arrayindex-website-react/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API and service integrations
│   ├── styles/        # Global styles and Tailwind config
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
├── Dockerfile         # Docker configuration
└── render.yaml        # Render deployment configuration
```

## Features in Detail

### Interactive Sections
- Hero section with animated elements
- Services showcase with hover effects
- Portfolio gallery with image loading states
- About section with company information
- Development tools section
- Contact form with real-time validation

### Development Tools
- JSON Formatter: Format and validate JSON data
- YAML Formatter: Format and validate YAML data
- Calculator: Evaluate mathematical expressions
- Base64 Converter: Encode and decode Base64 strings

### Coming Soon
- Regex Tester
- Color Picker
- Hash Generator

### Contact Information
- Headquarters: 3191 Sorrento Crescent, Burlington, ON L7M 0N2, Canada
- Phone: +1 (555) 123-4567
- Email: contact@arrayindex.com

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from modern web trends
- Icons from Heroicons
- Animations using CSS keyframes
- Glass-morphism effects using Tailwind CSS 