// Components/SimplePersianDatePicker.jsx - یک کامپوننت تقویم فارسی ساده
import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const SimplePersianDatePicker = ({ value, onChange, placeholder, className, disabled }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  const [year, setYear] = useState(1404);
  const [month, setMonth] = useState(1);
  const calendarRef = useRef(null);

  // تبدیل تاریخ میلادی به شمسی
  const toJalali = (gy, gm, gd) => {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    let jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    let jm = ~~(days / 31);
    days %= 31;
    return { year: jy + ~~(jm / 5) + 1, month: jm % 5 + 1, day: days + 1 };
  };

  // تبدیل تاریخ شمسی به میلادی
  const toGregorian = (jy, jm, jd) => {
    jy += 1595;
    let days = -355668 + (365 * jy) + ~~((jy + 3) / 33) + ~~((jy - 1) / 33);
    let jm1 = jm - 1;
    days += (jm1 < 6) ? (31 * jm1) : (186 + (30 * (jm1 - 6)));
    days += jd - 1;
    let gy = 400 * ~~(days / 146097);
    days %= 146097;
    gy += 100 * ~~(days / 36524);
    days %= 36524;
    gy += 4 * ~~(days / 1461);
    days %= 1461;
    gy += ~~((days + 3) / 365);
    let gd = days - (365 * ~~((days + 3) / 365));
    let gm = 1;
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    while (gm <= 12 && gd >= g_d_m[gm]) gm++;
    gm--;
    gd -= g_d_m[gm];
    return { year: gy, month: gm, day: gd + 1 };
  };

  // گرفتن تاریخ امروز شمسی
  const getToday = () => {
    const today = new Date();
    return toJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
  };

  useEffect(() => {
    if (value) {
      const parts = value.split('-');
      if (parts.length === 3) {
        const gDate = new Date(parts[0], parts[1] - 1, parts[2]);
        const jDate = toJalali(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
        setDisplayValue(`${jDate.year}/${String(jDate.month).padStart(2, '0')}/${String(jDate.day).padStart(2, '0')}`);
        setYear(jDate.year);
        setMonth(jDate.month);
      }
    } else {
      const today = getToday();
      setDisplayValue(`${today.year}/${String(today.month).padStart(2, '0')}/${String(today.day).padStart(2, '0')}`);
      setYear(today.year);
      setMonth(today.month);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  const getMonthName = (m) => {
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    return months[m - 1];
  };

  const getDaysInMonth = (y, m) => {
    if (m <= 6) return 31;
    if (m <= 11) return 30;
    return (y % 33 === 1 || y % 33 === 2 || y % 33 === 3 || y % 33 === 4) ? 30 : 29;
  };

  const getWeekDays = () => ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  const getFirstDayOfMonth = (y, m) => {
    const gDate = toGregorian(y, m, 1);
    const date = new Date(gDate.year, gDate.month - 1, gDate.day);
    let day = date.getDay();
    return day === 0 ? 7 : day;
  };

  const handleDateSelect = (day) => {
    if (day) {
      const gDate = toGregorian(year, month, day);
      const formattedDate = `${gDate.year}-${String(gDate.month).padStart(2, '0')}-${String(gDate.day).padStart(2, '0')}`;
      setDisplayValue(`${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`);
      onChange(formattedDate);
      setShowCalendar(false);
    }
  };

  const handleManualChange = (e) => {
    const val = e.target.value;
    setDisplayValue(val);
    const parts = val.split('/');
    if (parts.length === 3) {
      const y = parseInt(parts[0]);
      const m = parseInt(parts[1]);
      const d = parseInt(parts[2]);
      if (!isNaN(y) && !isNaN(m) && !isNaN(d) && m >= 1 && m <= 12 && d >= 1 && d <= getDaysInMonth(y, m)) {
        const gDate = toGregorian(y, m, d);
        onChange(`${gDate.year}-${String(gDate.month).padStart(2, '0')}-${String(gDate.day).padStart(2, '0')}`);
      }
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = getToday();
    const days = [];

    for (let i = 1; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = (today.year === year && today.month === month && today.day === d);
      const isSelected = (displayValue === `${year}/${String(month).padStart(2, '0')}/${String(d).padStart(2, '0')}`);
      days.push(
        <div
          key={d}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateSelect(d)}
        >
          {d}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (delta) => {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  const changeYear = (delta) => {
    setYear(year + delta);
  };

  return (
    <div className="persian-datepicker-wrapper" ref={calendarRef}>
      <div className="date-input-wrapper" onClick={() => !disabled && setShowCalendar(!showCalendar)}>
        <FaCalendarAlt className="calendar-icon" />
        <input
          type="text"
          value={displayValue}
          onChange={handleManualChange}
          placeholder={placeholder || "سال/ماه/روز"}
          className={`form-input date-input ${className || ''}`}
          disabled={disabled}
        />
      </div>
      {showCalendar && !disabled && (
        <div className="calendar-popup">
          <div className="calendar-header">
            <button onClick={() => changeYear(-1)} className="year-btn">««</button>
            <button onClick={() => changeMonth(-1)} className="month-btn">«</button>
            <span className="month-year">{getMonthName(month)} {year}</span>
            <button onClick={() => changeMonth(1)} className="month-btn">»</button>
            <button onClick={() => changeYear(1)} className="year-btn">»»</button>
          </div>
          <div className="calendar-weekdays">
            {getWeekDays().map(day => <div key={day} className="weekday">{day}</div>)}
          </div>
          <div className="calendar-days">
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimplePersianDatePicker;