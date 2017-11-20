import {Project} from './project';
import {User} from './user';
export class Transaction {
  id: number;
  project: Project;
  createDate: Date;
  member: string;
  amount: number;
  anonymous: boolean;
  comment: string;
  ref_nbr: string;
  user: User;
  io: number = 1;
  rebate: number =0;
  currencyCode = 'CFA';
  modifiedBy: number;
}