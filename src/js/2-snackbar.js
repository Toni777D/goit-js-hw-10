import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = form.querySelector("input[name='delay']");
    const delay = parseInt(delayInput.value);

    const stateInput = form.querySelector("input[name='state']:checked");
    const state = stateInput.value;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise.then(
      delay => {
        iziToast.success({
          title: 'Succes',
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
      },
      delay => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
        });
      }
    );
  });
});
