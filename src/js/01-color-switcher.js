function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('[data-start]');
    const stopButton = document.querySelector('[data-stop]');
    const body = document.body;
    let intervalId;

    startButton.addEventListener('click', function () {
        intervalId = setInterval(function () {
            const randomColor = getRandomHexColor();
            body.style.backgroundColor = randomColor;
        }, 1000);
    });

    stopButton.addEventListener('click', function () {
        clearInterval(intervalId)
    });
});
