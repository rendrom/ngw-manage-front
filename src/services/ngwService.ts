import NgwConnector, { NgwConnectorOptions } from '@nextgis/ngw-connector';

export function createConnector(options: NgwConnectorOptions): NgwConnector {
  return NgwConnector.create(options);
}
