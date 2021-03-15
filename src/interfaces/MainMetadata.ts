export interface MainMetadata<P extends MetadataActions = MetadataActions> {
  name: string;
  description: string;
  renders: string[];
  parses: string[];
  actions: Actions<P>;
}

export type MetadataActions = Record<string, MetadataAction>;

interface Actions<P extends MetadataActions = MetadataActions> {
  POST: P;
}

export type MetadataAction =
  | MetadataField
  | MetadataNestedField
  | MetadataChoiceField
  | MetadataStringField
  | MetadataIntegerField
  | MetadataDecimalField
  | MetadataEmailField
  | MetadataDateTimeField
  | MetadataFloatField;

export type MetadataActionFieldType =
  | 'field'
  | 'choice'
  | 'datetime'
  | 'float'
  | 'decimal'
  | 'integer'
  | 'string'
  | 'email'
  | 'nested object';

export interface MetadataActionField {
  type: MetadataActionFieldType;
  label: string;
  read_only: boolean;
  required: boolean;
  help_text: string;
}

export interface MetadataField extends MetadataActionField {
  type: 'field';
}
export interface MetadataDateTimeField extends MetadataActionField {
  type: 'datetime';
}

export interface MetadataStringField extends MetadataActionField {
  type: 'string';
  max_length: number;
}

export interface MetadataEmailField extends MetadataActionField {
  type: 'email';
}

export interface MetadataIntegerField extends MetadataActionField {
  type: 'integer';
}

export interface MetadataDecimalField extends MetadataActionField {
  type: 'decimal';
}

export interface MetadataChoiceField extends MetadataActionField {
  type: 'choice';
  choices: Choice[];
}

export interface Choice {
  value: string;
  display_name: string;
}

export interface MetadataFloatField extends MetadataActionField {
  type: 'float';
}

export interface MetadataNestedField<
  P extends MetadataActions = MetadataActions
> extends MetadataActionField {
  type: 'nested object';
  children: P;
}
