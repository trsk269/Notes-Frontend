export interface Note {
  _id: string;
  title: string;
  notes: string;
  isPinned: boolean;
  isArchived: boolean;
  theme?: string;
  notifyAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
