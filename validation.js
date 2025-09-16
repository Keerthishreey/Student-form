document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
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
 });
  form.addEventListener("reset", () => {
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
  });
});
