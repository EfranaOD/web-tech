# User Manager (Vanilla JS)

A minimal user-management page built with plain HTML, CSS, and JavaScript.

## Features

- Add user (name + age). Validation: name required, min length 3.
- Mark user as adult/minor (age ≥ 18).
- List all users.
- **Clear**: remove all users (reset state).
- Live search (substring, case-insensitive).
- Exact search (button).
- Filter adults only.
- Summary: total users / adults / minors.
- Delete user by name (case-insensitive).
- Edit user (prefill fields; update name and/or age; “Nothing to edit” message if unchanged).

## Tech / Skills

- HTML (forms, inputs)
- CSS (basic layout)
- JavaScript (vanilla):
  - DOM selection & events
  - Form handling & validation
  - Arrays of objects: `push`, `find`, `findIndex`, `filter`, `forEach`
  - Simple UI state (enable/disable)
  - Updating DOM with `innerText` / `innerHTML`

## Folder Structure

```text
02-user-manager/
  ├── index.html
  ├── style.css
  └── script.js

## How to Run

1. Open `index.html` in a browser.
2. Add users and try the different actions (list, search, filter, delete, edit).

## Author

**Efrana**  
Aspiring .NET Full Stack Developer.

Learning with guidance and mentorship along the way.
