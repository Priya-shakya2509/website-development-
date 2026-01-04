// Calendar Display
const calendar = document.getElementById("calendarContainer");
const today = new Date();
calendar.innerHTML = `<p>Your cycle starts on: <strong>${today.toDateString()}</strong></p>`;

// Reminder Logic
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reminderForm");
  const input = document.getElementById("reminderInput");
  const list = document.getElementById("reminderList");

  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

  const renderReminders = () => {
    list.innerHTML = "";
    reminders.forEach((reminder, index) => {
      const li = document.createElement("li");
      li.textContent = reminder;

      const btn = document.createElement("button");
      btn.textContent = "❌";
      btn.onclick = () => {
        reminders.splice(index, 1);
        localStorage.setItem("reminders", JSON.stringify(reminders));
        renderReminders();
      };

      li.appendChild(btn);
      list.appendChild(li);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
      reminders.push(value);
      localStorage.setItem("reminders", JSON.stringify(reminders));
      input.value = "";
      renderReminders();
    }
  });

  renderReminders();
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reminderForm");
  const input = document.getElementById("reminderInput");
  const timeInput = document.getElementById("reminderTime");
  const list = document.getElementById("reminderList");
  const alarmSound = document.getElementById("alarmSound");

  // Ask for notification permission
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

  const renderReminders = () => {
    list.innerHTML = "";
    reminders.forEach((r, index) => {
      const li = document.createElement("li");
      li.textContent = `${r.message} at ${r.time}`;

      const btn = document.createElement("button");
      btn.textContent = "❌";
      btn.onclick = () => {
        reminders.splice(index, 1);
        localStorage.setItem("reminders", JSON.stringify(reminders));
        renderReminders();
      };

      li.appendChild(btn);
      list.appendChild(li);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = input.value.trim();
    const time = timeInput.value;
    if (message && time) {
      reminders.push({ message, time });
      localStorage.setItem("reminders", JSON.stringify(reminders));
      input.value = "";
      timeInput.value = "";
      renderReminders();
    }
  });

  // Alarm checker every minute
  setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
    reminders.forEach((r) => {
      if (r.time === currentTime) {
        if (Notification.permission === "granted") {
          new Notification("🔔 Reminder", {
            body: r.message,
            icon: "https://img.icons8.com/ios/50/appointment-reminders.png",
          });
        }
        alarmSound.play();
      }
    });
  }, 60000); // check every minute

  renderReminders();
});
const tips = [
  "Stay hydrated during your cycle!",
  "Try light yoga for cramps relief.",
  "Eat iron-rich foods like spinach and dates.",
  "Track your mood to understand your cycle better.",
  "Magnesium helps reduce PMS symptoms.",
];

const todayTip = tips[new Date().getDate() % tips.length];
document.getElementById("healthTip").textContent = todayTip;
document.getElementById("cycleStart").addEventListener("change", function () {
  const start = new Date(this.value);
  const next = new Date(start);
  next.setDate(start.getDate() + 28); // assumes 28-day cycle
  document.getElementById(
    "nextPeriod"
  ).textContent = `Next period may start around: ${next.toDateString()}`;
});
function saveMood() {
  const mood = document.getElementById("mood").value;
  localStorage.setItem("moodToday", mood);
  document.getElementById("savedMood").textContent = `You felt ${mood} today.`;
}

// Load saved mood
document.addEventListener("DOMContentLoaded", () => {
  const mood = localStorage.getItem("moodToday");
  if (mood) {
    document.getElementById(
      "savedMood"
    ).textContent = `You felt ${mood} today.`;
  }
});
setInterval(() => {
  if (Notification.permission === "granted") {
    new Notification("💧 Stay Hydrated!", {
      body: "Time to drink a glass of water!",
    });
  }
}, 2 * 60 * 60 * 1000); // Every 2 hours
