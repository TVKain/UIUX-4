import { UserInfo } from '../user-info/types';

interface TemporaryResidence {
  id: number;
  UserInfoId: number;
  reason: string;
  startDate: string;
  currentAddress: string;
  permanentAddress: string;
}

interface TemporaryResidenceFull extends TemporaryResidence {
  UserInfo: UserInfo;
}

export type { TemporaryResidence, TemporaryResidenceFull };
