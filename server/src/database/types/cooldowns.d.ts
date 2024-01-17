export interface Cooldowns
{
    id: number;
    account_id: number;
    action: string;
    last_action_time: Date;
    cooldown_reset_token_used: boolean;
}
