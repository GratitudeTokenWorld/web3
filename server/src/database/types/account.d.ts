export interface Account
{
    id: number;
    username: string;
    email: string;
    referred_by_account_id: number | null;
    created_at: Date;
    updated_at: Date;
}
