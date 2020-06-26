import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'

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

  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment hour is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;