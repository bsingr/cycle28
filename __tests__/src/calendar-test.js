import CalendarModel from "../../src/calendarModel";

it('returns days', () => {
  const c = new CalendarModel();
});

it('calculates intervals days', () => {
  const c = new CalendarModel();
  c.add('2019-01-01')
  c.add('2019-01-02')
  c.add('2019-02-01')
  c.add('2019-03-02')
  c.add('2019-03-03')
  c.add('2019-03-04')
  c.add('2019-04-01')
  c.add('2019-04-02')
  c.add('2019-05-01')
  c.add('2019-05-02')
  c.add('2019-05-03')
  expect(c.getIntervals()).toEqual([
    {length: 2, nextInterval: 30},
    {length: 1, nextInterval: 29},
    {length: 3, nextInterval: 28},
    {length: 2, nextInterval: 29},
    {length: 3}
  ])
});

it('calculates intervals days', () => {
  const c = new CalendarModel();
  c.add('2019-01-01')
  c.add('2019-01-02')
  c.add('2019-02-01')
  c.add('2019-03-02')
  c.add('2019-03-03')
  c.add('2019-03-04')
  c.add('2019-04-01')
  c.add('2019-04-02')
  c.add('2019-05-01')
  c.add('2019-05-02')
  c.add('2019-05-03')
  expect(c.getIntervals()).toEqual([
    {length: 2, nextInterval: 30},
    {length: 1, nextInterval: 29},
    {length: 3, nextInterval: 28},
    {length: 2, nextInterval: 29},
    {length: 3}
  ])
});

it('calculates intervals days', () => {
  const c = new CalendarModel({}, '2019-04-01');
  c.add('2019-01-01')
  c.add('2019-01-02')
  c.add('2019-02-01')
  c.add('2019-03-02')
  c.add('2019-03-03')
  c.add('2019-03-04')
  expect(c.getIntervalStats()).toEqual({
    p90Interval: 29,
    p90Length: 2,
    whenWasLastInterval: 'a month',
    lengthOfLastInterval: 3
  })
});
