export interface ProfileStats
{
    id: number;
    account_id: number;
    account_type: string;
    last_active_date: Date;
    monthly_active_average: number;
    yearly_active_average: number;
    reach: number;
    frequency: number;
    virality: number;
    shareability: number;
    engagement: number;
}
