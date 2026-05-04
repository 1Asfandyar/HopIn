import { describe, expect, it } from '@jest/globals';
import { formatDateAndTime, isFutureDateTime } from '@/utils/date';

describe('date utilities', () => {
  it('formats empty dates as an empty string', () => {
    expect(formatDateAndTime(null)).toBe('');
  });

  it('detects past dates', () => {
    expect(isFutureDateTime(new Date('2020-01-01T00:00:00.000Z'))).toBe(false);
  });
});
