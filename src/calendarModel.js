import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

import percentile from './percentile'

export default class Calendar {
  constructor(menstruationDays, today) {
    this.menstruationDays = menstruationDays || {};
    this.today = today || dayjs().format('YYYY-MM-DD');
    this.update();
  }

  getMenstruationDays() {
    return this.menstruationDays;
  }

  getToday() {
    return this.today;
  }

  getIntervals() {
    return this.intervals;
  }

  getIntervalStats() {
    return this.intervalStats;
  }

  add(rawDay) {
    this.menstruationDays[rawDay] = this.defaultDay()
    this.update();
  }

  remove(rawDay) {
    delete this.menstruationDays[rawDay]
    this.update();
  }

  dump() {
    return Object.keys(this.menstruationDays);
  }

  load(rawDays) {
    this.menstruationDays = {}
    rawDays.forEach(day => {
      this.menstruationDays[day] = this.defaultDay()
    })
    this.update();
  }

  defaultDay() {
    return {color: '#cc0000', textColor: 'white'}
  }

  update() {
    this.updateIntervalMarkers();
    this.updateIntervalDurationAndDistances();
    this.updateIntervalStats();
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

  updateIntervalDurationAndDistances() {
    this.intervals = this.calculateIntervals()
  }

  updateIntervalStats() {
    this.intervalStats = this.calculateIntervalStats()
  }

  calculateIntervalStats() {
    const intervals = this.getIntervals();
    return {
      whenWasLastInterval: this.calculateWhenWasLastInterval(),
      lengthOfLastInterval: intervals.length > 0 ? intervals[intervals.length - 1].length : 0,
      p90Interval: percentile(intervals.filter(i => typeof i.nextInterval === 'number').map(i => i.nextInterval), 0.9),
      p90Length: percentile(intervals.filter(i => typeof i.length === 'number').map(i => i.length), 0.9)
    }
  }

  calculateWhenWasLastInterval() {
    const days = Object.keys(this.menstruationDays).sort();
    const lastDay = days[days.length - 1]
    return dayjs(this.getToday()).from(lastDay, true)
  }

  calculateIntervals() {
    const days = Object.keys(this.menstruationDays).sort();
    const intervals = []
    for (let [idx, day] of days.entries()) {
      const dayRecord = this.menstruationDays[day];

      if (dayRecord.startingDay) {
        // old interval => update its distance
        if (idx > 0) {
          const previousDay = days[idx - 1]
          intervals[intervals.length - 1].nextInterval = dayjs(day).diff(previousDay, 'day')
        }

        // new interval => start it
        intervals.push({length: 1})
      } else {
        // no new interval, but previous item => increase length of interval
        if (idx > 0) {
          intervals[intervals.length - 1].length = intervals[intervals.length - 1].length + 1
        }
      }
    }
    return intervals
  }
}
