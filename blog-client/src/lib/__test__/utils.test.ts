import { escapeForUrl, formatDate } from '../utils';

describe('utils', () => {
  it('escapeForUrl', () => {
    const samples = [
      '한글로된 텍스트 사이에 스페이스',
      'title with English',
      'title-with-%-special-characters',
      '   trim    ',
    ];
    const escaped = samples.map(escapeForUrl);
    expect(escaped).toEqual([
      '한글로된-텍스트-사이에-스페이스',
      'title-with-English',
      'title-with-special-characters',
      'trim',
    ]);
    console.log(escaped);
  });
  describe('formatDate util func', () => {
    const now = Date.now();
    const justNow = new Date(now - 1000 * 60).toString();
    const fiveMinsBefore = new Date(Date.now() - 1000 * 60 * 5).toString();
    const yesterday = new Date(now - 1000 * 60 * 60 * 24).toString();
    const twoDaysAgo = new Date(now - 1000 * 60 * 60 * 48).toString();
    const tenDaysAgo = new Date(now - 1000 * 60 * 60 * 24 * 10).toString();
    it('shows. just now', () => {
      expect(formatDate(justNow)).toBe('방금 전');
    });
    it('shows five minutes before', () => {
      expect(formatDate(fiveMinsBefore)).toBe('5분 전');
    });
    it('shows yesterday', () => {
      expect(formatDate(yesterday)).toBe('어제');
    });
    it('shows twoDaysAgo', () => {
      expect(formatDate(twoDaysAgo)).toBe('2일 전');
    });
    it('shows ten days ago as a date', () => {
      const result = formatDate(tenDaysAgo);
      console.log(result);
      const match = /^\d{4}년 \d{1,2}월 \d{1,2}일$/.test(result);
      expect(match).toBeTruthy();
    });
    it('shows ten days ago as a date', () => {
      const result = formatDate(tenDaysAgo);
      const match = /^\d{4}년 \d{1,2}월 \d{1,2}일$/.test(result);
      expect(match).toBeTruthy();
    });
  });
});
