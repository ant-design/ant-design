import { createPostFn, semanticDemoTest } from '../../../tests/shared/demoTest';

semanticDemoTest('date-picker', { postRenderFn: createPostFn(['Multiple']) });
