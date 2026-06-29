import { createPostFn, semanticDemoTest } from '../../../tests/shared/demoTest';

semanticDemoTest('select', { postRenderFn: createPostFn(['Multiple']) });
