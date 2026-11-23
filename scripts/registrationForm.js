const btnhome = document.getElementById("projectName");
// Получаем все input элементы в form-group
const formGroups = document.querySelectorAll('.form-group');

// Функция для управления классом active
function updateFormGroupState(input) {
  const formGroup = input.parentElement;
  if (input.value.trim() !== '' || document.activeElement === input) {
    formGroup.classList.add('active');
  } else {
    formGroup.classList.remove('active');
  }
}

// Добавляем обработчики на все input элементы
formGroups.forEach(group => {
  const input = group.querySelector('input');
  
  // При фокусе
  input.addEventListener('focus', () => {
    group.classList.add('active');
  });
  
  // При потере фокуса
  input.addEventListener('blur', () => {
    if (input.value.trim() === '') {
      group.classList.remove('active');
    }
  });
  
  // При вводе текста
  input.addEventListener('input', () => {
    updateFormGroupState(input);
  });
});

// Устанавливаем фокус на первый input
document.getElementById("first_name").focus();

btnhome.addEventListener("click", function() {
  window.location.href = "loginandreg.html";
});