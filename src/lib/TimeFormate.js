class TimeFormate {
  getTime(msTime) {
    const hours = this.formateUnit(Math.floor(msTime / (1000 * 60 * 60)));
    msTime = msTime % (1000 * 60 * 60);
    const minute = this.formateUnit(Math.floor(msTime / (1000 * 60)));
    msTime = msTime % (1000 * 60);
    const seconds = this.formateUnit(Math.floor(msTime / 1000));
    msTime = msTime % 1000;
    const milliseconds = this.formateUnit(msTime / 10);
    return `${hours}:${minute}:${seconds}:${milliseconds}`
  }

  formateUnit(time) {
    return time < 10 ? `0${time}` : time.toString()
  };
}

export default TimeFormate;