import {Neighbour} from './neighbour';

export interface RoutingTable {
  address: string;
  port: number;
  neighbours: Neighbour[];
}
