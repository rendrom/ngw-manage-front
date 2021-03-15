import { Snapshot } from './Snapshot';

export interface SnapshotPagination {
  count: number;
  next: string;
  previous: null;
  results: Snapshot[];
}
