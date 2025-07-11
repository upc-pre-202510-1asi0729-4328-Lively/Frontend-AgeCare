export interface Notification {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  status: 'unread' | 'READ' | 'ARCHIVED';
  userId: number;
}
