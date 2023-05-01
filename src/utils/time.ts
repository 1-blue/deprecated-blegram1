/**
 * 포멧 형식
 * 년: YY or YYYY
 * 월: M or MM
 * 일: D or DD
 * 시: h or hh
 * 분: m or mm
 * 초: s or ss
 *
 * 예시: YYYY-MM-DD-hh-mm-ss
 */

/**
 * 날짜값을 정해진 포멧 형식으로 변환
 * @param value number | Date
 * @param format 포멧 형식 + 구분자형태로 입력 ex) "YYYY-MM-DD-hh-mm-ss"
 * @param separator 전체적으로 적용할 구분자
 * @returns string형식으로 포멧해서 반환
 */
export const dateFormat = (
  value: Date | number,
  format: string,
  separator?: string
) => {
  const date = new Date(value);

  const dateArray: (number | string | undefined)[] = [];
  let result = "";
  /**
   * 구분자만 추출 ( YYYY년MM월DD일 ---> ["년", "월", "일"] )
   * 현재 문제는 한글자만 구분자로 입력이 가능함
   * 이 문제를 해결하기 위해서 3번째 인자로 "separator"를 받고 "separator"가 존재한다면 모든 구분자를 "separator"로 대체함
   */
  const separatorList = format.match(/[^YMDhms]/g);
  let separatorIndex = 0;

  dateArray.push(yearFormat(date, format));
  dateArray.push(monthFormat(date, format));
  dateArray.push(dayFormat(date, format));
  dateArray.push(hourFormat(date, format));
  dateArray.push(minuteFormat(date, format));
  dateArray.push(secondFormat(date, format));

  dateArray.forEach((v) => {
    // undefined일 경우 즉, 포멧하지 않거나 잘못된 입력인 경우 제외
    if (!v) return;

    // 구분자를 정해줬다면
    if (separator) return (result += `${v}${separator}`);
    else {
      let targetSeparator: string = "";

      if (!separatorList) separator = "";
      else targetSeparator = separatorList[separatorIndex] || "";

      separatorIndex++;

      result += `${v}${targetSeparator}`;
    }
  });

  return result;
};

/**
 * 날짜값을 현재 시간 기준으로 지난 시간으로 반환
 * @param value number | Date
 * @returns 지난 시간을 초/분/시/일/개월 단위로 나눠서 string형태로 반환
 */
export const timeFormat = (value: Date | number) => {
  const date = new Date(value);

  const temp = new Date().getTime() - date.getTime();

  // 1분이하
  if (temp / 1000 < 60) {
    return `${Math.floor(temp / 1000)}초전`;
  }
  // 1시간이하
  if (temp / 1000 / 60 < 60) {
    return `${Math.floor(temp / 1000 / 60)}분전`;
  }
  // 1일이하
  if (temp / 1000 / 60 / 60 < 24) {
    return `${Math.floor(temp / 1000 / 60 / 60)}시간전`;
  }
  // 1월이하
  if (temp / 1000 / 60 / 60 / 24 < 30) {
    return `${Math.floor(temp / 1000 / 60 / 60 / 24)}일전`;
  }
  // 1년이하
  if (temp / 1000 / 60 / 60 / 24 / 30 < 12) {
    return `${Math.floor(temp / 1000 / 60 / 60 / 24 / 30)}개월전`;
  }
  // 1년 이상
  return `${Math.floor(temp / 1000 / 60 / 60 / 24 / 30 / 12)}년전`;
};

/**
 * 일주일 이내면 지난 시간( x분전, x일전 등 ) 아니면 날짜로 반환
 * @param value number | Date
 * @param format 포멧 형식 + 구분자형태로 입력 ex) "YYYY-MM-DD-hh-mm-ss"
 * @returns string형식으로 포멧 or 지난 시간으로 반환
 */
export const dateOrTimeFormat = (value: number | Date, format: string) => {
  // 일주일 이후
  if (Date.now() - new Date(value).getTime() > 1000 * 60 * 60 * 24 * 7)
    return dateFormat(value, format);
  else return timeFormat(value);
};

/**
 * 플레이 시간 변환기 ( 90초 -> 01:30 )
 * @param duration 현재 플레이 시간
 * @returns 포멧된 플레이 시간
 */
