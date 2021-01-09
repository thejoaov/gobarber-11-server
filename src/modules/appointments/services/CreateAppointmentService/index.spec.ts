import AppError from '@shared/errors/AppError'
import 'reflect-metadata'
import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from '.'

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository()
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    )

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '121212',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('121212')
  })

  it('should not be able to create a new appointment with the same date', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository()
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    )

    const appointmentDate = new Date(2020, 4, 10, 11)

    const appointment = await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '121212',
    })

    expect(appointment).toBeTruthy()
    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
