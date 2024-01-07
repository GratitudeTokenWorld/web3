import { gql } from '@apollo/client';

export interface LoginWithEmailQueryData
{
    authenticationWithEmail:
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
            expiresAt: Date;
        };
    };
}

export interface LoginWithEmailInput
{
    authenticationWithEmailInput:
    {
        email: string;
        password: string;
        code: number;
    };
}

export const LOGIN_WITH_EMAIL_MUTATION = gql
`
    mutation LoginWithEmail($authenticationWithEmailInput: AuthenticationInput!)
    {
        authentication(authenticationWithEmailInput: $authenticationWithEmailInput)
        {
            statusCode
            message
            neuronData
        }
    }
`;
