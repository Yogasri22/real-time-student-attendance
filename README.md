# Real-Time Student Attendance System

A simple real-time database application for managing student attendance.

## Features
- Add students
- Store records in Firebase Realtime Database
- Mark Present / Absent
- Delete students
- Live total/present/absent counts
- Changes appear without refreshing

## Technologies
HTML, CSS, JavaScript, Firebase Realtime Database

## Database Structure
students
  -> student_id
     -> name
     -> rollNo
     -> status
     -> createdAt

## Setup
1. Create a Firebase project.
2. Enable Realtime Database.
3. Create a Web App.
4. Copy the Firebase configuration into `app.js`.
5. For a classroom demo, use the rules in `database.rules.json`.
6. Run with a local server or deploy with GitHub Pages.

## GitHub
Upload `index.html`, `style.css`, `app.js`, `database.rules.json`, and `README.md`.

## Objective
To demonstrate CRUD operations and real-time synchronization using a cloud NoSQL database.
