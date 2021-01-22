import { container } from 'tsyringe'

import mailConfig from '@config/mail'

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'
import IStorageProvider from './StorageProvider/models/IStorageProvider'

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'
import SESMailProvider from './MailProvider/implementations/SESMailProvider'
import IMailProvider from './MailProvider/models/IMailProvider'

import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'
import MailhogMailProvider from './MailProvider/implementations/MailhogMailProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
)

const mailProviders = {
  ethereal: container.resolve(EtherealMailProvider),
  mailhog: container.resolve(MailhogMailProvider),
  ses: container.resolve(SESMailProvider),
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProviders[mailConfig.driver],
)
