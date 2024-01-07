import { gql } from '@apollo/client';

export interface GetCurrentAccountQueryData
{
    getCurrentAccount:
    {
        statusCode: number;
        neuronData:
        {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
            phone_number: string;
            verified: boolean;
            created_at: Date;
            updated_at: Date;
        };
    };
}

export const GET_CURRENT_ACCOUNT_QUERY = gql
`
    query GetCurrentAccount
    {
        getCurrentAccount
        {
            statusCode
            neuronData
            {
                id
                first_name
                last_name
                email
                phone_number
                verified
                created_at
                updated_at
            }
        }
    }
`;
