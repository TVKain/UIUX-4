import { UserInfo } from '../user-info/types';

interface TemporaryAbsence {
  id: number;
  UserInfoId: number;
  reason: string;
  startDate: string;
  endDate: string;
  currentAddress: string;
  permanentAddress: string;
  destinationAddress: string;
}

interface TemporaryAbsenceFull extends TemporaryAbsence {
  UserInfo: UserInfo;
}

export type { TemporaryAbsence, TemporaryAbsenceFull };
