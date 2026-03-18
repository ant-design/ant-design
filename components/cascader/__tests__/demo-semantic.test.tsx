import { createPostFn, semanticDemoTest } from '../../../tests/shared/demoTest';

semanticDemoTest('cascader', { postRenderFn: createPostFn(['Multiple']) });
