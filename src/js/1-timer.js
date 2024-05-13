import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');

dateTimePicker.addEventListener('change', () => {
  const selectedDate = new Date(dateTimePicker.value);
  if (selectedDate <= new Date()) {
    startButton.disabled = true;
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
  } else {
    startButton.disabled = false;
  }
});

let countdown;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  dateTimePicker.disabled = true;
  clearInterval(countdown);

  const selectedDate = new Date(dateTimePicker.value).getTime();

  countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = selectedDate - now;

    if (distance <= 0) {
      clearInterval(countdown);
      updateTime(0);
      dateTimePicker.disabled = false;
    } else {
      updateTime(distance);
    }
  }, 1000);
});

function updateTime(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  value = '' + value;
  return value.padStart(2, '0');
}
