function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    bodyColor: document.body,
};

let intervalId;

refs.startBtn.addEventListener('click', startInterval);
refs.stopBtn.addEventListener('click', stopInterval);

function startInterval() {

    intervalId = setInterval(function () {
        const randomColor = getRandomHexColor();
        refs.bodyColor.style.backgroundColor = randomColor;
    }, 1000)

    refs.startBtn.setAttribute('disabled', true);
    refs.stopBtn.removeAttribute('disabled');
    console.log('Start generate');
}

function stopInterval() {
    clearInterval(intervalId)
    refs.startBtn.removeAttribute('disabled');
    refs.stopBtn.setAttribute('disabled', true);
    console.log('Stop generate');
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}