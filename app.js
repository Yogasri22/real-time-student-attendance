import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* Replace these values with your Firebase Web App configuration. */
const firebaseConfig = {
  apiKey: "AIzaSyAQsNKTDHo1TvfKraclwh8_GTgcUeDT4sg",
  authDomain: "real-time-student-attend-dfd1b.firebaseapp.com",
  databaseURL: "https://real-time-student-attend-dfd1b-default-rtdb.firebaseio.com",
  projectId: "real-time-student-attend-dfd1b",
  storageBucket: "real-time-student-attend-dfd1b.firebasestorage.app",
  messagingSenderId: "1034163891507",
  appId: "1:1034163891507:web:e822055d4adc2438ade246",
  measurementId: "G-C550SDZSV9"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const studentsRef = ref(db, "students");

window.addStudent = async function () {
  const name = document.getElementById("studentName").value.trim();
  const roll = document.getElementById("rollNo").value.trim();
  const message = document.getElementById("message");

  if (!name || !roll) {
    message.textContent = "Please enter both name and roll number.";
    return;
  }

  const newStudent = push(studentsRef);
  await set(newStudent, {name, rollNo: roll, status: "Absent", createdAt: Date.now()});
  document.getElementById("studentName").value = "";
  document.getElementById("rollNo").value = "";
  message.textContent = "Student added successfully.";
};

window.changeStatus = async function(id, status) {
  await update(ref(db, "students/" + id), {status});
};

window.deleteStudent = async function(id) {
  if (confirm("Delete this student?")) await remove(ref(db, "students/" + id));
};

onValue(studentsRef, snapshot => {
  const table = document.getElementById("studentTable");
  table.innerHTML = "";
  let total = 0, present = 0, absent = 0;
  const data = snapshot.val() || {};

  Object.entries(data).forEach(([id, student], index) => {
    total++;
    if (student.status === "Present") present++; else absent++;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${escapeHtml(student.name)}</td>
      <td>${escapeHtml(student.rollNo)}</td>
      <td class="${student.status === "Present" ? "present" : "absent"}">${student.status}</td>
      <td>
        <button onclick="changeStatus('${id}','Present')">Present</button>
        <button onclick="changeStatus('${id}','Absent')">Absent</button>
        <button class="delete" onclick="deleteStudent('${id}')">Delete</button>
      </td>`;
    table.appendChild(row);
  });

  document.getElementById("total").textContent = total;
  document.getElementById("present").textContent = present;
  document.getElementById("absent").textContent = absent;
});

function escapeHtml(value) {
  return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
