// Type definitions for canopi 1.3.1
// Project: https://github.com/robhaswell/canopi-node
// Definitions by: Mark Wibrow

declare module 'canopi' {
  import * as stream from 'stream'

  /**
   * Create a new logger with the supplied name to be attached to each output.
   * @param {string} id - Name to attach to logging output
   */
  function canopi(id: string): canopi.Logger

  /**
   * Create a new logger with the properties from the supplied Object included in the output.
   * @param {Object} properties - Properties to be included in the output.
   */
  function canopi(properties: Object): canopi.Logger
  /**
   * Create a new logger with the supplied id and properties to be included in the output
   * @param {string} id - Name to attach to logging output.
   * @param {Object} properties - Properties to be included in the output.
   */
  function canopi(id: string, properties: Object): canopi.Logger

  namespace canopi {

    interface Logger {
      /**
       * Returns a new logger whose name is the parent logger
       * with the new name appended after ':'
       * @param {string} name - The name of the child logger.
       */
      (name: string): Logger

      /**
       * Log level 'debug'.
       * @param {string} message - The log message.
       * @param {Object=} properties - Optional properties to be included in the output.
       */
      debug(message: string, properties?: Object): void
      /**
       * Log level 'debug'.
       * @param {Error} error - An error instance.
       */
      debug(error: Error): void
      /**
       * Log level 'debug'.
       * @param {Error} error - An error instance.
       * @param {string} message - A message to be logged with the error.
       */
      debug(error: Error, message: string): void
      /**
       * Log level 'debug'.
       * @param {Error} error - An error instance.
       * @param {Object} properties - Properties to be included in the output.
       */
      debug(error: Error, properties: Object): void

      /**
       * Log level 'info'.
       * @param {string} message - The log message.
       * @param {Object=} properties - Optional properties to be included in the output.
       */
      info(message: string, properties?: Object): void
      /**
       * Log level 'info'.
       * @param {Error} error - An error instance.
       */
      info(error: Error): void
      /**
       * Log level 'info'.
       * @param {Error} error - An error instance.
       * @param {string} message - A message to be logged with the error.
       */
      info(error: Error, message: string): void
      /**
       * Log level 'info'.
       * @param {Error} error - An error instance.
       * @param {Object} properties - Properties to be included in the output.
       */
      info(error: Error, properties: Object): void

      /**
       * Log level 'warn'.
       * @param {string} message - The log message.
       * @param {Object=} properties - Optional properties to be included in the output.
       */
      warn(message: string, properties?: Object): void
      /**
       * Log level 'warn'.
       * @param {Error} error - An error instance.
       */
      warn(error: Error): void
      /**
       * Log level 'warn'.
       * @param {Error} error - An error instance.
       * @param {string} message - A message to be logged with the error.
       */
      warn(error: Error, message: string): void
      /**
       * Log level 'warn'.
       * @param {Error} error - An error instance.
       * @param {Object} properties - Properties to be included in the output.
       */
      warn(error: Error, properties: Object): void

      /**
       * Log level 'error'.
       * @param {string} message - The log message.
       * @param {Object=} properties - Optional properties to be included in the output.
       */
      error(message: string, properties?: Object): void
      /**
       * Log level 'error'.
       * @param {Error} error - An error instance.
       */
      error(error: Error): void
      /**
       * Log level 'error'.
       * @param {Error} error - An error instance.
       * @param {string} message - A message to be logged with the error.
       */
      error(error: Error, message: string): void
      /**
       * Log level 'error'.
       * @param {Error} error - An error instance.
       * @param {Object} properties - Properties to be included in the output.
       */
      error(error: Error, properties: Object): void
    }

    /**
     * Error raised on invalid logging.
     */
    interface CanopiUsageError extends Error {}

    /**
     * Handler type for the `addErrorHandler` function.
     */
    interface CanopiErrorHandler {
      (error: Error): void
    }
    /**
     * Handle an error.
     * @param {CanopiErrorHandler} handler A callback talking the `Error` as a single argument,
     */
    function addErrorHandler(handler: CanopiErrorHandler): void

    /**
     * Silence the logger output by preventing it from writing to process.stdout and removing any error handlers.
     */
    function quiet(): void

    /**
     * A function will be called with the value of the key if anything
     * is logged under that key.
     * @param {string} key The formatter key.
     * @param {Function} formatter The function to be called.
     */
    function setFormatter(key: string, formatter: Function): void

    /**
     * Configure the output stream.
     * @param {stream.Writable} stream
     */
    function setOutputStream(stream: stream.Writable): void
  }

  export = canopi
}