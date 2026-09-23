let students = JSON.parse(localStorage.getItem("students")) || [];

function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

function getGrade(avg) {
  if (avg >= 90) return "O";
  else if (avg >= 80) return "A+";
  else if (avg >= 70) return "A";
  else if (avg >= 60) return "B+";
  else if (avg >= 50) return "B";
  else if (avg >= 45) return "C";
  else return "U";
}

function goToAdd() {
  localStorage.removeItem("editId");
  window.location.href = "add.html";
}

function goToList() {
  window.location.href = "list.html";
}

function goHome() {
  window.location.href = "index.html";
}

function updateDashBoard() {
  const totalEl = document.getElementById("totalStudents");
  if (!totalEl) return;
  let total = students.length;
  let sum = 0;
  let max = -Infinity;
  let min = Infinity;
  students.forEach(s => {
    sum += s.avg;
    if (s.avg > max) max = s.avg;
    if (s.avg < min) min = s.avg;
  });
  document.getElementById("totalStudents").textContent = total;
  document.getElementById("avgMark").textContent = total ? (sum / total).toFixed(2) : 0;
  document.getElementById("highMark").textContent = students.length ? max.toFixed(2) : 0;
  document.getElementById("lowMark").textContent = students.length ? min.toFixed(2) : 0;
}

function renderFilteredTable(data) {
  const table = document.getElementById("studentTable");
  if (!table) return;
  table.innerHTML = "";
  data.forEach(s => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td>${s.age}</td>
      <td>${s.dept}</td>
      <td>${s.tamil}</td>
      <td>${s.english}</td>
      <td>${s.maths}</td>
      <td>${s.physics}</td>
      <td>${s.chemistry}</td>
      <td>${s.csbio}</td>
      <td>${s.total}</td>
      <td>${s.avg.toFixed(2)}</td>
      <td>${getGrade(s.avg)}</td>
      <td>
        <button onclick="goToEdit(${s.id})">Edit</button>
        <button onclick="deleteStudent(${s.id})">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

function renderTable() {
  renderFilteredTable(students);
}

function searchStudents(query) {
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(query) ||
    s.email.toLowerCase().includes(query) ||
    s.dept.toLowerCase().includes(query)
  );
  renderFilteredTable(filtered);
}

function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  saveToLocalStorage();
  renderTable();
  updateDashBoard();
}

function goToEdit(id) {
  localStorage.setItem("editId", id);
  window.location.href = "add.html";
}

if (document.getElementById("studentTable")) {
  renderTable();
}

if (document.getElementById("totalStudents")) {
  updateDashBoard();
}

const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("keyup", function (e) {
    const value = e.target.value.toLowerCase();
    if (value === "") renderTable();
    else searchStudents(value);
  });
}
const form = document.getElementById("studentForm");
if (form) {
  let editId = localStorage.getItem("editId");
  if (editId) {
    const s = students.find(st => st.id == editId);
    if (s) {
      document.getElementById("name").value = s.name;
      document.getElementById("email").value = s.email;
      document.getElementById("age").value = s.age;
      document.getElementById("dept").value = s.dept;
      document.getElementById("tamil").value = s.tamil;
      document.getElementById("english").value = s.english;
      document.getElementById("maths").value = s.maths;
      document.getElementById("physics").value = s.physics;
      document.getElementById("chemistry").value = s.chemistry;
      document.getElementById("csbio").value = s.csbio;
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const dept = document.getElementById("dept").value;
    const tamil = Number(document.getElementById("tamil").value);
    const english = Number(document.getElementById("english").value);
    const maths = Number(document.getElementById("maths").value);
    const physics = Number(document.getElementById("physics").value);
    const chemistry = Number(document.getElementById("chemistry").value);
    const csbio = Number(document.getElementById("csbio").value);
    if (!email.includes("@") || !email.includes(".")) {
      alert("Invalid email");
      return;
    }
    if (
      tamil < 0 || tamil > 100 ||
      english < 0 || english > 100 ||
      maths < 0 || maths > 100 ||
      physics < 0 || physics > 100 ||
      chemistry < 0 || chemistry > 100 ||
      csbio < 0 || csbio > 100
    ) {
      alert("Marks must be between 0–100");
      return;
    }
    const total = tamil + english + maths + physics + chemistry + csbio;
    const avg = total / 6;
    const exists = students.some(
      s => s.email === email && s.id != editId
    );
    if (exists) {
      alert("Student already exists");
      return;
    }
    if (editId) {
      students = students.map(s => {
        if (s.id == editId) {
          return {
            id: Number(editId),
            name, email, age, dept,
            tamil, english, maths, physics, chemistry, csbio,
            total, avg
          };
        }
        return s;
      });

      localStorage.removeItem("editId");
    }
    else {
      students.push({
        id: Date.now(),
        name, email, age, dept,
        tamil, english, maths, physics, chemistry, csbio,
        total, avg
      });
    }
    saveToLocalStorage();
    form.reset();
    document.getElementById("name").focus();
    alert(editId ? "Student Updated" : "Student Added");
  });
}