interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'mailhog'

  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'mailhog',

  defaults: {
    from: {
      email: 'seu@email.com',
      name: 'Seu Nome',
    },
  },
} as IMailConfig
