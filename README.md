# 🕐 Digital Clock - Multiple Time Zones

A beautiful, interactive digital clock application that displays the current time across multiple time zones with a modern UI.

## ✨ Features

- 🌍 **Multiple Time Zones** - Display time in different cities worldwide
- 🔄 **Real-time Updates** - Clock updates every second
- 12/24 Hour Format - Toggle between 12-hour and 24-hour time display
- 🔍 **Search** - Quickly search for specific time zones
- ➕ **Add Custom Zones** - Add any time zone from the list
- 🗑️ **Remove Zones** - Remove time zones you don't need
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 🌐 **UTC Offset Display** - Shows offset from UTC for each zone

## 🚀 Quick Start

### Option 1: Direct in Browser
1. Clone the repository
2. Open `index.html` in your web browser
3. That's it! The clock will start running

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

## 📖 How to Use

### View Current Time
The main clock at the top shows your local time with the date.

### View Multiple Time Zones
The grid below displays clocks for different time zones. By default, it includes:
- New York (America/New_York)
- London (Europe/London)
- Tokyo (Asia/Tokyo)
- Sydney (Australia/Sydney)
- Dubai (Asia/Dubai)
- Singapore (Asia/Singapore)

### Add a Time Zone
1. Click the **"+ Add Custom Time Zone"** button
2. Select a timezone from the dropdown
3. Click **"Add Time Zone"**
4. The new clock will appear in the grid

### Remove a Time Zone
1. Hover over any clock card
2. Click the **"×"** button in the top-right corner
3. The clock will be removed

### Search Time Zones
1. Use the search box at the top
2. Type the name of a city or timezone
3. The clocks will filter in real-time

### Toggle Time Format
- Click **"12 Hour"** or **"24 Hour"** button to change the time display format
- All clocks update instantly

## 🎨 Customization

### Add Default Time Zones
Edit the `DEFAULT_TIMEZONES` array in `script.js`:

```javascript
const DEFAULT_TIMEZONES = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    // Add more here
];
```

### Change Colors
Edit the CSS variables in `styles.css`:
```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Available Time Zones
The app includes these common time zones:

**Americas:**
- America/New_York
- America/Chicago
- America/Denver
- America/Los_Angeles
- America/Toronto
- America/Mexico_City
- America/Buenos_Aires
- America/Sao_Paulo

**Europe:**
- Europe/London
- Europe/Paris
- Europe/Berlin
- Europe/Moscow

**Asia:**
- Asia/Dubai
- Asia/Kolkata
- Asia/Bangkok
- Asia/Singapore
- Asia/Hong_Kong
- Asia/Tokyo
- Asia/Seoul

**Africa:**
- Africa/Cairo
- Africa/Johannesburg

**Australia & Pacific:**
- Australia/Sydney
- Australia/Melbourne
- Australia/Brisbane
- Pacific/Auckland
- Pacific/Honolulu

**UTC:**
- UTC

## 📁 Project Structure

```
digital-clock-timezones/
├── index.html      # Main HTML file
├── styles.css      # Styling and animations
├── script.js       # JavaScript functionality
├── package.json    # Project metadata
└── README.md       # This file
```

## 🔧 Technical Details

- **Pure JavaScript** - No frameworks required
- **Intl API** - Uses JavaScript's Internationalization API for accurate timezone handling
- **CSS Grid** - Responsive grid layout
- **No Dependencies** - Runs entirely in the browser
- **Local Storage Ready** - Can be extended to save preferences

## 🌐 Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with ES6 support

## 💡 Future Enhancements

- [ ] Save favorite time zones to localStorage
- [ ] Dark mode toggle
- [ ] Analog clock display
- [ ] Time zone comparison (show differences)
- [ ] Alarm functionality
- [ ] Meeting planner across time zones
- [ ] Sunrise/sunset times
- [ ] Weather integration

## 📝 License

MIT License - Feel free to use this project however you like!

## 👤 Author

Created with ❤️ by Ethan Volmin

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📞 Support

If you encounter any issues, please open an issue on GitHub.

---

**Enjoy tracking time across the world!** 🌍🕐
