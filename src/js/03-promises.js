const form = document.querySelector('.form');
let delay = form.delay.value;
let step = form.step.value;
let amount = form.amount.value;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  for (let i = 1; i <= amount; i++) {
    if (i == 1) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    } else {
      createPromise(i, step)
        .then(({ position, step }) => {
          console.log(`✅ Fulfilled promise ${position} in ${step}ms`);
        })
        .catch(({ position, step }) => {
          console.log(`❌ Rejected promise ${position} in ${step}ms`);
        });
    }
  }
});