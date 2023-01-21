export default class CountdownTimer {
  private endTime: Date;

  private second: number;

  private minute: number;

  private hour: number;

  private day: number;

  private timer: any;

  constructor(endTime: Date) {
    this.endTime = endTime;
    this.second = 1000;
    this.minute = this.second * 60;
    this.hour = this.minute * 60;
    this.day = this.hour * 24;
  }

  start() {
    const now = new Date();

    const distance = this.endTime.getTime() - now.getTime();
    if (distance < 0) {
      clearInterval(this.timer);
      console.log('EXPIRED!');
      return;
    }
    const days = Math.floor(distance / this.day);
    const hours = Math.floor((distance % this.day) / this.hour);
    const minutes = Math.floor((distance % this.hour) / this.minute);
    const seconds = Math.floor((distance % this.minute) / this.second);

    // document.getElementById('countdown')!.innerHTML = `${days}days `;
    // document.getElementById('countdown')!.innerHTML += `${hours}hrs `;
    // document.getElementById('countdown')!.innerHTML += `${minutes}mins `;
    // document.getElementById('countdown')!.innerHTML += `${seconds}secs`;

    console.log(days, hours, minutes, seconds);
    this.timer = setInterval(this.start, 1000);
  }
}

const endTime = new Date();
endTime.setSeconds(endTime.getSeconds() + 10);
const timer = new CountdownTimer(endTime);
timer.start();
