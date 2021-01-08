import 'reflect-metadata'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService'

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
})
