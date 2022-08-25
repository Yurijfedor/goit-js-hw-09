import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  createButton: document.querySelector('.form > button[type="submit"]'),
  formDelay: document.querySelector('[name="delay"]'),
  formStep: document.querySelector('[name="step"]'),
  formAmount: document.querySelector('[name="amount"]'),
};

refs.createButton.addEventListener('click', event => {
  event.preventDefault();
  let amount = refs.formAmount.value;
  let userDelay = parseInt(refs.formDelay.value);
  let step = parseInt(refs.formStep.value);
  promisGenerator(amount, userDelay, step);
});

function promisGenerator(amountOfPromise, firstDelauMs, delauStepMs) {
  for (let i = 0; i < amountOfPromise; i += 1) {
    if (i !== 0) {
      firstDelauMs += delauStepMs;
    }
    createPromise(i + 1, firstDelauMs)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function changeBranche() {}
