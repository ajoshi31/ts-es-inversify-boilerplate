export default interface ILogger {
  trace(msg: string, meta?: unknown): void;
  info(msg: string, meta?: unknown): void;
  error(msg: string, meta?: unknown): void;
  silly(msg: string, meta?: unknown): void;
  debug(msg: string, meta?: unknown): void;
  fatal(msg: string, meta?: unknown): void;
  warn(msg: string, meta?: unknown): void;
  log(type: string, msg: string, meta?: unknown): void;
}
