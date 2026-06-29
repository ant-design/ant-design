import { createPostFn, semanticDemoTest } from '../../../tests/shared/demoTest';

semanticDemoTest('tree-select', { postRenderFn: createPostFn(['Multiple']) });
