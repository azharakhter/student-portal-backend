const shell = require('shelljs');
require('dotenv').config({ path: './.env' });

shell.cp('-R', 'src/config/config.js', 'dist/config/');
shell.cp('-R', 'src/config/codes.json', 'dist/config/');
shell.cp('-R', 'package.json', 'dist/');

