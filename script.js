* {
  box-sizing: border-box;
}

:root {
  --bg: linear-gradient(135deg, #f4f7ff 0%, #eef6ff 100%);
  --card: rgba(255, 255, 255, 0.8);
  --primary: #2f6fed;
  --primary-dark: #1f56c7;
  --text: #1e293b;
  --muted: #64748b;
  --border: rgba(148, 163, 184, 0.25);
  --success: #22c55e;
  --danger: #ef4444;
  --shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
}

button,
input {
  font: inherit;
}

.app-shell {
  width: min(100%, 760px);
  padding: 24px;
}

.todo-app {
  background: var(--card);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 26px;
  box-shadow: var(--shadow);
  padding: 28px;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 2vw + 1rem, 3rem);
}

.task-count {
  background: rgba(47, 111, 237, 0.12);
  color: var(--primary-dark);
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
}

.todo-form {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  margin-bottom: 18px;
}

.todo-form input {
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.94);
  border-radius: 14px;
  padding: 16px 18px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.todo-form input:focus {
  outline: none;
  border-color: rgba(47, 111, 237, 0.7);
  box-shadow: 0 0 0 4px rgba(47, 111, 237, 0.12);
}

.todo-form button,
.filter-btn,
.clear-btn,
.delete-btn,
.check-btn {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.18s ease, opacity 0.18s ease, background 0.18s ease;
}

.todo-form button {
  background: linear-gradient(135deg, var(--primary) 0%, #4f8cff 100%);
  color: white;
  font-weight: 700;
  padding: 0 18px;
  min-width: 130px;
}

.todo-form button:hover,
.filter-btn:hover,
.clear-btn:hover,
.delete-btn:hover,
.check-btn:hover {
  transform: translateY(-1px);
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-btn,
.clear-btn {
  background: rgba(148, 163, 184, 0.08);
  color: var(--text);
  padding: 8px 12px;
  font-weight: 600;
}

.filter-btn.active {
  background: rgba(47, 111, 237, 0.14);
  color: var(--primary-dark);
}

.clear-btn {
  color: var(--danger);
  background: rgba(239, 68, 68, 0.08);
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.todo-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 14px 16px;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--muted);
}

.check-btn {
  width: 22px;
  height: 22px;
  border: 2px solid rgba(47, 111, 237, 0.5);
  background: white;
  position: relative;
}

.todo-item.completed .check-btn {
  background: linear-gradient(135deg, var(--success) 0%, #16a34a 100%);
  border-color: var(--success);
}

.todo-item.completed .check-btn::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.todo-text {
  font-size: 1rem;
  font-weight: 600;
  word-break: break-word;
}

.delete-btn {
  background: rgba(239, 68, 68, 0.08);
  color: var(--danger);
  padding: 8px 10px;
  font-weight: 700;
}

.empty-state {
  padding: 24px 12px 8px;
  text-align: center;
  color: var(--muted);
  font-weight: 500;
}

.hidden {
  display: none;
}

@media (max-width: 560px) {
  .todo-app {
    padding: 18px;
    border-radius: 20px;
  }

  .app-header,
  .toolbar,
  .todo-form {
    grid-template-columns: 1fr;
    display: grid;
  }

  .app-header {
    justify-content: stretch;
  }

  .task-count {
    justify-self: start;
  }

  .todo-form {
    grid-template-columns: 1fr;
  }

  .todo-item {
    grid-template-columns: auto 1fr;
  }

  .delete-btn {
    grid-column: 1 / -1;
    width: 100%;
  }
}
