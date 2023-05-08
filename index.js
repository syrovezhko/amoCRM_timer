const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

inputEl.focus();

let interval = null;

function convertSeconds(time) {
  const totalMin = Math.floor(time / 60);
  const seconds = time % 60;
  const hours = Math.floor(totalMin / 60);
  const minutes = totalMin % 60;

  let result = isZeroNeeded(hours) + ':' + isZeroNeeded(minutes) + ':' + isZeroNeeded(seconds);

  return result;
};

function isZeroNeeded(time){
  let result = `${time < 10 ? '0'+ time : time}`;
  return result;
}

const createTimerAnimator = () => {
  return (seconds) => {
    interval = setInterval(() => {
      timerEl.innerText = convertSeconds(seconds);
      if (seconds <= 0) {
        location.reload();
      }
      seconds--;
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/\D/g,'');
})

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  if (interval) clearInterval(interval)
  buttonEl.innerText = "Stop";
  animateTimer(seconds);
  inputEl.value = '';
});