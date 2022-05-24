const studentName = document.getElementById('name');
const grade = document.querySelectorAll('input[type="number"]');
const infoInput = document.querySelectorAll('input');
const addButton = document.querySelector('.button__add');


const tableReport = document.getElementById('report--results');
const saveButton = document.querySelector('.button__localsave');

document.addEventListener('DOMContentLoaded', getReport);
addButton.addEventListener('click', addReport);
saveButton.addEventListener('click', saveInLocalStorage);

function getReport() {
  if (localStorage.getItem('boletim') !== null) {
    tableReport.innerHTML = localStorage.getItem('boletim');
  }
}

function addReport() {
  // for (let i = 0; i < infoInput.length; i++) {
  //   if (infoInput[i].value == null) {
  //     alert("Preencha todos os campos");
  //     return;
  //   }
  // }
  // Calculate total and average
  let gradeTotal = sumTotal(grade);
  let gradeAverage = Math.floor(sumTotal(grade)/ grade.length);

  // Test result
  let result;
  if (gradeAverage > 70) {
    result = 'Aprovado'
  } else {
    result = 'Reprovado'
  }

  // Create Element
  let tr = document.createElement('tr');
  let newReport =`
    <td>${studentName.value}</td>
    <td>${gradeTotal}</td>
    <td>${gradeAverage}</td>
    <td>${result}</td>
  `;
  tr.innerHTML = newReport
  
  // Show new report in UI
  tableReport.appendChild(tr);

  // Clean input
  for (let i = 0; i < infoInput.length; i++) {
    infoInput[i].value = "";
  }
}

// Save in local Storage
function saveInLocalStorage() {
  let reports = tableReport.innerHTML;

  if (reports.length > 1) {
    localStorage.setItem('boletim', reports );
  } else {
    alert('Não há dados para salvar!')
  }
}

function sumTotal(grades) {
  let sum = 0;

  for (let i = 0; i < grades.length; i++) {
    if (parseInt(grades[i].value)) {
      sum += parseInt(grades[i].value);
    }
  }

  return sum
};