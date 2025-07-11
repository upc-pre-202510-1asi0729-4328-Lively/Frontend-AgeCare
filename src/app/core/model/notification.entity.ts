export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
  status: 'unread' | 'read' | 'archived';
  userId: string;
}
