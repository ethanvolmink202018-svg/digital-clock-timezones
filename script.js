// Default time zones
const DEFAULT_TIMEZONES = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
];

let displayedTimezones = [...DEFAULT_TIMEZONES];
let is24HourFormat = false;
let allTimezones = [];

// Initialize app
function init() {
    loadTimezones();
    populateTimezoneSelect();
    setupEventListeners();
    updateClocks();
    setInterval(updateClocks, 1000);
}

// Load all available timezones
function loadTimezones() {
    const timezones = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Get common timezones
    const commonTimezones = [
        'UTC',
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'America/Anchorage',
        'Pacific/Honolulu',
        'Europe/London',
        'Europe/Paris',
        'Europe/Berlin',
        'Europe/Moscow',
        'Asia/Dubai',
        'Asia/Kolkata',
        'Asia/Bangkok',
        'Asia/Singapore',
        'Asia/Hong_Kong',
        'Asia/Tokyo',
        'Asia/Seoul',
        'Australia/Sydney',
        'Australia/Melbourne',
        'Australia/Brisbane',
        'Pacific/Auckland',
        'Africa/Cairo',
        'Africa/Johannesburg',
        'America/Toronto',
        'America/Mexico_City',
        'America/Buenos_Aires',
        'America/Sao_Paulo',
    ];
    allTimezones = commonTimezones;
}

// Populate timezone select dropdown
function populateTimezoneSelect() {
    const select = document.getElementById('timezoneSelect');
    select.innerHTML = '';
    
    allTimezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = tz.replace(/_/g, ' ');
        select.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Time format toggle
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            is24HourFormat = this.dataset.format === '24';
            updateClocks();
        });
    });

    // Add timezone button
    document.getElementById('addTimezoneBtn').addEventListener('click', openModal);

    // Confirm add timezone
    document.getElementById('confirmAddTimezone').addEventListener('click', addTimezone);

    // Close modal
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('timezoneModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Search timezones
    document.getElementById('timezoneSearch').addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.clock-card');
        
        cards.forEach(card => {
            const timezone = card.querySelector('.clock-timezone').textContent.toLowerCase();
            const city = card.querySelector('.clock-city').textContent.toLowerCase();
            const isMatch = timezone.includes(query) || city.includes(query);
            card.style.display = isMatch ? 'block' : 'none';
        });
    });
}

// Open modal
function openModal() {
    document.getElementById('timezoneModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('timezoneModal').style.display = 'none';
}

// Add timezone
function addTimezone() {
    const select = document.getElementById('timezoneSelect');
    const timezone = select.value;
    
    if (!timezone) return;
    
    // Check if already added
    if (displayedTimezones.some(tz => tz.timezone === timezone)) {
        alert('This timezone is already displayed!');
        return;
    }
    
    displayedTimezones.push({
        name: timezone.split('/')[1].replace(/_/g, ' '),
        timezone: timezone
    });
    
    closeModal();
    renderClocks();
}

// Remove timezone
function removeTimezone(timezone) {
    displayedTimezones = displayedTimezones.filter(tz => tz.timezone !== timezone);
    renderClocks();
}

// Format time
function formatTime(date, timezone, is24Hour) {
    const options = {
        timeZone: timezone,
        hour12: !is24Hour,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Format date
function formatDate(date, timezone) {
    const options = {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Get UTC offset
function getUTCOffset(timezone) {
    const now = new Date();
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const offsetMs = tzDate - utcDate;
    const offsetHours = offsetMs / (1000 * 60 * 60);
    const sign = offsetHours >= 0 ? '+' : '';
    return `UTC ${sign}${offsetHours.toFixed(1)}`;
}

// Update clocks
function updateClocks() {
    const now = new Date();
    
    // Update local time
    const localTime = formatTime(now, Intl.DateTimeFormat().resolvedOptions().timeZone, is24Hour);
    const localDate = formatDate(now, Intl.DateTimeFormat().resolvedOptions().timeZone);
    
    document.getElementById('localTime').textContent = localTime;
    document.getElementById('localDate').textContent = localDate;
    
    // Update other clocks
    const grid = document.getElementById('clocksGrid');
    grid.querySelectorAll('.clock-card').forEach(card => {
        const timezone = card.dataset.timezone;
        const time = formatTime(now, timezone, is24Hour);
        const date = formatDate(now, timezone);
        const offset = getUTCOffset(timezone);
        
        card.querySelector('.clock-time').textContent = time;
        card.querySelector('.clock-date').textContent = date;
        card.querySelector('.clock-offset').textContent = offset;
    });
}

// Render clocks
function renderClocks() {
    const grid = document.getElementById('clocksGrid');
    grid.innerHTML = '';
    
    if (displayedTimezones.length === 0) {
        grid.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;"><p>No time zones added yet. Click "+ Add Custom Time Zone" to get started!</p></div>';
        return;
    }
    
    displayedTimezones.forEach(tz => {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.dataset.timezone = tz.timezone;
        card.innerHTML = `
            <button class="clock-remove" onclick="removeTimezone('${tz.timezone}')">&times;</button>
            <div class="clock-timezone">${tz.timezone}</div>
            <div class="clock-city">${tz.name}</div>
            <div class="clock-time">00:00:00</div>
            <div class="clock-date">Loading...</div>
            <div class="clock-offset">UTC</div>
        `;
        grid.appendChild(card);
    });
    
    updateClocks();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
