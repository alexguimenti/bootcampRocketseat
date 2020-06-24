import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import { startOfHour } from 'date-fns';

/**
 * Recebimento das infos
 * Tratativa de erros/excessões
 * Acesso ao repositório
 */
// todo service tem um único método

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment hour is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    });
    return appointment;
  }
}

export default CreateAppointmentService;