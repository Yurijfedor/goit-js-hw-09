import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');

startButton.addEventListener('click', onStartTimer);
startButton.disabled = true;
let selectedDatesMs;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDatesMs = selectedDates[0].getTime();
    let defaultDateMs = options.defaultDate.getTime();
    let differenceMs = selectedDatesMs - defaultDateMs;
    if (differenceMs <= 0) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    startButton.disabled = false;
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

function onStartTimer() {
  startButton.disabled = true;
  let timerId = setInterval(() => {
    let timerValueMs = selectedDatesMs - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timerValueMs);
    if (days === 0 && minutes === 0 && hours === 0 && seconds === 0) {
      clearInterval(timerId);
    }
    let renderTimer = `
      <div class="field">
        <span class="value" data-days>${addLeadingZero(days)}</span>
        <span class="label">Days</span>
      </div>
      <div class="field">
        <span class="value" data-hours>${addLeadingZero(hours)}</span>
        <span class="label">Hours</span>
      </div>
      <div class="field">
        <span class="value" data-minutes>${addLeadingZero(minutes)}</span>
        <span class="label">Minutes</span>
      </div>
      <div class="field">
        <span class="value" data-seconds>${addLeadingZero(seconds)}</span>
        <span class="label">Seconds</span>
      </div>
    `;
    timerEl.innerHTML = renderTimer;
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
