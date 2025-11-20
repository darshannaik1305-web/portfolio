# FormHub - Modern Web Forms Collection

A comprehensive collection of beautifully designed, accessible web forms with real-time validation, dark/light theme support, and responsive design. Built with vanilla HTML, CSS, and JavaScript for maximum compatibility and performance.

## ✨ Features

- **🎨 Modern Design** - Clean, professional UI with glassmorphism effects
- **🌙 Dark/Light Theme** - Seamless theme switching with localStorage persistence
- **📱 Mobile Responsive** - Optimized for all screen sizes and devices
- **♿ Accessible** - WCAG compliant with proper ARIA labels and semantic HTML
- **⚡ Real-time Validation** - Instant feedback with custom error messages
- **🔒 No Dependencies** - Pure HTML/CSS/JS, zero build tools required
- **🚀 Performance Optimized** - Lightweight and fast loading

## 📋 Available Forms

| Form | Description | Key Features |
|------|-------------|--------------|
| **Registration** | User account creation | Password strength indicator, email validation |
| **Login** | Secure authentication | Remember me, password recovery |
| **Contact** | Feedback and inquiries | Character counter, file attachments |
| **Survey** | User experience ratings | Star ratings, category selection |
| **Newsletter** | Email subscription | Topic preferences, consent management |
| **Booking** | Appointment scheduling | Date/time picker, participant selection |

## 🚀 Quick Start

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **Explore** the forms by clicking on any card

No installation, build process, or server required - everything works directly in the browser!

## 📁 Project Structure

```
forms-2/
├── index.html          # Main landing page with form overview
├── registration.html   # User registration form
├── login.html          # Login authentication form
├── contact.html        # Contact and feedback form
├── survey.html         # User survey form
├── newsletter.html     # Newsletter subscription form
├── booking.html        # Appointment booking form
├── styles.css          # Complete styling with theme support
├── script.js           # Interactive functionality and validation
├── index-icons.svg     # SVG icons and assets
└── README.md           # This documentation file
```

## 🎨 Customization

### Colors & Theme
Edit the CSS variables in `styles.css`:

```css
:root {
  --primary: #6ea8fe;      /* Primary accent color */
  --success: #22c55e;      /* Success state color */
  --error: #ef4444;        /* Error state color */
  --bg: #0b0c10;           /* Background color (dark) */
  --card: #12131a;         /* Card background (dark) */
  --text: #e6e6e6;         /* Text color (dark) */
}
```

### Form Validation
Forms use HTML5 validation with custom JavaScript enhancements. Modify validation rules in `script.js`:

```javascript
function attachValidation(form) {
  // Add custom validation logic here
  form.addEventListener('input', (e) => {
    // Your validation code
  });
}
```

### Adding New Forms
1. Create a new HTML file (e.g., `my-form.html`)
2. Follow the existing form structure with proper semantic HTML
3. Add form card to `index.html`
4. Include link in the navigation menu

## 🔧 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Android Chrome)

## 🌐 Features Deep Dive

### Theme System
- Automatic theme detection based on system preferences
- Manual toggle with smooth transitions
- Persistent storage using localStorage
- CSS custom properties for easy customization

### Form Validation
- Real-time validation feedback
- Custom error messages
- Submit button state management
- Accessibility-friendly error reporting

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface elements
- Optimized typography scaling

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
- Keep it simple - no external dependencies
- Maintain accessibility standards
- Ensure mobile responsiveness
- Test across different browsers
- Follow existing code style

## 📞 Support

If you have any questions or need help implementing these forms, feel free to:
- Open an issue on GitHub
- Send an email to hello@example.com
- Check the documentation in the code comments

---

**Made with ❤️ for the web development community**
