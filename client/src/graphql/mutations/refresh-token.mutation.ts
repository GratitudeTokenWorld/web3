import { gql } from '@apollo/client';

export interface RefreshTokenQueryData
{
    refreshToken:
    {
        statusCode: number;
        message:
        {
            field: string;
            code: string;
        };
        neuronData:
        {
            accessToken: string;
        };
    };
}

export const REFRESH_TOKEN_MUTATION = gql
`
    mutation RefreshToken
    {
        refreshToken
        {
            statusCode
            message
            neuronData
        }
    }
`;
