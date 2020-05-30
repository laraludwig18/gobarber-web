import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { DayModifiers } from 'react-day-picker';
import {
  isWeekend,
  isToday,
  format,
  parseISO,
  isAfter,
  isSaturday,
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiClock } from 'react-icons/fi';

import { useApiClient } from '../../services/apiClient';
import { useAuth } from '../../context/auth';

import Appointment from './Appointment';
import Calendar from './Calendar';
import Header from './Header';

import {
  Container,
  Content,
  Schedule,
  NextAppointment,
  Section,
} from './styles';

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
}

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const api = useApiClient();
  const { user } = useAuth();

  const currentDate = useMemo(() => {
    const todayDate = new Date();

    if (isWeekend(todayDate)) {
      const addDays = isSaturday(todayDate) ? 2 : 1;
      todayDate.setDate(todayDate.getDate() + addDays);
    }

    return todayDate;
  }, []);

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [currentMonth, setCurrentMonth] = useState(currentDate);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(
    () =>
      format(selectedDate, "'Dia' dd 'de' MMMM", {
        locale: ptBR,
      }),
    [selectedDate],
  );

  const selectedWeekDay = useMemo(() => {
    const weekDay = format(selectedDate, 'cccc', {
      locale: ptBR,
    });

    return `${weekDay.charAt(0).toUpperCase()}${weekDay.slice(1)}`;
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) => parseISO(appointment.date).getHours() < 12,
    );
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) => parseISO(appointment.date).getHours() >= 12,
    );
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  useEffect(() => {
    async function getMonthAvailability(): Promise<void> {
      const { data } = await api.get(
        `providers/${user.id}/month-availability`,
        {
          params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
          },
        },
      );

      setMonthAvailability(data);
    }

    getMonthAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, user.id]);

  useEffect(() => {
    async function getAppointments(): Promise<void> {
      const { data } = await api.get<Omit<Appointment, 'hourFormatted'>[]>(
        'appointments/me',
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      );

      const appointmentsFormatted = data.map((appointment) => ({
        ...appointment,
        hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
      }));

      setAppointments(appointmentsFormatted);
    }

    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.user.avatarUrl}
                  alt={nextAppointment.user.name}
                />

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}
          <Section>
            <strong>Manhã</strong>

            <Appointment appointments={morningAppointments} />
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment appointments={afternoonAppointments} />
          </Section>
        </Schedule>
        <Calendar
          handleDateChange={handleDateChange}
          handleMonthChange={handleMonthChange}
          selectedDate={selectedDate}
          currentDate={currentDate}
          disabledDays={disabledDays}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
