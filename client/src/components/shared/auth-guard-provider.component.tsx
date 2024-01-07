import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';

import { GET_CURRENT_ACCOUNT_QUERY, GetCurrentAccountQueryData } from '@/graphql/queries/get-current-account.query';
import { REFRESH_TOKEN_MUTATION, RefreshTokenQueryData } from '@/graphql/mutations/refresh-token.mutation';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAccountData } from '@/redux/features/auth/auth-slice';

const excludedRoutes = ['/', '/admin/auth'];

export const AuthGuardProvider = ({ children }: { children: ReactNode }) =>
{
    const pathname = usePathname();
    const { push } = useRouter();

    const dispatch = useAppDispatch();

    const { data, loading, refetch } = useQuery<GetCurrentAccountQueryData>(GET_CURRENT_ACCOUNT_QUERY);
    const [refreshTokenMutation] = useMutation<RefreshTokenQueryData>(REFRESH_TOKEN_MUTATION);

    useEffect(() =>
    {
        (
            async() =>
            {
                try
                {
                    if (!excludedRoutes?.includes(pathname))
                        await refetch();

                    if (data?.getCurrentAccount.neuronData.verified)
                    {
                        if (pathname === '/admin/auth')
                        {
                            push('/');
                            return;
                        }

                        dispatch(setAccountData(data?.getCurrentAccount.neuronData));
                    }
                }
                catch (error: any)
                {
                    try
                    {
                        if (error.graphQLErrors[0]?.extensions?.originalError?.statusCode === 401)
                        {
                            const response = await refreshTokenMutation();
                            if (response?.data?.refreshToken)
                                await refetch();
                        }
                    }
                    catch (errorRefreshToken: any)
                    {
                        push('/admin/auth');
                    }
                }
            }
        )();
    }, [data, dispatch, pathname, push, refetch, refreshTokenMutation]);

    return (
        <>
            { loading && data?.getCurrentAccount.neuronData.verified && <p>Loading...</p> }
            { (excludedRoutes?.includes(pathname) || data?.getCurrentAccount.neuronData.verified) && children }
        </>
    );
};
