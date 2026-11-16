# 🪐 LifeOS — Personal Life Dashboard

> **One aesthetic dashboard to manage your everyday life, studies, habits, and goals.**  
> Crafted specifically for today's generation of students, creators, and builders.

![LifeOS Preview](https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Core Features & Highlights

### 📋 1. Daily Planner & To-Do List
- **Categorized Tasks**: Tag tasks by `📚 Study`, `💻 Dev`, `🧘 Life`, `🏃 Health`, and `🔥 Urgent`.
- **Priority Indicators**: Color-coded badges for *High*, *Medium*, and *Low* priorities.
- **Smart Filters**: Instantly toggle between `All`, `Active`, `🔥 High Priority`, `📚 Study`, and `Completed`.
- **Time-Block Schedule View**: Toggle from the list view into an hourly daily schedule (Morning setup, Deep work blocks, Midday recharge, Evening reflection).
- **Interactive Checkmarks**: Tactile animations with sound feedback and progress percentage bar.

### ⏳ 2. Study & Productivity Timer
- **Pomodoro & Deep Work Engine**: Focus (25m), Short Break (5m), Long Break (15m), and Stopwatch mode.
- **Circular Animated Progress Dial**: Glowing SVG SVG countdown dial with session tracker.
- **Subject Tagging**: Log study time across subjects (Coding, Exam Prep, Creative, Reading, Deep Work).
- **Procedural Ambient Soundscapes (Web Audio API)**:
  - 🌧️ *Lofi Rain* (synthesized pink noise with droplet filter)
  - ☕ *Cozy Cafe* (warm brown rumble with low-frequency flutter)
  - 🌲 *Wind & Forest* (resonant modulated breeze)
  - 🧠 *40Hz Gamma Focus* (binaural beat synthesis)
  - 🌊 *Deep Ocean Waves* (periodic sinusoidal swells)
  - *Zero external MP3 dependencies—runs 100% offline!*
- **Fullscreen Zen Mode**: Press `Z` or click "Zen Mode" to enter an immersive, distraction-free environment with large glowing digits, ambient sound chips, and motivational quotes.

### ⚡ 3. Habit Tracker with Streaks
- **Streak Engine**: Real-time streak tracking (e.g. `🔥 12d streak`) and milestone achievements.
- **7-Day History Matrix**: Interactive weekly dot grid (Mon–Sun) to check off and inspect habit consistency.
- **Confetti Celebration**: Checking off all daily habits triggers celebratory confetti and chimes.
- **Custom Habits**: Create new habits with custom emoji badges, categories, and frequency targets.

### 💭 4. Mood Journal & Daily Reflection
- **Vibe Check-In**: 5 expressive moods (`🚀 Radiant`, `😊 Good`, `😐 Neutral`, `🌧️ Low`, `⚡ Stressed`).
- **Tag Clouds**: Select from quick tags (`#Productive`, `#Focused`, `#Grateful`, `#Creative`, `#Tired`, `#Anxious`, `#Chill`).
- **Micro-Journaling**: Fast prompt capture ("One win or thought from today") saved with timestamps.
- **Historical Entries**: Browse recent check-ins with mood badges and notes.

### 📈 5. Progress Charts & Analytics
- **Multi-Tab Interactive Analytics** (via Chart.js with responsive fallback):
  - ⏱️ *Focus Hours*: Weekly focus distribution across days of the week.
  - 📈 *Mood Trend*: 7-day emotional trajectory curve.
  - 🎯 *Habit Mastery*: Consistency percentage bar chart for each habit.
- **Productivity Summary Cards**: Weekly focus hours, habit consistency %, and average vibe score.

### 🎯 6. Goals & Vision Board
- **Quarterly & Milestone Targets**: Track semester goals, fitness milestones, portfolio launches, and savings.
- **Interactive Progress Sliders**: Click to advance milestone progress from 0% to 100%.

### 📝 7. Brain Dump & Scratchpad
- **Instant Auto-Save**: Type notes, formulas, or sudden ideas; debounced persistence into LocalStorage.
- **Live Character Counter & Clear Action**.

### 🎨 8. Aesthetic Themes & Widget Customization
Choose from 5 vibes tailored for today's generation:
1. 🔮 **Cyber Neon** (Dark futuristic obsidian with glowing purple, neon cyan, and hot pink accents)
2. ☕ **Cozy Lofi Study** (Warm mocha base, matcha green, amber glow, sepia study vibes)
3. 🌸 **Tokyo Pastel** (Dreamy lilac twilight, sakura pink, soft mint glassmorphism)
4. ⚡ **Neo-Brutalist** (High-contrast Gen-Z aesthetic, bold borders, vivid yellow & orange stickers)
5. 🖤 **Minimal Obsidian** (Monochrome dark mode, Apple & Notion style typography)

- **Widget Toggle Manager**: Customize your dashboard by showing/hiding any widget.
- **Data Export & Import**: One-click download of your complete dashboard data as a JSON file, and restore anytime.
- **Audio & Haptic Toggles**: Enable/disable sound effects and confetti celebrations.

---

## 🚀 How to Run Locally

1. Open your browser and navigate to:
   ```text
   c:\Users\acer\Personal portfolio\index.html
   ```
2. Double-click **`index.html`** or right-click and choose **Open with Google Chrome / Edge / Brave / Firefox**.
3. That's it! Everything runs directly in your browser with zero build steps or server setup needed.

---

## ⌨️ Keyboard Shortcuts & Quick Tips

| Key | Action |
| :--- | :--- |
| `Z` | Toggle Fullscreen Zen Focus Mode |
| `Esc` | Exit Zen Focus Mode / Close any open modal |
| `Click on Name` | Change your user name ("Good morning, [Name]") |
| `Click on Goal Card` | Advance milestone progress by +10% |

---

## 📁 File Structure

```text
Personal portfolio/
├── index.html        # Semantic HTML5 markup, Bento grid layout, Zen mode overlay, modals
├── style.css         # Multi-theme CSS engine, glassmorphism, responsive styles
├── script.js         # Web Audio synthesizer, Chart.js analytics, LocalStorage state engine
└── README.md         # Documentation & guide
```

---

## 🛡️ Privacy & Offline First
- **100% Client-Side**: All your data (tasks, habits, notes, mood entries) stays securely on your device inside your browser's `localStorage`.
- **Zero Tracking**: No external analytics or tracking scripts.
- **Offline Capable**: Works completely offline.
