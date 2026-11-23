// Clubhouse sign forms: each form only builds an email and opens it in the person's own mail
// app (a mailto: link). Nothing is sent from this page, and nothing is stored or tracked.

// Placeholder until the sign has its own address. Example.org never accepts mail, so test
// emails bounce.
const SIGN_EMAIL = "sign@example.org";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-11-25" -> "Wed Nov 25", as the sign writes dates.
function signDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return `${DAYS[dt.getDay()]} ${MONTHS[m - 1]} ${d}`;
}

// "19:00" -> "7 pm", "18:30" -> "6:30 pm", "12:00" -> "12 pm".
function signTime(hhmm) {
  let [h, min] = hhmm.split(":").map(Number);
  const ampm = h < 12 ? "am" : "pm";
  h = h % 12 || 12;
  return min ? `${h}:${String(min).padStart(2, "0")} ${ampm}` : `${h} ${ampm}`;
}

const clean = (s) => s.trim().replace(/\s+\n/g, "\n");

// Each kind of form -> the email's subject and body. Officers' emails are read in plain
// English; these match the sign's fixed forms where there are some (docs/email.md).
const EMAILS = {
  announce: (f) => ({
    subject: "Announcement",
    body: `Announcement: ${clean(f.text)}` + (f.until ? `\nUntil: ${signDate(f.until)}` : ""),
  }),
  change: (f) => ({ subject: "Change announcement", body: `Change announcement ${f.n} to: ${clean(f.text)}` }),
  remove: (f) => ({ subject: "Remove announcement", body: `Remove announcement ${f.n}` }),
  clear: () => ({ subject: "Clear announcements", body: "Clear announcements" }),
  "add-event": (f) => ({
    subject: "Add event",
    body: `Add event: ${signDate(f.date)}${f.time ? ", " + signTime(f.time) : ""}: ${f.name.trim()}`,
  }),
  "remove-event": (f) => ({ subject: "Remove event", body: `Remove event: ${signDate(f.date)}: ${f.name.trim()}` }),
  off: (f) => ({
    subject: "Sign off",
    body: `Sign off ${signDate(f.date)} from ${signTime(f.from)} to ${signTime(f.to)}` +
      (f.why.trim() ? ` (${f.why.trim()})` : ""),
  }),
  potluck: (f) => ({ subject: "Potluck", body: `Potluck ${signDate(f.date)}, ${f.tables} tables` }),
  "5050": (f) => ({
    subject: "50/50",
    body: `50/50\nPrize: $${f.prize}` + (f.ranges.trim() ? `\nTickets:\n${clean(f.ranges)}` : "\nDrawn by hand") +
      (f.drawer.trim() ? `\nDrawer: ${f.drawer.trim()}` : ""),
  }),
  "5050-winner": (f) => ({ subject: "50/50 winner", body: `50/50 winner: ${f.ticket.trim()}` }),
  status: () => ({ subject: "Status", body: "Status" }),
  undo: () => ({ subject: "Undo", body: "Undo" }),
  other: (f) => ({ subject: "Request", body: clean(f.text) }),
};

function mailto({ subject, body }) {
  return `mailto:${SIGN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// After the button: show what was opened, with copy buttons, for computers without a mail app.
function showResult(form, email) {
  form.querySelector(".result")?.remove();
  const box = document.createElement("div");
  box.className = "result";
  box.setAttribute("aria-live", "polite");
  const intro = document.createElement("p");
  intro.innerHTML = "Your mail app should open with this email: check it and press <strong>Send</strong>. " +
    "No mail app? Copy these into a new email.";
  box.append(intro);
  for (const [label, text] of [["To", SIGN_EMAIL], ["Subject", email.subject], ["Message", email.body]]) {
    const field = document.createElement("div");
    field.className = "field";
    const head = document.createElement("div");
    head.className = "head";
    head.textContent = label;
    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "plain";
    copy.textContent = "Copy";
    copy.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(text); copy.textContent = "Copied"; }
      catch { copy.textContent = "Select and copy"; }
      setTimeout(() => (copy.textContent = "Copy"), 2000);
    });
    head.append(copy);
    const pre = document.createElement("pre");
    pre.textContent = text;
    field.append(head, pre);
    box.append(field);
  }
  form.append(box);
}

const today = new Date();
const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

for (const el of document.querySelectorAll(".sign-email")) el.textContent = SIGN_EMAIL;

for (const form of document.querySelectorAll("form[data-kind]")) {
  for (const d of form.querySelectorAll('input[type="date"]')) {
    d.min = todayIso;
    if (form.dataset.kind === "potluck") d.value = todayIso;
  }
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const fields = Object.fromEntries(new FormData(form));
    const email = EMAILS[form.dataset.kind](fields);
    showResult(form, email);
    window.location.href = mailto(email);
  });
}
