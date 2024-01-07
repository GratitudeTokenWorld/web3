'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import { store } from '@/redux/app/store';
import { client } from '@/graphql/app/apollo-client';

import { AuthGuardProvider } from '@/components/shared/auth-guard-provider.component';

export function Providers({ children }: { children: ReactNode })
{
    return (
        <ApolloProvider client={ client }>
            <Provider store={ store }>
                <AuthGuardProvider>
                    { children }
                </AuthGuardProvider>
            </Provider>
        </ApolloProvider>
    );
}
