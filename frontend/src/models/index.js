// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SkiLocations, UserImages } = initSchema(schema);

export {
  SkiLocations,
  UserImages
};