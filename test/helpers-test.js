import path from 'path';

import * as helpers from '../src/helpers';
import Mingus from '../src/mingus';


Mingus.createTestCase('helpers', {
    testGetModulePath() {
        this.assertEqual(
            helpers.getModulePath('./utils'),
            path.resolve(__dirname, './utils')
        );
        this.assertEqual(helpers.getModulePath('utils'), 'utils');
    }
});
