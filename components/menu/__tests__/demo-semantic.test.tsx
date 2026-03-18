import { createPostFn, semanticDemoTest } from '../../../tests/shared/demoTest';

semanticDemoTest('menu', { postRenderFn: createPostFn(['inline']) });
