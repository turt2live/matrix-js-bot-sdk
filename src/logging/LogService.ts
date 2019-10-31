import { ConsoleLogger } from "./ConsoleLogger";
import { ILogger } from "./ILogger";

export class LogLevel {

    public static readonly DEBUG = new LogLevel("DEBUG", 0);
    public static readonly INFO = new LogLevel("INFO", 1);
    public static readonly WARN = new LogLevel("WARN", 2);
    public static readonly ERROR = new LogLevel("ERROR", 3);

    private constructor(private level: string, private sequence: number) {
    }

    public includes(level: LogLevel): boolean {
        return level.sequence >= this.sequence;
    }

    public toString(): string {
        return this.level;
    }

    public static fromString(level: string, defaultLevel = LogLevel.DEBUG): LogLevel {
        if (!level) return defaultLevel;
        if (level.toUpperCase() === LogLevel.DEBUG.level) return LogLevel.DEBUG;
        if (level.toUpperCase() === LogLevel.INFO.level) return LogLevel.INFO;
        if (level.toUpperCase() === LogLevel.WARN.level) return LogLevel.WARN;
        if (level.toUpperCase() === LogLevel.ERROR.level) return LogLevel.ERROR;
        return defaultLevel;
    }
}

export class LogService {

    private static logger: ILogger = new ConsoleLogger();
    private static logLevel: LogLevel = LogLevel.DEBUG;

    private constructor() {
    }

    /**
     * Sets the log level for this logger. Defaults to DEBUG.
     * @param {LogLevel} level the new log level
     */
    public static setLevel(level: LogLevel) {
        LogService.logLevel = level || LogLevel.DEBUG;
    }

    /**
     * Sets a new logger for the Log Service
     * @param {ILogger} logger the new logger
     */
    public static setLogger(logger: ILogger) {
        LogService.logger = logger;
    }

    /**
     * Logs to the DEBUG channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    public static debug(module: string, ...messageOrObject: any[]) {
        if (!LogService.logLevel.includes(LogLevel.DEBUG)) return;
        LogService.logger.debug(module, ...messageOrObject);
    }

    /**
     * Logs to the ERROR channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    public static error(module: string, ...messageOrObject: any[]) {
        if (!LogService.logLevel.includes(LogLevel.ERROR)) return;
        LogService.logger.error(module, ...messageOrObject);
    }

    /**
     * Logs to the INFO channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    public static info(module: string, ...messageOrObject: any[]) {
        if (!LogService.logLevel.includes(LogLevel.INFO)) return;
        LogService.logger.info(module, ...messageOrObject);
    }

    /**
     * Logs to the WARN channel
     * @param {string} module The module being logged
     * @param {any[]} messageOrObject The data to log
     */
    public static warn(module: string, ...messageOrObject: any[]) {
        if (!LogService.logLevel.includes(LogLevel.WARN)) return;
        LogService.logger.warn(module, ...messageOrObject);
    }
}
