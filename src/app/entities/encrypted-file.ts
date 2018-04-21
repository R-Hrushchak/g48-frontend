import { User } from './user';

export class EncryptedFile {
  id: number;
  user: User;
  recipient: User;
  content: string;
}
