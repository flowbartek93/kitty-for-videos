export interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  second_name: string | null;
  funds_summary: number | null;
  campaigns_count: number | null;
  expenses_count: number | null;
  active_funds: string[] | null;
  organised_funds: string[] | null;
  status: UserStatus;
}

export interface UpdateProfile {
  callsign: string;
  avatar: File | null;
}

export enum UserStatus {
  ACTIVE = 'active',
  OFFLINE = 'offline',
}
