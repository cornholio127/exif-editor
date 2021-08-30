'use strict';
export const __esModule = true;

import fs from 'fs-extra';

fs.copySync('./bin', './dist/bin');
