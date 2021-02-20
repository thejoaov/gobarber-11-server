import Sentry from '@sentry/node'
import '@sentry/tracing'
// import * as Tracing from '@sentry/tracing'

export default class SentryError {
  public init = (): void => {
    return Sentry.init({
      dsn: process.env.SENTRY_DSN,
      // We recommend adjusting this value in production, or using tracesSampler
      // for finer control
      tracesSampleRate: 1.0,
    })
  }

  public captureError = (error: Error): void => {
    Sentry.captureException(error)
  }
}
