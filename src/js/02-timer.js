import flatpickr from "flatpickr";
import notiflix from "notiflix"
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

let intervalId = null;
let getTimeData = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    dateFormat: 'F j, Y H:i',
    minuteIncrement: 1,

    onOpen() {
        clearInterval(intervalId);
        refs.days.textContent = '00';
        refs.hours.textContent = '00';
        refs.minutes.textContent = '00';
        refs.seconds.textContent = '00';
    },

    onClose(selectedDates) {
        getTimeData = (selectedDates[0]).getTime();

        if (getTimeData < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            refs.startBtn.setAttribute('disabled', true);
            return;
        }
        refs.startBtn.removeAttribute('disabled');
    },
};

flatpickr('input#datetime-picker', options);

refs.startBtn.addEventListener('click', startButton)
refs.startBtn.setAttribute('disabled', true);

function startButton() {
    intervalId = setInterval(() => {
        const deltaTime = getTimeData - new Date().getTime();

        if (deltaTime <= 0) {
            clearInterval(intervalId);
            return;
        }
        showTimerOnScreen(convertMs(deltaTime));
    }, 1000);

    refs.startBtn.setAttribute('disabled', true);
}

function showTimerOnScreen({ days, hours, minutes, seconds }) {

    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute)) / second);

    return { days, hours, minutes, seconds };
}
