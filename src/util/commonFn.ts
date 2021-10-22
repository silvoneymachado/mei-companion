export function getDateMonthRange(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const lastDay = getDaysInMonth(year, month);
  const startDate = `${year}-${resolveMonth(month)}-01`;
  const endDate = `${year}-${resolveMonth(month)}-${lastDay}`;

  return {
    startDate,
    endDate,
  };
}

export function lastDayMonth(y: number, m: number) {
  return new Date(y, m, 1).getDate();
}

export function getDaysInMonth(y: number, m: number) {
  return m === 2
    ? y & 3 || (!(y % 25) && y & 15)
      ? 28
      : 29
    : 30 + ((m + (m >> 3)) & 1);
}

function resolveMonth(month: number) {
    if(String(month).length === 1) return `0${month}`;
    return month;
}
