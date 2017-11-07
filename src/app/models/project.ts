import {Contribution} from './contribution';
import {Picture} from './picture';
export class Project {
  id: number;
  title: string;
  description: string;
  sponsors: string;
  budget: number;
  projectedStartDate: Date;
  projectedEndDate: Date;
  startDate: Date;
  endDate: Date;
  status: boolean;
  hasPhoto: boolean;
  pics: Picture[];
  contributions: Contribution[];
}