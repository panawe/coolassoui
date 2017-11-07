import {User} from './user';
export class Mail {
  id: number;
  sender: User;
  body: string; 
  subject: string; 
}