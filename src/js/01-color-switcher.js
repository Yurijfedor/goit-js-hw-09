const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
  bodyEl: document.body,
};
let timerId = null;

refs.startButton.addEventListener('click', startChangeColorBody);
refs.stopButton.addEventListener('click', stopChangeColorBody);

function startChangeColorBody() {
  timerId = setInterval(() => {
    const bgColor = getRandomHexColor();
    refs.bodyEl.style.backgroundColor = bgColor;
  }, 1000);
  refs.startButton.disabled = true;
}
function stopChangeColorBody() {
  clearInterval(timerId);
  refs.startButton.disabled = false;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
