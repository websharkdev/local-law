type RecentChat = {
  id: string;
  title: string;
  isActive?: boolean;
  hasDividerAfter?: boolean;
  hasContextMenu?: boolean;
};

const RECENT_CHATS: RecentChat[] = [
  { id: 'new', title: 'New Chat', isActive: true },
  { id: '1', title: 'Unpaid salary rights' },
  { id: '2', title: 'Demand Letter - Salary', hasDividerAfter: true },
  { id: '3', title: 'Eviction notice period in...', hasDividerAfter: true },
  {
    id: '4',
    title: 'Employment Complaint',
    hasDividerAfter: true,
    hasContextMenu: true,
  },
  { id: '5', title: 'Unpaid salary rights' },
];

export type { RecentChat };
export { RECENT_CHATS };
