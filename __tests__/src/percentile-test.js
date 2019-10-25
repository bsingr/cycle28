import percentile from "../../src/percentile";

it('calculates p40', () => {
  expect(percentile([1,2,3,4,5,6,7,8,9,10], 0.4)).toEqual(4)
  expect(percentile([1,2,3,4,5,6,7,8,9,10].reverse(), 0.4)).toEqual(4)
})

it('calculates p50', () => {
  expect(percentile([1,2,3,4,5,6,7,8,9,10], 0.5)).toEqual(5)
  expect(percentile([1,2,3,4,5,6,7,8,9,10].reverse(), 0.5)).toEqual(5)
})

it('calculates p90', () => {
  expect(percentile([1,2,3,4,5,6,7,8,9,10], 0.9)).toEqual(9)
  expect(percentile([1,2,3,4,5,6,7,8,9,10].reverse(), 0.9)).toEqual(9)
})
