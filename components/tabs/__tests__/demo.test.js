import demoTest from '../../../tests/shared/demoTest';

demoTest('tabs', { skip: process.env.REACT === '15' ? ['custom-tab-bar-node.md'] : [] });
