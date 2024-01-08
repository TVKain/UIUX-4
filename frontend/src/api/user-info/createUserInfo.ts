import { UserInfo } from './types';

import { url } from '../../config/constants';

import axios from 'axios';
import { User } from '../user/types';

interface CreateUserInfoRequest
  extends Omit<Omit<Omit<Omit<UserInfo, 'id'>, 'UserId'>, 'joinDate'>, 'leaveDate'> {
  account: boolean;
}

interface CreateUserInfoResponse extends UserInfo {
  User?: User;
}

async function createUserInfo(data: CreateUserInfoRequest): Promise<CreateUserInfoResponse> {
  const result = await axios.post<CreateUserInfoResponse>(`${url}/user-infos`, data);

  return result.data;
}

export type { CreateUserInfoRequest };
export { createUserInfo };
