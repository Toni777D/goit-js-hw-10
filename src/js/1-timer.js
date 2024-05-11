// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

flatpickr('#datetime-picker', options);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
let userSelectedDate = new Date(options.onClose);

const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');

dateTimePicker.addEventListener('change', () => {
  const selectedDate = new Date(dateTimePicker.value);
  if (selectedDate <= new Date()) {
    iziToast.show({
      title: 'Hey',
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
    const different = selectedDate - now;

    if (different <= 0) {
      clearInterval(countdown);
      updateTime(0);
      dateTimePicker.disabled = false;
    } else {
      updateTime(different);
    }
  }, 1000);
});

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function updateTime(ms) {
  const { days, hours, minutes, seconds } = convertMs;
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
}
