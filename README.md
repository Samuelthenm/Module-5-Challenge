# Module-5-Challenge
# Task Board with Day.js

A simple, browser-based task board application using [Day.js](https://day.js.org/) for date handling.  
This application allows users to create, drag-and-drop, and delete tasks, with data persisted in the browser’s **localStorage**.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Customization](#customization)
- [License](#license)

---

## Overview

This project demonstrates a straightforward way to manage tasks in a browser application. The primary technologies used are:

- **HTML/CSS** for the structure and presentation
- **JavaScript** for dynamic interactions (drag-and-drop, modal pop-ups, localStorage)
- **[Day.js](https://day.js.org/)** for checking and comparing deadline dates

---

## Features

1. **Task Creation**  
   Create tasks with a title, description, and deadline date. Data is stored in localStorage so tasks persist between refreshes.

2. **Drag and Drop**  
   Drag tasks between three columns: **Not Yet Started**, **In Progress**, and **Completed**. The task’s status updates automatically when dropped in a new column.

3. **Deadline Indicators**  
   - Overdue tasks (deadline earlier than the current day) are tinted red.  
   - Tasks whose deadline is within 1 day are tinted yellow.

4. **Deletion**  
   Each task has a **Delete** button to remove it permanently.

5. **Persistence**  
   All tasks remain stored in localStorage until removed, surviving page refreshes and browser restarts.

---

## Folder Structure


- **index.html**  
  Contains the basic HTML structure, references the Day.js library (via CDN), and links the external CSS and JavaScript files.

- **style.css**  
  Contains all project-specific styles for the task board layout, columns, the modal dialog, and status-based color highlighting.

- **script.js**  
  Contains the core logic for:
  - Creating tasks  
  - Handling drag-and-drop functionality  
  - Managing localStorage interactions  
  - Applying deadline color classes via Day.js

---

## Usage

1. **Clone or Download** this repository into a local folder (e.g., `task-board/`).  
2. **Open `index.html`** in your preferred web browser (Chrome, Firefox, etc.).  
3. **Create a new task** by clicking **“Define New Task”**, filling in the required fields, and clicking **Save**.  
4. **Drag tasks** between columns to change their status.  
5. **Delete tasks** by clicking the **Delete** button on any task card.  
6. **Refresh the page** to confirm that tasks persist from localStorage.

> **Note**: This project does not require a build system or server. It runs directly in the browser.

---

## How It Works

1. **Local Storage**  
   - The application saves an array of task objects under the key `tasks` in `localStorage`.  
   - Retrieving (`getTasks()`) and saving (`saveTasks()`) tasks are handled by simple helper functions in `script.js`.

2. **Day.js Integration**  
   - Each task’s deadline is compared to the current day using Day.js methods:  
     - **Overdue** if `deadline < today` (red background)  
     - **Near Deadline** if `deadline - today <= 1 day` (yellow background)

3. **Drag & Drop**  
   - Each task element has the `draggable="true"` attribute, triggering browser drag events.  
   - Dropping a task in a new column updates that task’s status in localStorage, then re-renders the board.

4. **Modal Dialog**  
   - Clicking **“Define New Task”** opens a basic modal for entering task details.  
   - Upon saving, the new task is inserted into localStorage and shown on the board.

---

## Customization

- **Styling**  
  Modify `style.css` to change colors, fonts, or layout as desired.

- **Deadline Thresholds**  
  In `script.js` (`getDeadlineClass`), you can easily tweak the logic for overdue vs. near-deadline.

- **Additional Columns**  
  You can add more columns to represent different workflow stages. Adapt the code in both **index.html** (for extra drop areas) and **script.js** (for handling new statuses).

---

## License

This project is provided under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute it as needed.
