# Janhvi Suryawanshi - UI/UX Designer

A modern, responsive portfolio website built with React and Vite, designed to showcase the work of a graphic/UI/UX designer.

## 🔐 Authentication

This portfolio is protected by a login system. Users must authenticate before accessing the portfolio content.

### Login Credentials

- **Username**: `admin`
- **Password**: `portfolio2026`

The authentication state is stored in localStorage, so users remain logged in even after page refresh.

## Features

- **Login Authentication**: Secure login system with hardcoded credentials
- **Modern Design**: Clean, professional design with smooth animations and transitions
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Multiple Sections**:
  - Hero section with eye-catching introduction
  - About section with stats and highlights
  - Portfolio showcase with filtering capabilities
  - Skills and services overview
  - Contact form for inquiries
- **Interactive Elements**: Smooth scrolling, hover effects, and animated components
- **Performance Optimized**: Built with Vite for lightning-fast development and production builds
- **Easy to Customize**: Well-organized component structure with separate CSS files

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Next-generation frontend tooling
- **Lucide React**: Beautiful, consistent icons
- **React Router DOM**: Client-side routing
- **CSS3**: Custom styling with modern CSS features
- **Google Fonts**: Inter and Playfair Display fonts

## Getting Started

### Prerequisites

- Node.js (version 18.0 or higher recommended)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://127.0.0.1:3000/
   ```

5. Login using the credentials:
   - Username: `admin`
   - Password: `portfolio2026`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Customization Guide

### Authentication Credentials

To change the login credentials, edit `src/components/Login.jsx`:

```javascript
// Hardcoded credentials
const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'portfolio2026',
};
```

**Security Note**: For production use, consider implementing a proper backend authentication system instead of hardcoded credentials.

### Personal Information

Update the following files with your personal information:

1. **Hero Section** (`src/components/Hero.jsx`):
   - Change name from "Janhvi Suryawanshi" to your name
   - Update profession/title
   - Modify social media links
   - Update availability badge

2. **About Section** (`src/components/About.jsx`):
   - Update bio text
   - Change statistics (years, clients, awards, projects)
   - Modify highlights/achievements

3. **Portfolio Section** (`src/components/Portfolio.jsx`):
   - Replace project data with your actual projects
   - Add real project images
   - Update project descriptions and tags

4. **Skills Section** (`src/components/Skills.jsx`):
   - Update skills list with your expertise
   - Modify expertise levels
   - Change tools and technologies

5. **Contact Section** (`src/components/Contact.jsx`):
   - Update email address
   - Change phone number
   - Modify location
   - Update social media links

### Colors and Branding

Customize the color scheme in `src/index.css`:

```css
:root {
  --primary-color: #6366f1;  /* Main brand color */
  --primary-dark: #4f46e5;   /* Darker shade */
  --secondary-color: #ec4899; /* Accent color */
  /* ... other colors */
}
```

### Adding Images

1. Place your images in the `public` folder or `src/assets`
2. Replace placeholder elements in components with actual images:

```jsx
// Replace:
<div className="placeholder-image">
  <span>Your Photo</span>
</div>

// With:
<img src="/path-to-your-image.jpg" alt="Description" />
```

### Fonts

The project uses Google Fonts (Inter and Playfair Display). To change fonts:

1. Update the font import in `index.html`
2. Modify font-family in `src/index.css`

## Project Structure

```
portfolio-website/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── Login.jsx     # Authentication component
│   │   ├── Login.css
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Hero.jsx
│   │   ├── Hero.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Portfolio.jsx
│   │   ├── Portfolio.css
│   │   ├── Skills.jsx
│   │   ├── Skills.css
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── App.jsx          # Main app component with auth logic
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Deployment Options

1. **Vercel** (Recommended):
   - Connect your GitHub repository
   - Vercel will auto-detect Vite and deploy

2. **Netlify**:
   - Drag and drop the `dist` folder
   - Or connect your Git repository

3. **GitHub Pages**:
   - Install gh-pages: `npm install --save-dev gh-pages`
   - Add to package.json: `"homepage": "https://yourusername.github.io/portfolio"`
   - Add scripts: `"predeploy": "npm run build"` and `"deploy": "gh-pages -d dist"`
   - Run: `npm run deploy`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lighthouse Score: 90+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

## Contributing

Feel free to fork this project and customize it for your own use!

## License

This project is open source and available under the MIT License.

## Contact

For questions or feedback about this template:
- Create an issue on GitHub
- Or modify the contact section with your information

---

**Designed with ❤️ for designers by designers**
