import demoTest from '../../../tests/shared/demoTest';

demoTest('color', { skip: ['contrast.md', 'direct.md', 'indirect.md'] }); // skipping until we get styled-components to work in jest
