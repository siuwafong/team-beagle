import { ConversationsData } from '../../interface/Conversation';
import { FetchOptions } from '../../interface/FetchOptions';

const getConversations = (id: string) => async (): Promise<ConversationsData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'appliation/json' },
    credentials: 'include',
  };
  return await fetch(`https://loving-sitter-team-beagle.herokuapp.com/message/conversation/show/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again.' },
    }));
};

export default getConversations;
