
//таймер запускается по клику на него 


class CountdownTimer {
  //привязка компонентов таймера к элементам HTML разметки
  constructor(selector, targetDate) {
    this.selector = document.querySelector(`${selector}`); //id = selector  будет указан в параметрах экземпляра класса

    this.timerDaysRef = this.selector.firstElementChild.firstElementChild;
    this.timerHoursRef =
      this.selector.firstElementChild.nextElementSibling.firstElementChild;
    this.timerMinsRef =
      this.selector.lastElementChild.previousElementSibling.firstElementChild;
    this.timerSecsRef = this.selector.lastElementChild.firstElementChild;

    this.intervalId = null;
    this.targetDate = new Date(targetDate);
    if (this.targetDate < Date.now()) {
      this.alarm();
    }
    this.selector.addEventListener("click", () => {
      this.selector.classList.toggle("running");
      if (this.selector.classList.contains("running")) {
        this.run();
      } else {
        this.stop();
      }
    });
  }
    // методы класса
  alarm() {//сообщает, что в экземпляре установлена неправильная дата назначения
          return this.selector.insertAdjacentHTML('afterend', "<div style='background-color:tomato;'><p style='color:yellow; font-size:30px;font-weight:700;'>CANNOT SET THE DATE FROM THE PAST AS TARGET DATE FOR COUNTDOWN!!! SET ANOTHER DATE!</p></div>");
  };
  run() {
    this.intervalId = setInterval(() => {
      const time = this.targetDate - Date.now();
      if (time < 1000) { this.timerSecsRef.textContent = '00'; return this.stop();}
      const humanFormatTime = this.timeComponents(time);
      this.updateClockFace(humanFormatTime);
    }, 1000);
  };
  stop() {
    clearInterval(this.intervalId);
  };
  // метод перевода милисекунд в дни,часы, минуты, секунды
  timeComponents(time) {
    const secs = String(Math.floor((time % (1000 * 60)) / 1000)).padStart(2,'0');
    const mins = String(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))).padStart(2,'0');
    const hours = String(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2,'0');
    const days = String(Math.floor(time / (1000 * 60 * 60 * 24))).padStart(2, '0');
    return { days, hours, mins, secs };
  };
// метод вывода значений таймера в интерфейс
 updateClockFace({ days, hours, mins, secs }=this.timeComponents) {
    this.timerDaysRef.textContent = days;
    this.timerDaysRef.nextElementSibling.textContent =days=== "01" ? "day" : "days";

    this.timerHoursRef.textContent = hours;
    this.timerHoursRef.nextElementSibling.textContent = hours=== '01' ? "hour" : "hours";

    this.timerMinsRef.textContent = mins;
    this.timerMinsRef.nextElementSibling.textContent = mins=== '01' ? "minute" : "minutes";

    this.timerSecsRef.textContent = secs;
    this.timerSecsRef.nextElementSibling.textContent = secs === '01' ? 'second' : 'seconds';
    
  };
}


timer = new CountdownTimer("#timer-1","Aug 09, 2021 21:26"); //создаем экземпляр класса,и задаем целевую дату/ время


