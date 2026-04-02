import { createPostFn, semanticDemoTest } from '../../../tests/shared/demoTest';

semanticDemoTest('time-picker', { postRenderFn: createPostFn(['Multiple']) });
