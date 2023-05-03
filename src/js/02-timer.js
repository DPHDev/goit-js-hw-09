// Descrito en la documentación
import flatpickr from 'flatpickr';
// Importación adicional de estilos
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const calendar = document.getElementById('datetime-picker');
startBtn.disabled = true;
const date = new Date();
let dateUnix = date.getTime();
// calendar.addEventListener('click', flatpickr('#datetime-picker', options));

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
  const selectedDate = flatpickr.parseDate(document.getElementById('datetime-picker').value, 'Y-m-d H:i');
  const clock = document.querySelector('.timer');
  
  let clockCounter = setInterval(() => {
    updateClock(clock, selectedDate);
    if (date = selectedDate) {
      clearInterval(clockCounter);
      alert('El momento ha llegado, el pan que habla!')
    }
  }, 1000);
};

function  updateClock(clock, selectedDate) {
  const timeLeft = selectedDate - date;
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  clock.querySelector('[data-days]').textContent = formatValue(days);
  clock.querySelector('[data-hours]').textContent = formatValue(hours);
  clock.querySelector('[data-minutes]').textContent = formatValue(minutes);
  clock.querySelector('[data-seconds]').textContent = formatValue(seconds);
}

startBtn.addEventListener('click', startCounter);
