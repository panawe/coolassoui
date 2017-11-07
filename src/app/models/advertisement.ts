import { Sponsor } from './sponsor';
export class Advertisement {
  id: number;
  sponsor: Sponsor;
  sponsorId: string;
  description: string;
  link: string;
  status: boolean;
  beginDate: Date;
  endDate: Date;
  rating: number;
  amount: number;
  hasImage: boolean;
  imagePath: string;
}