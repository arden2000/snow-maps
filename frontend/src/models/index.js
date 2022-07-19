// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SkiResorts } = initSchema(schema);

export {
  SkiResorts
};