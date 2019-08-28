/* eslint-disable no-undef */
import convertDate from '../client/utils/convertDate.js';

describe('convertDate', () => {
  test('should convert numbers from 1-12 to the corresponding month', () => {
    expect(convertDate('2019-01-28T06:21:43.448Z', ',')).toBe('January 28, 2019');
    expect(convertDate('2019-02-28T06:21:43.448Z', ',')).toBe('February 28, 2019');
    expect(convertDate('2019-03-28T06:21:43.448Z', ',')).toBe('March 28, 2019');
    expect(convertDate('2019-04-28T06:21:43.448Z', ',')).toBe('April 28, 2019');
    expect(convertDate('2019-05-28T06:21:43.448Z', ',')).toBe('May 28, 2019');
    expect(convertDate('2019-06-28T06:21:43.448Z', ',')).toBe('June 28, 2019');
    expect(convertDate('2019-07-28T06:21:43.448Z', ',')).toBe('July 28, 2019');
    expect(convertDate('2019-08-28T06:21:43.448Z', ',')).toBe('August 28, 2019');
    expect(convertDate('2019-09-28T06:21:43.448Z', ',')).toBe('September 28, 2019');
    expect(convertDate('2019-10-28T06:21:43.448Z', ',')).toBe('October 28, 2019');
    expect(convertDate('2019-11-28T06:21:43.448Z', ',')).toBe('November 28, 2019');
    expect(convertDate('2019-12-28T06:21:43.448Z', ',')).toBe('December 28, 2019');
  });
});
