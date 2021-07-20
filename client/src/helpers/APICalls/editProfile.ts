import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const editProfile = async (
  id: string,
  isDogSitter: boolean,
  firstName: string,
  lastName: string,
  selfDescription: string,
  hourlyRate: number,
  tagLine: string,
  availability: {
    Sunday: {
      am: boolean;
      pm: boolean;
    };
    Monday: {
      am: boolean;
      pm: boolean;
    };
    Tuesday: {
      am: boolean;
      pm: boolean;
    };
    Wednesday: {
      am: boolean;
      pm: boolean;
    };
    Thursday: {
      am: boolean;
      pm: boolean;
    };
    Friday: {
      am: boolean;
      pm: boolean;
    };
    Saturday: {
      am: boolean;
      pm: boolean;
    };
  },
): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isDogSitter, firstName, lastName, description: selfDescription, hourlyRate, tagLine }),
    credentials: 'include',
  };
  return await fetch(`https://loving-sitter-team-beagle.herokuapp.com/profile/edit-profile/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default editProfile;
