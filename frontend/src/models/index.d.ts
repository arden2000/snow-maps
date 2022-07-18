import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type SkiLocationsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserImagesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class SkiLocations {
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<SkiLocations, SkiLocationsMetaData>);
  static copyOf(source: SkiLocations, mutator: (draft: MutableModel<SkiLocations, SkiLocationsMetaData>) => MutableModel<SkiLocations, SkiLocationsMetaData> | void): SkiLocations;
}

export declare class UserImages {
  readonly id: string;
  readonly username?: string | null;
  readonly location?: string | null;
  readonly SkiLocations?: SkiLocations | null;
  readonly date_time?: string | null;
  readonly image_url?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userImagesSkiLocationsId?: string | null;
  constructor(init: ModelInit<UserImages, UserImagesMetaData>);
  static copyOf(source: UserImages, mutator: (draft: MutableModel<UserImages, UserImagesMetaData>) => MutableModel<UserImages, UserImagesMetaData> | void): UserImages;
}