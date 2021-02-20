import Sentry from '@sentry/node'
import '@sentry/tracing'
// import * as Tracing from '@sentry/tracing'

export default class SentryError {
  public init = (): void => {
    return Sentry.init({
      dsn:
        'https://a51bdc4c4a254cc49329a2a4309d5907@o293659.ingest.sentry.io/5645704',

      // We recommend adjusting this value in production, or using tracesSampler
      // for finer control
      tracesSampleRate: 1.0,
    })
  }

  public captureError = (error: Error): void => {
    Sentry.captureException(error)
  }
}
