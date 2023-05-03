// Descrito en la documentación
import flatpickr from 'flatpickr';
// Importación adicional de estilos
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const calendar = document.getElementById('datetime-picker');
startBtn.disabled = true;
const date = new Date();
let dateUnix = date.getTime();
let clockCounter = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let timeSet =
      selectedDates[0].getTime() <= dateUnix
        ? alert('Por favor ingresa una fecha y hora posterior a este momento!')
        : (startBtn.disabled = false);
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
  
function startCounter() {
  const selectedDate = flatpickr.parseDate(
    document.getElementById('datetime-picker').value,
    'Y-m-d H:i'
  );
  const clock = document.querySelector('.timer');
  clockCounter = setInterval(() => {
    updateClock(clock, selectedDate);
  }, 1000);
}

function updateClock(clock, selectedDate) {
  let timeLeft = selectedDate - new Date();
  if (timeLeft > 0) {
    let { days, hours, minutes, seconds } = convertMs(timeLeft);
    clock.querySelector('[data-days]').textContent = addLeadingZero(days);
    clock.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    clock.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    clock.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  } else {
    clearInterval(clockCounter);
    alert('El momento ha llegado, el pan que habla!');
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', startCounter);
