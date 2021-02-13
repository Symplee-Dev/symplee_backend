import debugsx from 'debug-sx';
import dotenv from 'dotenv';

dotenv.config();
process.env['DEBUG'] = '*::INFO, *::WARN, *::ERR';

export const logger: debugsx.ISimpleLogger = debugsx.createSimpleLogger('main');
const h: debugsx.IHandler = debugsx.createConsoleHandler('stdout', '*');
debugsx.addHandler(h);