export const playTimeConverter = (duration: string | number): string => {
  if (+duration >= 60) {
    return `${Math.floor(+duration / 60)} : ${+duration % 60}`;
  }
  return `0:${+duration % 60}`;
};

type Time = "year" | "month" | "day" | "hour" | "minute" | "second";
/**
 *
 * @param time 처리할 정규 표현식 종류
 * @returns "time"에 해당하는 정규 표현식 반환
 */
const getTimeRegexp = (time: Time) => {
  switch (time) {
    case "year":
      return /Y{2}/g;
    case "month":
      return /M/g;
    case "day":
      return /D/g;
    case "hour":
      return /h/g;
    case "minute":
      return /m/g;
    case "second":
      return /s/g;
  }
};

/**
 * year 포멧
 * @param date Date 형식
 * @param format 포멧 형식 입력
 * @returns 포멧 형식에 맞게 "2022" or "22"처럼 반환
 */
const yearFormat = (date: Date, format: string) => {
  const result = format.match(getTimeRegexp("year"));

  // 입력하지 않거나 잘못된 입력 ( "YY" or "YYYY"가 아님 )
  if (result === null) return;

  // "YY" ---> 22
  if (result.length === 1) return +String(date.getFullYear()).slice(2);
  // "YYYY" ---> 2022
  if (result.length === 2) return date.getFullYear();
};

/**
 * month 포멧
 * @param date Date 형식
 * @param format 포멧 형식 입력
 * @returns 포멧 형식에 맞게 "06" or "6"처럼 반환
 */
const monthFormat = (date: Date, format: string) => {
  let month = null;
  const result = format.match(getTimeRegexp("month"));

  // 입력하지 않거나 잘못된 입력
  if (result === null) return;

  // 월에는 "+1"을 해줘야 날짜가 맞음
  month = date.getMonth() + 1;

  // "MM"일 때 ( 06 )
  if (result.length === 2 && month < 10) {
    month = `0${month}`;
  }

  // "M"일 때 ( 6 )
  return month;
};

/**
 * day 포멧
 * @param date Date 형식
 * @param format 포멧 형식 입력
 * @returns 포멧 형식에 맞게 "06" or "6"처럼 반환
 */
const dayFormat = (date: Date, format: string) => {
  let day = null;
  const result = format.match(getTimeRegexp("day"));

  // 입력하지 않거나 잘못된 입력
  if (result === null) return;

  day = date.getDate();

  // "DD"일 때 ( 06 )
  if (result.length === 2 && day < 10) {
    day = `0${day}`;
  }

  // "D"일 때 ( 6 )
  return day;
};

/**
 * hour 포멧
 * @param date Date 형식
 * @param format 포멧 형식 입력
 * @returns 포멧 형식에 맞게 "06" or "6"처럼 반환
 */
const hourFormat = (date: Date, format: string) => {
  let hour = null;
  const result = format.match(getTimeRegexp("hour"));

  // 입력하지 않거나 잘못된 입력
  if (result === null) return;

  hour = date.getHours();

  // "hh"일 때 ( 06 )
  if (result.length === 2 && hour < 10) {
    hour = `0${hour}`;
  }

  // "h"일 때 ( 06 )
  return hour;
};

/**
 * minute 포멧
 * @param date Date 형식
 * @param format 포멧 형식 입력
 * @returns 포멧 형식에 맞게 "06" or "6"처럼 반환
 */
const minuteFormat = (date: Date, format: string) => {
  let minute = null;
  const result = format.match(getTimeRegexp("minute"));

  // 입력하지 않거나 잘못된 입력
  if (result === null) return;

  minute = date.getMinutes();

  // "mm"일 때 ( 06 )
  if (result?.length === 2 && minute < 10) {
    minute = `0${minute}`;
  }

  // "m"일 때 ( 6 )
  return minute;
};

/**
 * second 포멧
 * @param date Date 형식
 * @param format 포멧 형식 입력
 * @returns 포멧 형식에 맞게 "06" or "6"처럼 반환
 */
const secondFormat = (date: Date, format: string) => {
  let second = null;
  const result = format.match(getTimeRegexp("second"));

  // 입력하지 않거나 잘못된 입력
  if (result === null) return;

  second = date.getSeconds();

  // "ss"일 때 ( 06 )
  if (result?.length === 2 && second < 10) {
    second = `0${second}`;
  }

  // "s"일 때 ( 6 )
  return second;
};
