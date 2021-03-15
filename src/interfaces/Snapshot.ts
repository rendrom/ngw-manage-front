// import { JsonMap } from '@nextgis/utils';
import type { MultiPolygon } from 'geojson';
import type { User } from './User';

export interface Snapshot {
  pk: number;

  user: User;

  create_date: Date;
  change_date: Date;

  image_id: string;
  acq_date: Date;
  description: string;

  cloud_cover: number;

  bands: 'RGB' | 'PAN' | 'MUL';

  vehicle: string;
  resolution: number;

  specific: any;
  price: number;
  preview?: string;
  footprint: MultiPolygon;
}
