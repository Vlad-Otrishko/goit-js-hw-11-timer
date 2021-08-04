const timerRef = document.querySelector(".timer");
const clockFaceDaysRef = document.querySelector('[data-value="days"]');
const clockFaceHoursRef = document.querySelector('[data-value="hours"]');
const clockFaceMinsRef = document.querySelector('[data-value="mins"]');
const clockFaceSecsRef = document.querySelector('[data-value="secs"]');



class CountdownTimer {
    constructor(targetDate) {
        this.selector = timerRef.id; //id, указанный в html разметке будет присвоен создаваемому экземпляру класса
        this.intervalId = null;
        this.targetDate = new Date(targetDate);
     
    }
    run() {
            this.intervalId = setInterval(() => {
                const time = this.targetDate - Date.now();
                const humanFormatTime = timeComponents(time);
                updateClockFace(humanFormatTime);
            }, 1000);
        
    }
    stop() {
        clearInterval(this.intervalId);
    }
}

// функция перевода милисекунд в дни,ч асы, минуты, секунды
function timeComponents(time) {
    const secs = String(Math.floor((time % (1000 * 60)) / 1000)).padStart(2,'0');
    const mins = String(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))).padStart(2,'0');
    const hours = String(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2,'0');
    const days = String(Math.floor(time / (1000 * 60 * 60 * 24))).padStart(2, '0');
    return { days, hours, mins, secs };
}
// Функция вывода значений таймера в интерфейс
function updateClockFace({ days, hours, mins, secs }=timeComponents) {
    clockFaceDaysRef.textContent = days;
    clockFaceDaysRef.nextElementSibling.textContent =days=== "01" ? "day" : "days";

    clockFaceHoursRef.textContent = hours;
    clockFaceHoursRef.nextElementSibling.textContent = hours=== '01' ? "hour" : "hours";

    clockFaceMinsRef.textContent = mins;
    clockFaceMinsRef.nextElementSibling.textContent = mins=== '01' ? "minute" : "minutes";

    clockFaceSecsRef.textContent = secs;
    clockFaceSecsRef.nextElementSibling.textContent = secs === '01' ? 'second' : 'seconds';
    
}
timer = new CountdownTimer("Aug 17, 2022"); //создаем экземпляр класса,и задаем целевую дату/ время


//запуск и остановк тайцмера по клику мыши
timerRef.addEventListener("click", () => {
  timerRef.classList.toggle("running");
    if (timerRef.classList.contains("running")) {
        timer.run();
    } else { timer.stop(); }
});


