import { FetchOptions } from '../../interface/FetchOptions';

export const patchNotificationAsRead = async (id: string): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`https://loving-sitter-team-beagle.herokuapp.com/notifications/read/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const patchAllNotificationsAsRead = async (): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`https://loving-sitter-team-beagle.herokuapp.com/notifications/readall`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
