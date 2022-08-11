import { format, createLogger, transports } from "winston";

const logFormat = format.printf(
  ({ level, message, timeStamp, stack }) =>
    `[${timeStamp}] [${level}] : ${stack || message}`
);

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [new transports.Console()],
});

export default logger;
