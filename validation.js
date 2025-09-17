document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const tableContainer = document.getElementById("tableContainer");

  let students = JSON.parse(localStorage.getItem("students")) || [];
  let editIndex = -1; // -1 means add mode, otherwise edit mode

  function renderTable() {
    if (students.length === 0) {
      tableContainer.innerHTML = "<p>No records yet.</p>";
      return;
    }

    let tableHTML = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Mark 1</th>
            <th>Mark 2</th>
            <th>Mark 3</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    `;

    students.forEach((student, index) => {
      tableHTML += `
        <tr>
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.gender}</td>
          <td>${student.mark1}</td>
          <td>${student.mark2}</td>
          <td>${student.mark3}</td>
          <td>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
          </td>
        </tr>
      `;
    });

    tableHTML += "</tbody></table>";
    tableContainer.innerHTML = tableHTML;
  }

  // Initial render
  renderTable();

  // Form validation & submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    const name = document.getElementById("name").value.trim();
    if (name === "") {
      document.getElementById("nameError").textContent = "Please fill this field.";
      isValid = false;
    }

    const email = document.getElementById("email").value.trim();
    if (email === "") {
      document.getElementById("emailError").textContent = "Please fill this field.";
      isValid = false;
    }

    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
      document.getElementById("genderError").textContent = "Please select gender.";
      isValid = false;
    }

    function validateMark(id) {
      const value = document.getElementById(id).value.trim();
      if (value === "") {
        document.getElementById(id + "Error").textContent = "Please fill this field.";
        return false;
      } else if (isNaN(value) || value < 0 || value > 100) {
        document.getElementById(id + "Error").textContent = "Enter a mark between 0 and 100.";
        return false;
      }
      return true;
    }

    const mark1Valid = validateMark("mark1");
    const mark2Valid = validateMark("mark2");
    const mark3Valid = validateMark("mark3");

    if (!(mark1Valid && mark2Valid && mark3Valid)) {
      isValid = false;
    }

    if (isValid) {
      const studentData = {
        name,
        email,
        gender: gender.value,
        mark1: document.getElementById("mark1").value,
        mark2: document.getElementById("mark2").value,
        mark3: document.getElementById("mark3").value
      };

      if (editIndex === -1) {
        students.push(studentData);
      } else {
        students[editIndex] = studentData;
        editIndex = -1;
      }

      localStorage.setItem("students", JSON.stringify(students));
      renderTable();
      form.reset();
    }
  });

  form.addEventListener("reset", () => {
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    editIndex = -1; 
  });
  window.editStudent = function (index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
    document.getElementById("mark1").value = student.mark1;
    document.getElementById("mark2").value = student.mark2;
    document.getElementById("mark3").value = student.mark3;
    editIndex = index;
  };

  window.deleteStudent = function (index) {
    if (confirm("Are you sure you want to delete this record?")) {
      students.splice(index, 1);
      localStorage.setItem("students", JSON.stringify(students));
      renderTable();
    }
  };
});
