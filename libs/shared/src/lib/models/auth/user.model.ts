export interface AppUser {
  id: string; // UUID z Supabase Auth
  email: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: string;
}
