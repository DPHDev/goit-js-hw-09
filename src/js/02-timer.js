// Descrito en la documentación
import flatpickr from 'flatpickr';
// Importación adicional de estilos
import 'flatpickr/dist/flatpickr.min.css';

const date = new Date();
let dateUnix = date.getTime();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let timeSet = selectedDates[0].getTime();
    if (timeSet <= dateUnix) {
      startBtn.disabled = true;
      console.log(`${dateUnix} es mayor a ${timeSet}`);
    }
  },
};

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

// let dateSet = flatpickr('#datetime-picker', options);

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
startBtn.addEventListener('click', flatpickr('#datetime-picker', options));
