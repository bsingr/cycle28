import dayjs from 'dayjs';

export default class Calendar {
  constructor(menstruationDays) {
    this.menstruationDays = menstruationDays || {};
  }

  getMenstruationDays() {
    return this.menstruationDays;
  }

  add(rawDay) {
    this.menstruationDays[rawDay] = {color: '#cc0000', textColor: 'white'}
    this.updateIntervalMarkers();
  }

  remove(rawDay) {
    delete this.menstruationDays[rawDay]
    this.updateIntervalMarkers();
  }

  dump() {
    return Object.keys(this.menstruationDays);
  }

  load(rawDays) {
    this.menstruationDays = {}
    rawDays.forEach(day => {
      this.menstruationDays[day] = {color: '#cc0000', textColor: 'white'}
    })
    this.updateIntervalMarkers();
  }

  updateIntervalMarkers() {
    const days = Object.keys(this.menstruationDays).sort();
    days.forEach((day, idx) => {
      delete this.menstruationDays[day].startingDay;
      delete this.menstruationDays[day].endingDay;
      if (idx === 0) {
        this.menstruationDays[day].startingDay = true;
      } else {
        const previousDay = dayjs(day).add(-1, 'day').format('YYYY-MM-DD')
        if (previousDay !== days[idx - 1]) {
          this.menstruationDays[day].startingDay = true;
        }
      }
      const nextDay = dayjs(day).add(1, 'day').format('YYYY-MM-DD')
      if (nextDay !== days[idx + 1]) {
        this.menstruationDays[day].endingDay = true;
      }
    })
  }
}
