const form = document.querySelector('.form');
let delay = document.querySelector('[name = "delay"]');
let step = document.querySelector('[name = "step"]');
let amount = document.querySelector('[name = "amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(position, delay);
      } else {
        // Reject
        reject(position, delay);
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const delayNum = Number(delay.value);
  const stepNum = Number(step.value);
  const amountNum = Number(amount.value);
  for (let i = 1; i <= amountNum; i++) {
    if (i == 1) {
      createPromise(i, delayNum)
        .then((position, delayNum) => {
          console.log(`✅ Fulfilled promise ${position} in ${delayNum}ms`);
        })
        .catch((position, delayNum) => {
          console.log(`❌ Rejected promise ${position} in ${delayNum}ms`);
        });
    } else {
      createPromise(i, stepNum)
        .then((position, stepNum) => {
          console.log(`✅ Fulfilled promise ${position} in ${stepNum}ms`);
        })
        .catch((position, stepNum) => {
          console.log(`❌ Rejected promise ${position} in ${stepNum}ms`);
        });
    }
  }
});
