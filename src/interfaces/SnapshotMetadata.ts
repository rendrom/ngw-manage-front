import {
  MainMetadata,
  MetadataNestedField,
  MetadataActions,
  MetadataStringField,
  MetadataDateTimeField,
  MetadataFloatField,
  MetadataChoiceField,
} from './MainMetadata';
import { UserMetadataActions } from './UserMetadata';

export type SnapshotMetadata = MainMetadata<SnapshotMetadataActions>;

export interface SnapshotMetadataActions extends MetadataActions {
  user: MetadataNestedField<UserMetadataActions>;
  image_id: MetadataStringField;
  acq_date: MetadataDateTimeField;
  cloud_cover: MetadataFloatField;
  bands: MetadataChoiceField;
}
