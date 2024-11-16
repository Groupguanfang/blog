export function dateToYearWithMonth(str: string) {
  return `${new Date(str).getFullYear()}-${(new Date(str).getMonth() + 1 < 10)
    ? `0${new Date(str).getMonth() + 1}`
    : new Date(str).getMonth() + 1}`
}
