const typescriptPath = require.resolve('typescript');
const typescript6Path = require.resolve('@typescript/typescript6');

require(typescript6Path);
require.cache[typescriptPath] = require.cache[typescript6Path];
