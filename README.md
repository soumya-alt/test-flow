# Productivity Dashboard

Your site is live at https://soumya-alt.github.io/test-flow/

A beautiful and functional productivity dashboard built with React, featuring a responsive design, dark/light mode, and various widgets to help you stay organized.

## Features

- 🎨 Modern, responsive design
- 🌓 Dark/Light mode toggle
- 🎨 Customizable background themes
- 📝 To-Do List with local storage
- 📅 Calendar with event management
- 🌤️ Real-time weather information
- 📝 Notes with autosave
- 💭 Daily motivational quotes
- 📱 PWA support for offline access

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeather API key (for weather widget)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/productivity-dashboard.git
cd productivity-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OpenWeather API key:
```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Deployment to GitHub Pages

1. Create a new repository on GitHub

2. Push your code to GitHub:
```bash
git remote add origin https://github.com/yourusername/productivity-dashboard.git
git branch -M main
git push -u origin main
```

3. Deploy to GitHub Pages:
```bash
npm run deploy
# or
yarn deploy
```

4. Go to your repository settings on GitHub:
   - Navigate to "Settings" > "Pages"
   - Under "Source", select "gh-pages" branch
   - Click "Save"

Your dashboard will be available at: `https://yourusername.github.io/productivity-dashboard`

## Customization

### Adding New Backgrounds

To add new background themes, modify the `backgrounds` array in `src/components/Sidebar.jsx`:

```javascript
const backgrounds = [
  { name: 'default', label: 'Default' },
  { name: 'gradient-blue', label: 'Blue Gradient' },
  // Add your custom backgrounds here
];
```

### Adding New Widgets

1. Create a new component in the `src/components` directory
2. Import and add the component to `src/App.jsx`
3. Style your widget using the provided Tailwind CSS classes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
