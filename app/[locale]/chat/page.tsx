import { assertDashboardAccess } from '@/lib/dashboard-access';
import { AiChatEmptyFeature } from '@/features/dashboard/chat/ai-chat-empty.feature';

const ChatPage = async () => {
  await assertDashboardAccess();

  return <AiChatEmptyFeature />;
};

export default ChatPage;
