
class Student {
  constructor(id, name, age, course) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.course = course;
  }

  introduce() {
    return `Hi, my name is ${this.name}, I am ${this.age} years old, and I am enrolled in ${this.course}.`;
  }
}

class Instructor {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }

  teach() {
    return `I am ${this.name} and I teach ${this.subject}.`;
  }
}

function fetchDataWithPromises() {
  fetch("data/students.json")
    .then(response => response.json())
    .then(data => {
      console.log("Promise Version:", data);
    })
    .catch(error => console.error("Error loading JSON:", error));
}


async function fetchDataWithAsync() {
  try {
    const response = await fetch("data/students.json");
    const data = await response.json();
    console.log("Async/Await Version:", data);
    return data;
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

async function displayData() {
  const data = await fetchDataWithAsync();
  const outputDiv = document.getElementById("output");

  let html = "<h2>Students:</h2><ul>";
  data.students.forEach(student => {
    let highlight = student.age > 21 ? "class='highlight'" : "";
    html += `<li ${highlight}>${student.name} (${student.age}) - ${student.course}</li>`;
  });
  html += "</ul>";

  html += "<h2>Courses:</h2><ul>";
  data.courses.forEach(course => {
    html += `<li><strong>${course.title}:</strong> ${course.description}</li>`;
  });
  html += "</ul>";

  html += "<h2>Instructors:</h2><ul>";
  data.instructors.forEach(instr => {
    html += `<li>${instr.name} - ${instr.subject}</li>`;
  });
  html += "</ul>";


  html += "<h2>Data Relationships:</h2><ul>";
  data.students.forEach(student => {
    let course = data.courses.find(c => c.title === student.course);
    html += `<li>${student.name} → ${course.title} → ${course.description}</li>`;
  });
  html += "</ul>";

  html += "<h2>Course-Instructor Match:</h2><ul>";
  html += "<li>Computer Science → Taught by John Rey Silverio</li>";
  html += "<li>Data Science → Taught by Maria Santos</li>";
  html += "<li>Cybersecurity → Taught by Carlos Dela Cruz</li>";
  html += "</ul>";

  outputDiv.innerHTML = html;
}

fetchDataWithPromises();
displayData();
