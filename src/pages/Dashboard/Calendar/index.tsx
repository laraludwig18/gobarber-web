import React from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container } from './styles';

interface CalendarProps {
  currentDate: Date;
  selectedDate: Date;
  disabledDays: Date[];
  handleDateChange(day: Date, modifiers: DayModifiers): void;
  handleMonthChange(month: Date): void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  selectedDate,
  handleDateChange,
  handleMonthChange,
  disabledDays,
}) => {
  return (
    <Container>
      <DayPicker
        fromMonth={currentDate}
        disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
        modifiers={{
          available: { daysOfWeek: [1, 2, 3, 4, 5] },
        }}
        selectedDays={selectedDate}
        onDayClick={handleDateChange}
        onMonthChange={handleMonthChange}
        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
        months={[
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ]}
      />
    </Container>
  );
};

export default Calendar;
