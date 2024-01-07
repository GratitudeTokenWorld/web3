export interface Account
{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    verified: boolean;
    refresh_token: string;
    created_at: Date;
    updated_at: Date;
}
