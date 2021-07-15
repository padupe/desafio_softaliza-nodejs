'use strict';
require('dotenv').config();
const winston = require('winston');

//Logging Levels
const config = {
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warn: 4,
    notice: 5,
    info: 6,
    debug: 7,
  },
  colors: {
    emerg: 'darkred',
    alert: 'magenta',
    crit: 'orange',
    error: 'red',
    warn: 'yellow',
    notice: 'blue',
    info: 'grey',
    debug: 'cyan',
  },
};

winston.addColors(config.colors);

//Ignore Log Message com informações privadas
const ignorePrivate = winston.format((info, opts) => {
  if (info.private) {
    return false;
  }
  return info;
});

const logging = (module.exports = winston.createLogger({
  //'Configuração' do formato que os dados devem ser gerados e inseridos
  levels: config.levels,
  format: winston.format.combine(
    ignorePrivate(),
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(
      (info) => `${info.timestamp} - ${info.level} - ${info.message}`
    )
  ),
  //Gera os Arquivos de Log no Diretório 'logs'
  transports: [
    new winston.transports.File({
      maxsize: 5120000,
      filename: `${__dirname}/../logs/desafio_softaliza-error.log`,
      level: 'error',
    }),
    new winston.transports.File({
      maxsize: 5120000,
      filename: `${__dirname}/../logs/desafio_softaliza-all.log`,
      level: process.env.LOGLEVEL,
    }),
  ],
  exitOnError: false,
}));

module.exports = logging;
