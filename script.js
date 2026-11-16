/**
 * LifeOS — Personal Life Dashboard for Today's Generation
 * Complete client-side application architecture.
 * Fully responsive, persistent with LocalStorage, procedural Web Audio soundscapes.
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DATA MODELS & INITIAL STATE
  // ==========================================================================

  const STORAGE_KEY = 'lifeos_app_state_v1';

  // Helper to format date YYYY-MM-DD
  function formatDateKey(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const todayStr = formatDateKey(new Date());

  // Helper to get past N days array
  function getPastDates(n) {
    const dates = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(formatDateKey(d));
    }
    return dates;
  }

  const past7Days = getPastDates(7);

  // Initial Demo / Seed State
  function getInitialState() {
    return {
      version: 1,
      theme: 'cyber-neon',
      userName: 'Alex',
      settings: {
        soundEffects: true,
        confetti: true,
        ambientVolume: 40,
        activeSoundPreset: 'rain',
        isAmbientPlaying: false
      },
      widgets: {
        timer: true,
        planner: true,
        habits: true,
        mood: true,
        analytics: true,
        goals: true,
        notes: true
      },
      timer: {
        mode: 'pomodoro', // 'pomodoro' | 'shortBreak' | 'longBreak' | 'stopwatch'
        durationSeconds: 25 * 60,
        remainingSeconds: 25 * 60,
        isRunning: false,
        currentSubject: '⚡ Deep Work',
        todaySessions: 3,
        todayMinutes: 75,
        history: [
          { day: 'Mon', minutes: 85 },
          { day: 'Tue', minutes: 120 },
          { day: 'Wed', minutes: 90 },
          { day: 'Thu', minutes: 140 },
          { day: 'Fri', minutes: 110 },
          { day: 'Sat', minutes: 60 },
          { day: 'Sun', minutes: 75 }
        ]
      },
      tasks: [
        { id: 't1', title: 'Review System Design architecture for semester exam', category: 'study', priority: 'high', completed: false, timeBlock: '10:00 AM' },
        { id: 't2', title: 'Implement JWT authentication on backend API project', category: 'code', priority: 'high', completed: false, timeBlock: '02:00 PM' },
        { id: 't3', title: 'Read 25 pages of Atomic Habits', category: 'personal', priority: 'medium', completed: false, timeBlock: '08:00 PM' },
        { id: 't4', title: '5km outdoor run + evening stretching session', category: 'health', priority: 'medium', completed: true, timeBlock: '07:00 AM' },
        { id: 't5', title: 'Submit Machine Learning lab assignment #4', category: 'urgent', priority: 'high', completed: true, timeBlock: '11:30 AM' },
        { id: 't6', title: 'Drink 2.5L water throughout study blocks', category: 'health', priority: 'low', completed: true, timeBlock: 'All Day' },
        { id: 't7', title: 'Clean and reset desk setup for weekly deep work', category: 'personal', priority: 'low', completed: true, timeBlock: '09:00 PM' }
      ],
      habits: [
        {
          id: 'h1',
          name: 'Morning Hydration & Sunlight',
          emoji: '💧',
          category: 'Health',
          frequency: 'daily',
          streak: 12,
          history: {
            [past7Days[0]]: true,
            [past7Days[1]]: true,
            [past7Days[2]]: true,
            [past7Days[3]]: true,
            [past7Days[4]]: true,
            [past7Days[5]]: true,
            [todayStr]: true
          }
        },
        {
          id: 'h2',
          name: '60 Min Deep Focus Session',
          emoji: '⚡',
          category: 'Productivity',
          frequency: 'daily',
          streak: 7,
          history: {
            [past7Days[1]]: true,
            [past7Days[2]]: true,
            [past7Days[3]]: true,
            [past7Days[4]]: true,
            [past7Days[5]]: true,
            [todayStr]: true
          }
        },
        {
          id: 'h3',
          name: 'LeetCode / Code Practice',
          emoji: '💻',
          category: 'Learning',
          frequency: 'daily',
          streak: 5,
          history: {
            [past7Days[2]]: true,
            [past7Days[3]]: true,
            [past7Days[4]]: true,
            [past7Days[5]]: true,
            [todayStr]: true
          }
        },
        {
          id: 'h4',
          name: 'Night Journaling & Reflection',
          emoji: '🌙',
          category: 'Mindset',
          frequency: 'daily',
          streak: 8,
          history: {
            [past7Days[0]]: true,
            [past7Days[1]]: true,
            [past7Days[2]]: true,
            [past7Days[3]]: true,
            [past7Days[4]]: true,
            [past7Days[5]]: true,
            [todayStr]: false
          }
        }
      ],
      moodEntries: [
        { id: 'm1', date: todayStr, time: '11:30 AM', score: 4, moodKey: 'good', tags: ['Productive', 'Focused'], note: 'Completed ML lab early and crushed morning focus timer.' },
        { id: 'm2', date: past7Days[5], time: '09:15 PM', score: 5, moodKey: 'rad', tags: ['Creative', 'Chill'], note: 'Had an awesome productive coding sprint on the side project.' },
        { id: 'm3', date: past7Days[4], time: '10:00 PM', score: 3, moodKey: 'neutral', tags: ['Tired'], note: 'Long lectures today, but stuck to my evening workout habit.' }
      ],
      goals: [
        { id: 'g1', title: 'Score 90%+ in Engineering Finals', category: 'Academics', progress: 80, targetDate: '2026-12-15', emoji: '🎓' },
        { id: 'g2', title: 'Launch Full-Stack Web App Portfolio', category: 'Career', progress: 65, targetDate: '2026-11-30', emoji: '🚀' },
        { id: 'g3', title: 'Run a 10K Marathon Sub-50m', category: 'Fitness', progress: 45, targetDate: '2027-01-10', emoji: '🏃' },
        { id: 'g4', title: 'Save $1,500 in Emergency Fund', category: 'Finance', progress: 90, targetDate: '2026-12-31', emoji: '💰' }
      ],
      scratchpad: "🧠 Quick Ideas & Thoughts:\n- Research Web Audio API audio synthesis algorithms\n- Book quote: 'You do not rise to the level of your goals. You fall to the level of your systems.'\n- Exam topics to revisit: Graph Algorithms & Dynamic Programming\n- Next project idea: AI-powered markdown study flashcards"
    };
  }

  // Load from LocalStorage
  let state = (function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Ensure defaults if any key missing
        const defaults = getInitialState();
        return Object.assign({}, defaults, parsed);
      }
    } catch (e) {
      console.warn('Could not read state from localStorage:', e);
    }
    return getInitialState();
  })();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state:', e);
    }
  }

  // ==========================================================================
  // 2. PROCEDURAL WEB AUDIO ENGINE (ZERO EXTERNAL MP3 DEPENDENCIES)
  // ==========================================================================

  class AudioEngine {
    constructor() {
      this.ctx = null;
      this.ambientGain = null;
      this.activeNodes = [];
      this.currentSound = null;
      this.isPlaying = false;
    }

    initContext() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime((state.settings.ambientVolume || 40) / 100, this.ctx.currentTime);
        this.ambientGain.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    setVolume(val) {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(val / 100, this.ctx.currentTime + 0.05);
      }
    }

    stopAmbient() {
      this.activeNodes.forEach(node => {
        try {
          if (node.stop) node.stop();
          if (node.disconnect) node.disconnect();
        } catch (e) {}
      });
      this.activeNodes = [];
      this.isPlaying = false;
      this.currentSound = null;
      state.settings.isAmbientPlaying = false;
      saveState();
    }

    playAmbient(soundType) {
      this.initContext();
      this.stopAmbient();

      const ctx = this.ctx;
      this.currentSound = soundType;
      this.isPlaying = true;
      state.settings.isAmbientPlaying = true;
      state.settings.activeSoundPreset = soundType;
      saveState();

      if (soundType === 'rain') {
        // Synthesize Pink Noise + lowpass filter for realistic soothing rain
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(this.ambientGain);
        whiteNoise.start();
        this.activeNodes.push(whiteNoise, filter);

      } else if (soundType === 'binaural') {
        // Dual pure sine wave oscillators generating 40Hz gamma focus beat
        const oscLeft = ctx.createOscillator();
        const oscRight = ctx.createOscillator();
        const merger = ctx.createChannelMerger(2);

        oscLeft.type = 'sine';
        oscLeft.frequency.setValueAtTime(200, ctx.currentTime);

        oscRight.type = 'sine';
        oscRight.frequency.setValueAtTime(240, ctx.currentTime); // 40Hz difference

        const gainL = ctx.createGain();
        const gainR = ctx.createGain();
        gainL.gain.value = 0.12;
        gainR.gain.value = 0.12;

        oscLeft.connect(gainL);
        gainL.connect(merger, 0, 0);

        oscRight.connect(gainR);
        gainR.connect(merger, 0, 1);

        merger.connect(this.ambientGain);

        oscLeft.start();
        oscRight.start();
        this.activeNodes.push(oscLeft, oscRight, gainL, gainR, merger);

      } else if (soundType === 'forest' || soundType === 'waves' || soundType === 'cafe') {
        // Filtered procedural noise with LFO modulation
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = soundType === 'cafe' ? 'bandpass' : 'lowpass';
        filter.frequency.setValueAtTime(soundType === 'cafe' ? 450 : 500, ctx.currentTime);
        filter.Q.value = soundType === 'cafe' ? 1.5 : 0.8;

        // LFO for wave swells or wind gusts
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(soundType === 'waves' ? 0.12 : 0.2, ctx.currentTime);
        lfoGain.gain.setValueAtTime(soundType === 'waves' ? 250 : 150, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        noise.connect(filter);
        filter.connect(this.ambientGain);

        lfo.start();
        noise.start();
        this.activeNodes.push(noise, filter, lfo, lfoGain);
      }
    }

    // Interactive UI sound effects
    playClick() {
      if (!state.settings.soundEffects) return;
      try {
        this.initContext();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.03);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.035);
      } catch (e) {}
    }

    playChime() {
      if (!state.settings.soundEffects) return;
      try {
        this.initContext();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const startTime = this.ctx.currentTime + idx * 0.12;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.1, startTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 1.25);
        });
      } catch (e) {}
    }

    playTaskSuccess() {
      if (!state.settings.soundEffects) return;
      try {
        this.initContext();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12); // A5

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.26);
      } catch (e) {}
    }
  }

  const soundEngine = new AudioEngine();

  // Trigger celebration confetti
  function triggerConfetti() {
    if (!state.settings.confetti) return;
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#a855f7', '#06b6d4', '#ec4899', '#facc15', '#10b981']
      });
    }
  }

  // Toast Notification
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✨' : 'ℹ️'}</span>
      <span class="toast-msg">${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // ==========================================================================
  // 3. CLOCK, GREETINGS & METRICS GAUGE
  // ==========================================================================

  function updateClockAndGreeting() {
    const now = new Date();
    const timeEl = document.getElementById('liveTime');
    const dateEl = document.getElementById('liveDate');
    const greetingEl = document.getElementById('greetingText');
    const vibeTagEl = document.getElementById('dailyVibeTag');

    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    }

    const hour = now.getHours();
    let greetingPrefix = 'Good morning';
    let vibe = 'Locked in & energized';

    if (hour >= 12 && hour < 17) {
      greetingPrefix = 'Good afternoon';
      vibe = 'Peak deep work hours';
    } else if (hour >= 17 && hour < 22) {
      greetingPrefix = 'Good evening';
      vibe = 'Wrapping up daily goals';
    } else if (hour >= 22 || hour < 5) {
      greetingPrefix = 'Late night flow';
      vibe = 'Midnight grind session';
    }

    if (greetingEl) {
      greetingEl.innerHTML = `${greetingPrefix}, <span class="editable-name" id="userNameDisplay" title="Click to edit name" tabindex="0">${state.userName || 'Alex'}</span> ✨`;
      attachNameEditListener();
    }
    if (vibeTagEl) {
      vibeTagEl.textContent = vibe;
    }
  }

  function attachNameEditListener() {
    const el = document.getElementById('userNameDisplay');
    if (!el) return;
    el.onclick = () => {
      const newName = prompt('Enter your name for LifeOS:', state.userName || 'Alex');
      if (newName && newName.trim()) {
        state.userName = newName.trim();
        saveState();
        updateClockAndGreeting();
        showToast(`Welcome, ${state.userName}!`, 'success');
      }
    };
  }

  // Calculate Daily Life Score
  function calculateLifeScore() {
    // 1. Task progress
    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter(t => t.completed).length;
    const taskScore = totalTasks > 0 ? (completedTasks / totalTasks) : 0.8;

    // 2. Habit progress today
    const totalHabits = state.habits.length;
    const completedHabits = state.habits.filter(h => h.history && h.history[todayStr]).length;
    const habitScore = totalHabits > 0 ? (completedHabits / totalHabits) : 0.8;

    // 3. Study focus progress (target 100 mins)
    const studyScore = Math.min(1.0, (state.timer.todayMinutes || 0) / 100);

    // 4. Mood contribution
    const todayMood = state.moodEntries.find(m => m.date === todayStr);
    const moodScore = todayMood ? (todayMood.score / 5) : 0.8;

    // Weighted average
    const finalScore = Math.round((taskScore * 0.35 + habitScore * 0.35 + studyScore * 0.2 + moodScore * 0.1) * 100);

    // Update gauge
    const scoreValEl = document.getElementById('dailyScoreVal');
    const scoreCircle = document.getElementById('scoreCircleProgress');
    const descEl = document.getElementById('scoreDescription');

    if (scoreValEl) scoreValEl.textContent = `${finalScore}%`;
    if (scoreCircle) {
      // 2 * PI * 40 = 251.2
      const offset = 251.2 - (251.2 * (finalScore / 100));
      scoreCircle.style.strokeDashoffset = offset;
    }

    if (descEl) {
      if (finalScore >= 80) descEl.textContent = 'Crushing your routines today!';
      else if (finalScore >= 50) descEl.textContent = 'Solid momentum. Keep going!';
      else descEl.textContent = 'Day is young. Pick one micro-win!';
    }

    // Header strip metrics
    const headerStreak = document.getElementById('headerStreakCount');
    const headerTasks = document.getElementById('headerTasksRatio');
    const headerStudy = document.getElementById('headerStudyMinutes');

    if (headerStreak) {
      const maxStreak = Math.max(...state.habits.map(h => h.streak || 0), 0);
      headerStreak.textContent = maxStreak;
    }
    if (headerTasks) {
      headerTasks.textContent = `${completedTasks}/${totalTasks}`;
    }
    if (headerStudy) {
      headerStudy.textContent = `${state.timer.todayMinutes || 0}m`;
    }
  }

  // ==========================================================================
  // 4. STUDY & PRODUCTIVITY TIMER
  // ==========================================================================

  let timerInterval = null;

  function initTimerModule() {
    const timerDisplay = document.getElementById('timerDisplay');
    const zenTimerDisplay = document.getElementById('zenTimerDisplay');
    const timerProgressRing = document.getElementById('timerProgressRing');
    const toggleBtn = document.getElementById('timerToggleBtn');
    const playIcon = document.getElementById('timerPlayIcon');
    const playText = document.getElementById('timerPlayText');
    const resetBtn = document.getElementById('timerResetBtn');
    const skipBtn = document.getElementById('timerSkipBtn');
    const statusPill = document.getElementById('timerStatusPill');
    const subjectSelect = document.getElementById('studySubjectSelect');
    const subjectBadge = document.getElementById('currentSubjectBadge');
    const zenSubjectBadge = document.getElementById('zenSubjectBadge');
    const modeButtons = document.querySelectorAll('.timer-mode-btn');

    const zenPlayBtn = document.getElementById('zenPlayBtn');
    const zenPlayIcon = document.getElementById('zenPlayIcon');
    const zenPlayText = document.getElementById('zenPlayText');
    const zenResetBtn = document.getElementById('zenResetBtn');
    const zenSkipBtn = document.getElementById('zenSkipBtn');

    if (subjectSelect) {
      subjectSelect.value = state.timer.currentSubject || '⚡ Deep Work';
      subjectSelect.onchange = (e) => {
        state.timer.currentSubject = e.target.value;
        if (subjectBadge) subjectBadge.textContent = e.target.value;
        if (zenSubjectBadge) zenSubjectBadge.textContent = e.target.value;
        saveState();
      };
    }

    function formatTime(secs) {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function updateTimerUI() {
      const formatted = formatTime(state.timer.remainingSeconds);
      if (timerDisplay) timerDisplay.textContent = formatted;
      if (zenTimerDisplay) zenTimerDisplay.textContent = formatted;

      // Update ring
      if (timerProgressRing && state.timer.mode !== 'stopwatch') {
        const total = state.timer.durationSeconds;
        const remaining = state.timer.remainingSeconds;
        const progress = Math.max(0, Math.min(1, remaining / total));
        // Circle circumference = 2 * PI * 105 = 659.73
        const offset = 659.73 * (1 - progress);
        timerProgressRing.style.strokeDashoffset = offset;
      }

      // Play/Pause button states
      const isRunning = state.timer.isRunning;
      const text = isRunning ? 'Pause' : 'Start Focus';
      const icon = isRunning ? '⏸' : '▶';

      if (playIcon) playIcon.textContent = icon;
      if (playText) playText.textContent = text;
      if (zenPlayIcon) zenPlayIcon.textContent = icon;
      if (zenPlayText) zenPlayText.textContent = text;

      if (statusPill) {
        if (isRunning) statusPill.textContent = 'Session In Progress 🔥';
        else statusPill.textContent = 'Paused / Ready';
      }

      const countEl = document.getElementById('timerSessionCount');
      const minsEl = document.getElementById('timerTotalMinutes');
      if (countEl) countEl.textContent = state.timer.todaySessions;
      if (minsEl) minsEl.textContent = state.timer.todayMinutes;
    }

    function setMode(mode) {
      state.timer.mode = mode;
      state.timer.isRunning = false;
      clearInterval(timerInterval);

      if (mode === 'pomodoro') {
        state.timer.durationSeconds = 25 * 60;
      } else if (mode === 'shortBreak') {
        state.timer.durationSeconds = 5 * 60;
      } else if (mode === 'longBreak') {
        state.timer.durationSeconds = 15 * 60;
      } else if (mode === 'stopwatch') {
        state.timer.durationSeconds = 0;
      }

      state.timer.remainingSeconds = state.timer.mode === 'stopwatch' ? 0 : state.timer.durationSeconds;

      modeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
      });

      updateTimerUI();
      saveState();
    }

    function toggleTimer() {
      soundEngine.playClick();
      if (state.timer.isRunning) {
        state.timer.isRunning = false;
        clearInterval(timerInterval);
      } else {
        state.timer.isRunning = true;
        timerInterval = setInterval(() => {
          if (state.timer.mode === 'stopwatch') {
            state.timer.remainingSeconds++;
            updateTimerUI();
          } else {
            if (state.timer.remainingSeconds > 0) {
              state.timer.remainingSeconds--;
              updateTimerUI();
            } else {
              // Timer Finished!
              completeSession();
            }
          }
        }, 1000);
      }
      updateTimerUI();
      saveState();
    }

    function resetTimer() {
      soundEngine.playClick();
      state.timer.isRunning = false;
      clearInterval(timerInterval);
      state.timer.remainingSeconds = state.timer.mode === 'stopwatch' ? 0 : state.timer.durationSeconds;
      updateTimerUI();
      saveState();
    }

    function skipTimer() {
      soundEngine.playClick();
      if (state.timer.mode === 'pomodoro') {
        setMode('shortBreak');
        showToast('Switched to Short Break (5m)', 'info');
      } else {
        setMode('pomodoro');
        showToast('Switched to Focus Session (25m)', 'info');
      }
    }

    function completeSession() {
      state.timer.isRunning = false;
      clearInterval(timerInterval);

      soundEngine.playChime();
      triggerConfetti();

      const sessionMins = Math.round(state.timer.durationSeconds / 60);
      state.timer.todaySessions = (state.timer.todaySessions || 0) + 1;
      state.timer.todayMinutes = (state.timer.todayMinutes || 0) + sessionMins;

      // Update analytics
      const todayDayName = new Date().toLocaleDateString('en-US', { weekday: 'short' });
      const histItem = state.timer.history.find(h => h.day === todayDayName);
      if (histItem) {
        histItem.minutes += sessionMins;
      }

      showToast(`🎉 Focus session complete! Logged ${sessionMins} mins for ${state.timer.currentSubject}.`, 'success');

      if (state.timer.mode === 'pomodoro') {
        setMode('shortBreak');
      } else {
        setMode('pomodoro');
      }

      calculateLifeScore();
      renderAnalytics();
      saveState();
    }

    // Attach listeners
    if (toggleBtn) toggleBtn.onclick = toggleTimer;
    if (zenPlayBtn) zenPlayBtn.onclick = toggleTimer;
    if (resetBtn) resetBtn.onclick = resetTimer;
    if (zenResetBtn) zenResetBtn.onclick = resetTimer;
    if (skipBtn) skipBtn.onclick = skipTimer;
    if (zenSkipBtn) zenSkipBtn.onclick = skipTimer;

    modeButtons.forEach(btn => {
      btn.onclick = () => setMode(btn.dataset.mode);
    });

    updateTimerUI();
  }

  // ==========================================================================
  // 5. DAILY PLANNER & TO-DO LIST
  // ==========================================================================

  let currentTaskFilter = 'all';
  let isScheduleView = false;

  function renderTasks() {
    const listContainer = document.getElementById('taskListContainer');
    const scheduleContainer = document.getElementById('scheduleTimelineView');
    const timelineBlocksContainer = document.getElementById('timelineBlocksContainer');
    if (!listContainer) return;

    // Filter tasks
    const filtered = state.tasks.filter(t => {
      if (currentTaskFilter === 'all') return true;
      if (currentTaskFilter === 'pending') return !t.completed;
      if (currentTaskFilter === 'completed') return t.completed;
      if (currentTaskFilter === 'high') return t.priority === 'high';
      if (currentTaskFilter === 'study') return t.category === 'study';
      return true;
    });

    // Counts
    const countAll = state.tasks.length;
    const countPending = state.tasks.filter(t => !t.completed).length;
    const countDone = state.tasks.filter(t => t.completed).length;

    const cAll = document.getElementById('countAll');
    const cPend = document.getElementById('countPending');
    const cDone = document.getElementById('countDone');
    if (cAll) cAll.textContent = countAll;
    if (cPend) cPend.textContent = countPending;
    if (cDone) cDone.textContent = countDone;

    // Progress bar
    const ratio = countAll > 0 ? Math.round((countDone / countAll) * 100) : 0;
    const progressText = document.getElementById('taskProgressRatio');
    const progressBar = document.getElementById('taskProgressBar');
    if (progressText) progressText.textContent = `${countDone} / ${countAll} completed (${ratio}%)`;
    if (progressBar) progressBar.style.width = `${ratio}%`;

    // Render list
    listContainer.innerHTML = '';
    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center; padding: 2rem; color: var(--text-muted); font-size: 0.85rem;">
          ✨ No tasks in this view. Ready to add a new goal?
        </div>
      `;
    } else {
      filtered.forEach(task => {
        const item = document.createElement('div');
        item.className = `task-item ${task.completed ? 'completed' : ''}`;
        item.innerHTML = `
          <div class="task-left">
            <div class="custom-checkbox" data-id="${task.id}" title="Toggle task completion"></div>
            <span class="task-title">${escapeHtml(task.title)}</span>
          </div>
          <div class="task-right">
            <span class="tag-badge priority-${task.priority}">${task.priority.toUpperCase()}</span>
            <span class="tag-badge cat">${task.category}</span>
            <button class="btn-delete-task" data-id="${task.id}" title="Delete task">✕</button>
          </div>
        `;

        // Click on checkbox
        const checkbox = item.querySelector('.custom-checkbox');
        checkbox.onclick = () => toggleTask(task.id);

        // Click on delete
        const delBtn = item.querySelector('.btn-delete-task');
        delBtn.onclick = (e) => {
          e.stopPropagation();
          deleteTask(task.id);
        };

        listContainer.appendChild(item);
      });
    }

    // Render Time Block Schedule
    if (timelineBlocksContainer) {
      timelineBlocksContainer.innerHTML = '';
      const scheduleBlocks = [
        { time: '08:00 AM', title: 'Morning Setup & Habit Ignition', desc: 'Hydration, light stretching, review priority tasks.' },
        { time: '10:00 AM', title: 'Deep Work Block 1', desc: 'High priority study or project sprint (50m timer).' },
        { time: '01:00 PM', title: 'Midday Reset & Nourish', desc: 'Lunch, hydration check, take eyes off screen.' },
        { time: '03:00 PM', title: 'Deep Work Block 2', desc: 'Coding practice, assignments, exam preparation.' },
        { time: '06:30 PM', title: 'Workout / Outdoor Movement', desc: 'Run, gym, or brisk outdoor walk for clarity.' },
        { time: '09:00 PM', title: 'Evening Reflection & Mood Log', desc: 'Check in mood journal, update habit streaks, wind down.' }
      ];

      scheduleBlocks.forEach(b => {
        const row = document.createElement('div');
        row.className = 'timeline-block-row';
        row.innerHTML = `
          <div class="block-time">${b.time}</div>
          <div class="block-content">
            <div class="block-title">${b.title}</div>
            <div class="block-desc">${b.desc}</div>
          </div>
        `;
        timelineBlocksContainer.appendChild(row);
      });
    }

    calculateLifeScore();
  }

  function toggleTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    if (task.completed) {
      soundEngine.playTaskSuccess();
      showToast('Task completed! 🔥', 'success');
    } else {
      soundEngine.playClick();
    }
    saveState();
    renderTasks();
  }

  function deleteTask(id) {
    soundEngine.playClick();
    state.tasks = state.tasks.filter(t => t.id !== id);
    saveState();
    renderTasks();
    showToast('Task removed', 'info');
  }

  function initPlannerModule() {
    const form = document.getElementById('taskQuickAddForm');
    const input = document.getElementById('taskTitleInput');
    const catSelect = document.getElementById('taskCategoryInput');
    const prioSelect = document.getElementById('taskPriorityInput');
    const filterPills = document.querySelectorAll('.filter-pill');
    const clearBtn = document.getElementById('clearCompletedTasksBtn');
    const viewListBtn = document.getElementById('viewListBtn');
    const viewScheduleBtn = document.getElementById('viewScheduleBtn');
    const scheduleView = document.getElementById('scheduleTimelineView');
    const listView = document.getElementById('taskListContainer');

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const title = input.value.trim();
        if (!title) return;
        const newTask = {
          id: 't_' + Date.now(),
          title: title,
          category: catSelect.value,
          priority: prioSelect.value,
          completed: false,
          timeBlock: 'Flexible'
        };
        state.tasks.unshift(newTask);
        input.value = '';
        soundEngine.playClick();
        saveState();
        renderTasks();
        showToast('New task added!', 'success');
      };
    }

    filterPills.forEach(pill => {
      pill.onclick = () => {
        soundEngine.playClick();
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentTaskFilter = pill.dataset.filter;
        renderTasks();
      };
    });

    if (clearBtn) {
      clearBtn.onclick = () => {
        const count = state.tasks.filter(t => t.completed).length;
        if (count === 0) {
          showToast('No completed tasks to clear', 'info');
          return;
        }
        state.tasks = state.tasks.filter(t => !t.completed);
        soundEngine.playClick();
        saveState();
        renderTasks();
        showToast(`Cleared ${count} completed tasks!`, 'info');
      };
    }

    // View Toggle
    if (viewListBtn && viewScheduleBtn && scheduleView && listView) {
      viewListBtn.onclick = () => {
        soundEngine.playClick();
        viewListBtn.classList.add('active');
        viewScheduleBtn.classList.remove('active');
        scheduleView.classList.add('hidden');
        listView.style.display = 'flex';
      };
      viewScheduleBtn.onclick = () => {
        soundEngine.playClick();
        viewScheduleBtn.classList.add('active');
        viewListBtn.classList.remove('active');
        scheduleView.classList.remove('hidden');
        listView.style.display = 'none';
      };
    }

    renderTasks();
  }

  // ==========================================================================
  // 6. HABIT TRACKER WITH STREAKS
  // ==========================================================================

  function renderHabits() {
    const daysHeader = document.getElementById('habitDaysHeader');
    const container = document.getElementById('habitsListContainer');
    if (!container) return;

    // Render 7 days header
    if (daysHeader) {
      daysHeader.innerHTML = '';
      past7Days.forEach(dateStr => {
        const d = new Date(dateStr);
        const dayLetter = d.toLocaleDateString('en-US', { weekday: 'narrow' });
        const isToday = dateStr === todayStr;
        const col = document.createElement('div');
        col.className = `day-header-col ${isToday ? 'is-today' : ''}`;
        col.textContent = dayLetter;
        daysHeader.appendChild(col);
      });
    }

    // Render habit items
    container.innerHTML = '';
    state.habits.forEach(habit => {
      const row = document.createElement('div');
      row.className = 'habit-row';

      // Build 7-day dot matrix
      let dotsHtml = '';
      past7Days.forEach(dateStr => {
        const isDone = habit.history && habit.history[dateStr];
        const isToday = dateStr === todayStr;
        dotsHtml += `
          <div class="matrix-dot ${isDone ? 'done' : ''} ${isToday ? 'is-today' : ''}" 
               data-habit-id="${habit.id}" 
               data-date="${dateStr}"
               title="${isDone ? 'Completed' : 'Click to toggle'} on ${dateStr}">
            ✓
          </div>
        `;
      });

      row.innerHTML = `
        <div class="habit-info-group">
          <span class="habit-icon">${habit.emoji || '⚡'}</span>
          <div class="habit-details">
            <span class="habit-name">${escapeHtml(habit.name)}</span>
            <div class="habit-meta">
              <span class="habit-streak-pill">🔥 ${habit.streak || 0}d streak</span>
              <span>•</span>
              <span>${habit.category}</span>
            </div>
          </div>
        </div>
        <div class="habit-matrix">
          ${dotsHtml}
        </div>
      `;

      // Attach clicks to matrix dots
      row.querySelectorAll('.matrix-dot').forEach(dot => {
        dot.onclick = () => {
          const hId = dot.dataset.habitId;
          const date = dot.dataset.date;
          toggleHabitDay(hId, date);
        };
      });

      container.appendChild(row);
    });

    calculateLifeScore();
  }

  function toggleHabitDay(habitId, dateStr) {
    const habit = state.habits.find(h => h.id === habitId);
    if (!habit) return;
    if (!habit.history) habit.history = {};

    const currentlyDone = !!habit.history[dateStr];
    habit.history[dateStr] = !currentlyDone;

    // Recalculate streak
    let streak = 0;
    let checkDate = new Date();
    // If not done today, streak starts from yesterday if checked
    if (!habit.history[formatDateKey(checkDate)]) {
      checkDate.setDate(checkDate.getDate() - 1);
    }
    while (habit.history[formatDateKey(checkDate)]) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
    habit.streak = streak;

    if (!currentlyDone) {
      soundEngine.playTaskSuccess();
      showToast(`⚡ Habit locked in! Streak: ${streak} days`, 'success');
      // If all habits done today, celebrate!
      const allDoneToday = state.habits.every(h => h.history && h.history[todayStr]);
      if (allDoneToday) {
        triggerConfetti();
        soundEngine.playChime();
        showToast('🌟 All daily habits conquered today! You are on fire!', 'success');
      }
    } else {
      soundEngine.playClick();
    }

    saveState();
    renderHabits();
    renderAnalytics();
  }

  function initHabitModule() {
    const addBtn = document.getElementById('addNewHabitBtn');
    const quickAddBtn = document.getElementById('quickAddHabitBtn');
    const modal = document.getElementById('habitModal');
    const closeBtn = document.getElementById('closeHabitModalBtn');
    const cancelBtn = document.getElementById('cancelHabitBtn');
    const form = document.getElementById('newHabitForm');

    function openModal() {
      soundEngine.playClick();
      modal.classList.remove('hidden');
    }
    function closeModal() {
      modal.classList.add('hidden');
    }

    if (addBtn) addBtn.onclick = openModal;
    if (quickAddBtn) quickAddBtn.onclick = openModal;
    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('habitNameInput').value.trim();
        const emoji = document.getElementById('habitEmojiInput').value.trim() || '✨';
        const category = document.getElementById('habitCategoryInput').value;
        const frequency = document.getElementById('habitGoalInput').value;

        if (!name) return;

        const newHabit = {
          id: 'h_' + Date.now(),
          name,
          emoji,
          category,
          frequency,
          streak: 1,
          history: {
            [todayStr]: true
          }
        };

        state.habits.push(newHabit);
        saveState();
        renderHabits();
        closeModal();
        form.reset();
        soundEngine.playTaskSuccess();
        showToast('New habit created and checked in for today!', 'success');
      };
    }

    renderHabits();
  }

  // ==========================================================================
  // 7. MOOD JOURNAL & REFLECTION
  // ==========================================================================

  let selectedMoodKey = 'good';
  let selectedMoodScore = 4;

  function initMoodModule() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    const tagChips = document.querySelectorAll('.mood-tag-chip');
    const notesInput = document.getElementById('journalNotesInput');
    const saveBtn = document.getElementById('saveMoodBtn');
    const quickLogBtn = document.getElementById('quickLogMoodBtn');

    moodButtons.forEach(btn => {
      btn.onclick = () => {
        soundEngine.playClick();
        moodButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedMoodKey = btn.dataset.mood;
        selectedMoodScore = parseInt(btn.dataset.score, 10);
      };
    });

    tagChips.forEach(chip => {
      chip.onclick = () => {
        soundEngine.playClick();
        chip.classList.toggle('selected');
      };
    });

    if (saveBtn) {
      saveBtn.onclick = () => {
        const note = notesInput ? notesInput.value.trim() : '';
        const selectedTags = Array.from(document.querySelectorAll('.mood-tag-chip.selected')).map(c => c.dataset.tag);

        const newEntry = {
          id: 'm_' + Date.now(),
          date: todayStr,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          score: selectedMoodScore,
          moodKey: selectedMoodKey,
          tags: selectedTags,
          note: note || 'Checked in mood'
        };

        // Replace or add today's entry
        const existingIdx = state.moodEntries.findIndex(m => m.date === todayStr);
        if (existingIdx >= 0) {
          state.moodEntries[existingIdx] = newEntry;
        } else {
          state.moodEntries.unshift(newEntry);
        }

        soundEngine.playTaskSuccess();
        saveState();
        renderMoodEntries();
        renderAnalytics();
        calculateLifeScore();
        showToast('Mood check-in saved! 💭', 'success');
      };
    }

    if (quickLogBtn) {
      quickLogBtn.onclick = () => {
        const moodWidget = document.getElementById('widget-mood');
        if (moodWidget) {
          moodWidget.scrollIntoView({ behavior: 'smooth' });
          if (notesInput) notesInput.focus();
        }
      };
    }

    renderMoodEntries();
  }

  function renderMoodEntries() {
    const container = document.getElementById('recentMoodEntries');
    if (!container) return;
    container.innerHTML = '';

    const recent = state.moodEntries.slice(0, 3);
    if (recent.length === 0) {
      container.innerHTML = '<span style="font-size: 0.72rem; color: var(--text-muted);">No entries yet today. Take a quick moment to log your vibe!</span>';
      return;
    }

    recent.forEach(entry => {
      const moodEmojis = { rad: '🚀', good: '😊', neutral: '😐', low: '🌧️', stressed: '⚡' };
      const item = document.createElement('div');
      item.className = 'recent-journal-item';
      item.innerHTML = `
        <div>
          <span>${moodEmojis[entry.moodKey] || '😊'} <strong>${entry.time}</strong> (${entry.date}):</span>
          <span>"${escapeHtml(entry.note)}"</span>
        </div>
        <div>
          ${entry.tags.map(t => `<span style="color:var(--accent-secondary); font-size:0.68rem;">#${t}</span>`).join(' ')}
        </div>
      `;
      container.appendChild(item);
    });
  }

  // ==========================================================================
  // 8. PROGRESS CHARTS & ANALYTICS
  // ==========================================================================

  let mainChartInstance = null;
  let activeChartTab = 'focus';

  function renderAnalytics() {
    const canvas = document.getElementById('lifeOsMainChart');
    const fallback = document.getElementById('chartFallback');
    const simpleChart = document.getElementById('simpleFallbackChart');
    if (!canvas) return;

    // Update mini metrics
    const weeklyFocusEl = document.getElementById('metricWeeklyFocus');
    const habitConsistencyEl = document.getElementById('metricHabitConsistency');
    const avgMoodEl = document.getElementById('metricAvgMood');

    const totalFocus = state.timer.history.reduce((acc, h) => acc + (h.minutes || 0), 0);
    if (weeklyFocusEl) weeklyFocusEl.textContent = `${(totalFocus / 60).toFixed(1)} hrs`;

    // Habit consistency
    let habitSuccessDots = 0;
    let habitTotalDots = state.habits.length * 7;
    state.habits.forEach(h => {
      past7Days.forEach(d => {
        if (h.history && h.history[d]) habitSuccessDots++;
      });
    });
    const consistencyRate = habitTotalDots > 0 ? Math.round((habitSuccessDots / habitTotalDots) * 100) : 85;
    if (habitConsistencyEl) habitConsistencyEl.textContent = `${consistencyRate}%`;

    // Avg Mood
    const totalMood = state.moodEntries.reduce((acc, m) => acc + (m.score || 4), 0);
    const avgMood = state.moodEntries.length > 0 ? (totalMood / state.moodEntries.length).toFixed(1) : '4.2';
    if (avgMoodEl) avgMoodEl.textContent = `${avgMood} / 5`;

    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      if (fallback) fallback.style.display = 'block';
      if (canvas) canvas.style.display = 'none';
      renderFallbackChart(simpleChart);
      return;
    }

    if (fallback) fallback.style.display = 'none';
    if (canvas) canvas.style.display = 'block';

    if (mainChartInstance) {
      mainChartInstance.destroy();
    }

    const computedStyle = getComputedStyle(document.documentElement);
    const accentPrimary = computedStyle.getPropertyValue('--accent-primary').trim() || '#a855f7';
    const accentSecondary = computedStyle.getPropertyValue('--accent-secondary').trim() || '#06b6d4';
    const textColor = computedStyle.getPropertyValue('--text-secondary').trim() || '#94a3b8';
    const gridColor = 'rgba(255, 255, 255, 0.06)';

    if (activeChartTab === 'focus') {
      const labels = state.timer.history.map(h => h.day);
      const data = state.timer.history.map(h => h.minutes);

      mainChartInstance = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Focus Minutes',
            data: data,
            backgroundColor: accentPrimary,
            borderRadius: 6,
            hoverBackgroundColor: accentSecondary
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } },
              beginAtZero: true
            }
          }
        }
      });

    } else if (activeChartTab === 'mood') {
      const moodLabels = past7Days.map(d => {
        const dateObj = new Date(d);
        return dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      });
      const moodScores = past7Days.map(d => {
        const found = state.moodEntries.find(m => m.date === d);
        return found ? found.score : 4;
      });

      mainChartInstance = new Chart(canvas, {
        type: 'line',
        data: {
          labels: moodLabels,
          datasets: [{
            label: 'Mood Level (1-5)',
            data: moodScores,
            borderColor: accentSecondary,
            backgroundColor: 'rgba(6, 182, 212, 0.15)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: accentPrimary,
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }
            },
            y: {
              min: 1,
              max: 5,
              grid: { color: gridColor },
              ticks: {
                stepSize: 1,
                color: textColor,
                callback: (val) => ['', '⚡ Low', '🌧️ Down', '😐 Neutral', '😊 Good', '🚀 Radiant'][val]
              }
            }
          }
        }
      });

    } else if (activeChartTab === 'habits') {
      const habitNames = state.habits.map(h => h.name.substring(0, 15));
      const habitCompletions = state.habits.map(h => {
        let count = 0;
        past7Days.forEach(d => { if (h.history && h.history[d]) count++; });
        return Math.round((count / 7) * 100);
      });

      mainChartInstance = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: habitNames,
          datasets: [{
            label: 'Consistency %',
            data: habitCompletions,
            backgroundColor: [accentPrimary, accentSecondary, '#ec4899', '#facc15', '#10b981'],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 10 } }
            },
            y: {
              min: 0,
              max: 100,
              grid: { color: gridColor },
              ticks: { color: textColor, callback: (v) => v + '%' }
            }
          }
        }
      });
    }
  }

  function renderFallbackChart(container) {
    if (!container) return;
    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-end; height:160px; padding: 1rem 0;">
        ${state.timer.history.map(h => `
          <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; flex:1;">
            <div style="background:var(--accent-primary); width:18px; height:${Math.min(130, h.minutes)}px; border-radius:4px;"></div>
            <span style="font-size:0.7rem; color:var(--text-muted);">${h.day}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  function initAnalyticsModule() {
    const tabButtons = document.querySelectorAll('.chart-tab-btn');
    tabButtons.forEach(btn => {
      btn.onclick = () => {
        soundEngine.playClick();
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeChartTab = btn.dataset.chart;
        renderAnalytics();
      };
    });

    renderAnalytics();
  }

  // ==========================================================================
  // 9. GOALS & VISION BOARD
  // ==========================================================================

  function renderGoals() {
    const container = document.getElementById('goalsContainer');
    if (!container) return;
    container.innerHTML = '';

    if (state.goals.length === 0) {
      container.innerHTML = '<span style="font-size:0.75rem; color:var(--text-muted);">No goals defined. Click "+ New Goal" to set a milestone!</span>';
      return;
    }

    state.goals.forEach(goal => {
      const card = document.createElement('div');
      card.className = 'goal-card';
      card.innerHTML = `
        <div class="goal-top-row">
          <div class="goal-title-group">
            <span class="goal-emoji">${goal.emoji || '🎯'}</span>
            <span class="goal-title">${escapeHtml(goal.title)}</span>
          </div>
          <span class="goal-category-pill">${goal.category}</span>
        </div>
        <div class="goal-progress-wrap">
          <div class="goal-progress-info">
            <span>Target: ${goal.targetDate || '2026'}</span>
            <span><strong>${goal.progress}%</strong></span>
          </div>
          <div class="goal-progress-bar-bg">
            <div class="goal-progress-bar-fill" style="width: ${goal.progress}%;"></div>
          </div>
        </div>
      `;

      // Allow clicking progress bar to increment
      card.onclick = () => {
        goal.progress = (goal.progress + 10) > 100 ? 0 : (goal.progress + 10);
        soundEngine.playClick();
        if (goal.progress === 100) {
          triggerConfetti();
          soundEngine.playChime();
          showToast(`🏆 Milestone reached: "${goal.title}"!`, 'success');
        }
        saveState();
        renderGoals();
      };

      container.appendChild(card);
    });
  }

  function initGoalsModule() {
    const addBtn = document.getElementById('addNewGoalBtn');
    const modal = document.getElementById('goalModal');
    const closeBtn = document.getElementById('closeGoalModalBtn');
    const cancelBtn = document.getElementById('cancelGoalBtn');
    const form = document.getElementById('newGoalForm');

    function openModal() {
      soundEngine.playClick();
      modal.classList.remove('hidden');
    }
    function closeModal() {
      modal.classList.add('hidden');
    }

    if (addBtn) addBtn.onclick = openModal;
    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById('goalTitleInput').value.trim();
        const category = document.getElementById('goalCategoryInput').value;
        const targetDate = document.getElementById('goalTargetDateInput').value;
        const progress = parseInt(document.getElementById('goalCurrentProgress').value, 10) || 0;
        const emoji = document.getElementById('goalEmoji').value.trim() || '🎯';

        if (!title) return;

        const newGoal = {
          id: 'g_' + Date.now(),
          title,
          category,
          targetDate,
          progress,
          emoji
        };

        state.goals.push(newGoal);
        saveState();
        renderGoals();
        closeModal();
        form.reset();
        soundEngine.playTaskSuccess();
        showToast('New goal locked in! 🎯', 'success');
      };
    }

    renderGoals();
  }

  // ==========================================================================
  // 10. BRAIN DUMP & QUICK NOTES
  // ==========================================================================

  function initNotesModule() {
    const textarea = document.getElementById('scratchpadInput');
    const countEl = document.getElementById('notesCharCount');
    const statusEl = document.getElementById('notesSaveStatus');
    const clearBtn = document.getElementById('clearNotesBtn');

    if (textarea) {
      textarea.value = state.scratchpad || '';
      updateCount();

      let timeout = null;
      textarea.oninput = () => {
        if (statusEl) statusEl.textContent = 'Saving...';
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          state.scratchpad = textarea.value;
          saveState();
          if (statusEl) statusEl.textContent = 'Saved';
          updateCount();
        }, 500);
      };
    }

    function updateCount() {
      if (countEl && textarea) {
        countEl.textContent = `${textarea.value.length} characters`;
      }
    }

    if (clearBtn) {
      clearBtn.onclick = () => {
        if (confirm('Clear scratchpad?')) {
          textarea.value = '';
          state.scratchpad = '';
          saveState();
          updateCount();
          showToast('Scratchpad cleared', 'info');
        }
      };
    }
  }

  // ==========================================================================
  // 11. FULLSCREEN ZEN FOCUS MODE
  // ==========================================================================

  function initZenModeModule() {
    const enterBtn = document.getElementById('enterZenBtn');
    const exitBtn = document.getElementById('exitZenBtn');
    const overlay = document.getElementById('zenOverlay');
    const quoteEl = document.getElementById('zenQuote');
    const soundChips = document.querySelectorAll('.zen-sound-chip');

    const zenQuotes = [
      '"Deep focus is the superpower of the modern age."',
      '"Action creates momentum. Keep your flow state."',
      '"Mastery is born in the quiet hours of disciplined concentration."',
      '"One problem at a time. One session at a time."',
      '"Silence the noise. Amplify your purpose."'
    ];

    function enterZen() {
      soundEngine.playClick();
      overlay.classList.remove('hidden');
      if (quoteEl) {
        quoteEl.textContent = zenQuotes[Math.floor(Math.random() * zenQuotes.length)];
      }
      document.body.style.overflow = 'hidden';
    }

    function exitZen() {
      soundEngine.playClick();
      overlay.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }

    if (enterBtn) enterBtn.onclick = enterZen;
    if (exitBtn) exitBtn.onclick = exitZen;

    // Keyboard shortcut 'Z' for Zen mode
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
        exitZen();
      }
      if ((e.key === 'z' || e.key === 'Z') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        if (overlay.classList.contains('hidden')) enterZen();
        else exitZen();
      }
    });

    soundChips.forEach(chip => {
      chip.onclick = () => {
        soundChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const soundType = chip.dataset.sound;
        soundEngine.playAmbient(soundType);
      };
    });
  }

  // ==========================================================================
  // 12. AMBIENT SOUND CONTROLLER & THEMES
  // ==========================================================================

  function initAmbientAndThemes() {
    // 1. Ambient Sounds
    const ambientBtn = document.getElementById('ambientSoundBtn');
    const dropdown = document.getElementById('ambientDropdown');
    const presetButtons = document.querySelectorAll('.sound-preset-btn');
    const volumeSlider = document.getElementById('ambientVolume');
    const statusTag = document.getElementById('ambientStatus');

    if (ambientBtn && dropdown) {
      ambientBtn.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
      };
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== ambientBtn) {
          dropdown.classList.remove('show');
        }
      });
    }

    presetButtons.forEach(btn => {
      btn.onclick = () => {
        presetButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const soundType = btn.dataset.sound;
        soundEngine.playAmbient(soundType);
        if (statusTag) {
          statusTag.textContent = 'Playing';
          statusTag.classList.add('playing');
        }
        showToast(`Playing ambient soundscape: ${soundType.toUpperCase()}`, 'info');
      };
    });

    if (volumeSlider) {
      volumeSlider.value = state.settings.ambientVolume || 40;
      volumeSlider.oninput = (e) => {
        const val = parseInt(e.target.value, 10);
        state.settings.ambientVolume = val;
        soundEngine.setVolume(val);
        saveState();
      };
    }

    // 2. Theme Switching
    const themeBtn = document.getElementById('themeSelectBtn');
    const themeMenu = document.getElementById('themeMenu');
    const themeOptions = document.querySelectorAll('.theme-opt-btn');
    const themeNameDisplay = document.getElementById('currentThemeName');
    const themeIconDisplay = document.getElementById('currentThemeIcon');

    const themeIcons = {
      'cyber-neon': '🔮',
      'cozy-lofi': '☕',
      'tokyo-pastel': '🌸',
      'neo-brutalist': '⚡',
      'minimal-obsidian': '🖤'
    };

    const themeDisplayNames = {
      'cyber-neon': 'Cyber Neon',
      'cozy-lofi': 'Cozy Lofi Study',
      'tokyo-pastel': 'Tokyo Pastel',
      'neo-brutalist': 'Neo-Brutalist',
      'minimal-obsidian': 'Minimal Obsidian'
    };

    function applyTheme(themeKey) {
      document.documentElement.setAttribute('data-theme', themeKey);
      state.theme = themeKey;
      if (themeNameDisplay) themeNameDisplay.textContent = themeDisplayNames[themeKey] || themeKey;
      if (themeIconDisplay) themeIconDisplay.textContent = themeIcons[themeKey] || '🔮';

      themeOptions.forEach(opt => {
        opt.classList.toggle('active', opt.dataset.theme === themeKey);
      });

      saveState();
      // Re-render chart with new theme colors
      setTimeout(renderAnalytics, 150);
    }

    if (themeBtn && themeMenu) {
      themeBtn.onclick = (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle('show');
      };
      document.addEventListener('click', (e) => {
        if (!themeMenu.contains(e.target) && e.target !== themeBtn) {
          themeMenu.classList.remove('show');
        }
      });
    }

    themeOptions.forEach(opt => {
      opt.onclick = () => {
        const theme = opt.dataset.theme;
        applyTheme(theme);
        themeMenu.classList.remove('show');
        showToast(`Theme changed to ${themeDisplayNames[theme]}`, 'info');
      };
    });

    // Apply saved theme on start
    applyTheme(state.theme || 'cyber-neon');
  }

  // ==========================================================================
  // 13. WIDGET CUSTOMIZER & DATA BACKUP / RESTORE
  // ==========================================================================

  function initWidgetCustomizer() {
    const customizeBtn = document.getElementById('customizeWidgetsBtn');
    const modal = document.getElementById('customizeModal');
    const closeBtn = document.getElementById('closeCustomizeModalBtn');
    const saveBtn = document.getElementById('saveCustomizeBtn');
    const toggleList = document.getElementById('widgetToggleList');
    const soundToggle = document.getElementById('soundEffectsToggle');
    const confettiToggle = document.getElementById('confettiToggle');

    const exportBtn = document.getElementById('exportDataBtn');
    const importInput = document.getElementById('importDataInput');
    const resetBtn = document.getElementById('resetDemoDataBtn');

    const widgetDefs = [
      { id: 'timer', name: 'Study & Productivity Timer', icon: '⏳' },
      { id: 'planner', name: 'Daily Planner & To-Do List', icon: '📋' },
      { id: 'habits', name: 'Habit Tracker with Streaks', icon: '⚡' },
      { id: 'mood', name: 'Mood Journal & Reflection', icon: '💭' },
      { id: 'analytics', name: 'Progress Charts & Insights', icon: '📈' },
      { id: 'goals', name: 'Goals & Vision Board', icon: '🎯' },
      { id: 'notes', name: 'Brain Dump & Quick Notes', icon: '📝' }
    ];

    function openModal() {
      soundEngine.playClick();
      renderToggleList();
      if (soundToggle) soundToggle.checked = !!state.settings.soundEffects;
      if (confettiToggle) confettiToggle.checked = !!state.settings.confetti;
      modal.classList.remove('hidden');
    }

    function closeModal() {
      modal.classList.add('hidden');
    }

    function renderToggleList() {
      if (!toggleList) return;
      toggleList.innerHTML = '';
      widgetDefs.forEach(w => {
        const row = document.createElement('div');
        row.className = 'widget-toggle-row';
        const isChecked = state.widgets[w.id] !== false;
        row.innerHTML = `
          <div class="widget-toggle-label">
            <span>${w.icon}</span>
            <span>${w.name}</span>
          </div>
          <label class="switch-toggle">
            <input type="checkbox" data-widget="${w.id}" ${isChecked ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
        `;

        const checkbox = row.querySelector('input');
        checkbox.onchange = (e) => {
          state.widgets[w.id] = e.target.checked;
          applyWidgetVisibility();
          saveState();
        };

        toggleList.appendChild(row);
      });
    }

    function applyWidgetVisibility() {
      widgetDefs.forEach(w => {
        const el = document.getElementById(`widget-${w.id}`);
        if (el) {
          el.style.display = state.widgets[w.id] !== false ? 'flex' : 'none';
        }
      });
    }

    if (customizeBtn) customizeBtn.onclick = openModal;
    if (closeBtn) closeBtn.onclick = closeModal;
    if (saveBtn) saveBtn.onclick = closeModal;

    if (soundToggle) {
      soundToggle.onchange = (e) => {
        state.settings.soundEffects = e.target.checked;
        saveState();
      };
    }

    if (confettiToggle) {
      confettiToggle.onchange = (e) => {
        state.settings.confetti = e.target.checked;
        saveState();
      };
    }

    // Export Data
    if (exportBtn) {
      exportBtn.onclick = () => {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', `LifeOS_Backup_${todayStr}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast('Backup JSON downloaded successfully!', 'success');
      };
    }

    // Import Data
    if (importInput) {
      importInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target.result);
            if (imported && imported.version) {
              state = imported;
              saveState();
              location.reload();
            } else {
              alert('Invalid LifeOS backup file format.');
            }
          } catch (err) {
            alert('Failed to parse backup JSON.');
          }
        };
        reader.readAsText(file);
      };
    }

    // Reset Demo Data
    if (resetBtn) {
      resetBtn.onclick = () => {
        if (confirm('Reset to initial sample Gen-Z LifeOS data? All custom tasks & habits will be refreshed.')) {
          state = getInitialState();
          saveState();
          location.reload();
        }
      };
    }

    applyWidgetVisibility();
  }

  // Quick Action Buttons
  function initQuickActions() {
    const quickTaskBtn = document.getElementById('quickAddTaskBtn');
    const quickTimerBtn = document.getElementById('quickStartTimerBtn');

    if (quickTaskBtn) {
      quickTaskBtn.onclick = () => {
        const input = document.getElementById('taskTitleInput');
        if (input) {
          input.focus();
          input.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    if (quickTimerBtn) {
      quickTimerBtn.onclick = () => {
        const timerToggle = document.getElementById('timerToggleBtn');
        if (timerToggle) {
          timerToggle.click();
          timerToggle.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }
  }

  // Utility: HTML Escaping
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // ==========================================================================
  // INITIALIZATION ON DOM READY
  // ==========================================================================

  window.addEventListener('DOMContentLoaded', () => {
    updateClockAndGreeting();
    setInterval(updateClockAndGreeting, 1000);

    initTimerModule();
    initPlannerModule();
    initHabitModule();
    initMoodModule();
    initAnalyticsModule();
    initGoalsModule();
    initNotesModule();
    initZenModeModule();
    initAmbientAndThemes();
    initWidgetCustomizer();
    initQuickActions();
    calculateLifeScore();

    console.log('%c🪐 LifeOS loaded successfully.', 'color:#a855f7; font-weight:bold; font-size:14px;');
  });

})();
