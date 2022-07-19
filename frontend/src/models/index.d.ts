import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type SkiResortsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class SkiResorts {
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly website?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<SkiResorts, SkiResortsMetaData>);
  static copyOf(source: SkiResorts, mutator: (draft: MutableModel<SkiResorts, SkiResortsMetaData>) => MutableModel<SkiResorts, SkiResortsMetaData> | void): SkiResorts;
}