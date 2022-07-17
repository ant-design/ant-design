import demoTest from '../../../tests/shared/demoTest';

demoTest('slider', { skip: process.env.LIB_DIR === 'dist' && ['show-tooltip.md'] });
