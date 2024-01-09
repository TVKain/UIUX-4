import { UserInfo } from './types';

import { url } from '../../config/constants';

import axios from 'axios';

interface UpdateUserInfoRequest extends Omit<Omit<Omit<UserInfo, 'UserId'>, 'joinDate'>, 'leaveDate'> {}

async function updateUserInfo(data: UpdateUserInfoRequest) {
  const result = await axios.put(`${url}/user-infos`, data);

  return result.data;
}

export type { UpdateUserInfoRequest };
export { updateUserInfo };
