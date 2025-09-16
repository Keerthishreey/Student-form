document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const tableContainer = document.getElementById("tableContainer");

  // Load array from localStorage or initialize empty
  let students = JSON.parse(localStorage.getItem("students")) || [];

  // Function to render table
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
          </tr>
        </thead>
        <tbody>
    `;

    students.forEach(student => {
      tableHTML += `
        <tr>
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.gender}</td>
          <td>${student.mark1}</td>
          <td>${student.mark2}</td>
          <td>${student.mark3}</td>
        </tr>
      `;
    });

    tableHTML += "</tbody></table>";
    tableContainer.innerHTML = tableHTML;
  }

  // Initial render
  renderTable();

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
      // Collect values
      const newStudent = {
        name,
        email,
        gender: gender.value,
        mark1: document.getElementById("mark1").value,
        mark2: document.getElementById("mark2").value,
        mark3: document.getElementById("mark3").value
      };

      // Push to array and update localStorage
      students.push(newStudent);
      localStorage.setItem("students", JSON.stringify(students));

      // Re-render table
      renderTable();

      // Reset form after successful submission
      form.reset();
    }
  });

  form.addEventListener("reset", () => {
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
  });
});
