import { User } from './User';

export interface AuthApiDataSuccess {
  message: string;
  user: User;
  token: string;
  data: CurrentProfile;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
}

export interface CurrentProfile {
  profile: {
    isDogSitter: boolean;
    firstName: string;
    lastName: string;
    location: string;
    description: string;
    hourlyRate: number;
    tagLine: string;
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
    };
  };
}