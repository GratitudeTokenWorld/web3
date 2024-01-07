import { createSlice } from '@reduxjs/toolkit';

interface AuthState
{
    accountData: null;
}

const initialState: AuthState =
{
    accountData: null
};

export const authSlice = createSlice
({
    name: 'auth',
    initialState,
    reducers:
    {
        setAccountData: (state, action) =>
        {
            state.accountData = action.payload;
        }
    }
});

export const { setAccountData } = authSlice.actions;

export default authSlice.reducer;
