import { gql } from '@apollo/client';

export interface LogoutQueryData
{
    logout:
    {
        statusCode: number;
        message:
        {
            field: string;
            code: string;
        };
    };
}

export const LOGOUT_QUERY = gql
`
    query Logout
    {
        logout
        {
            statusCode
            message
        }
    }
`;
