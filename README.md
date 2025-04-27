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
- 🔐 Secure admin authentication
- 🧾 Admin Invoice Generator (PDF, CSV, HTML export)
- 🐳 Docker & Render deployment ready

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

### Environment Variables

Create a `.env` file in the root directory with the following variables for admin authentication:

```
VITE_ADMIN_EMAIL=your-admin-email@example.com
VITE_ADMIN_PASSWORD=your-secure-password
```

For production deployment on Render, set these as environment variables in your Render dashboard.

**Default Credentials (for local/dev):**
- Email: `admin@arrayindex.com`
- Password: `admin123`

> ⚠️ Change these credentials in production for security.

## Invoice Generator (Admin Only)

- Access via the admin dashboard after logging in
- Generate invoices with hours, rates, HST (13%)
- Export as PDF, CSV, or HTML
- Works in all environments (including Docker)

## Static Asset Handling in Docker

- All static assets (including logo) are now reliably served in Docker and production
- If you add new images, place them in `public/assets/img` and (if needed) also in `public/img` for direct access
- The Express server is configured to serve both `/dist` and `/public` folders

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
- Static file serving from `/dist` and `/public`
- Proper error handling
- Health checks

## Project Structure

```
arrayindex-website-react/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/       # Context providers (authentication, etc.)
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

## Admin Authentication

### Overview
The website includes a secure admin panel that requires authentication. The admin credentials are configurable via environment variables for enhanced security.

### Accessing Admin Features
- Admin Login: `/admin/login`
- Admin Dashboard: `/admin` (requires authentication)

### Configuration
Set the following environment variables to configure admin access:
- `VITE_ADMIN_EMAIL`: Admin login email
- `VITE_ADMIN_PASSWORD`: Admin login password

### Security Notes
- Never hardcode admin credentials in your code
- Change default credentials immediately in production
- Use strong, unique passwords
- Consider implementing additional security measures like rate limiting in production

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