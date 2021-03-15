import {
  MainMetadata,
  MetadataNestedField,
  MetadataIntegerField,
  MetadataStringField,
  MetadataEmailField,
  MetadataActions,
} from './MainMetadata';

export type UserMetadata = MainMetadata<UserMetadataActions>;

export interface UserMetadataActions extends MetadataActions {
  pk: MetadataIntegerField;
  nextgis_guid: MetadataStringField;
  username: MetadataStringField;
  first_name: MetadataStringField;
  last_name: MetadataStringField;
  email: MetadataEmailField;
  profile: MetadataNestedField<ProfileMetadataActions>;
}

interface ProfileMetadataActions extends MetadataActions {
  company_name: MetadataStringField;
  request_email: MetadataStringField;
}
