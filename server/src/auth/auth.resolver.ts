import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthType } from './auth.type';

import { AuthenticationInput } from './dto/authentication-input';

@Resolver(() => AuthType)
export class AuthResolver
{
    constructor(private readonly authService: AuthService)
    {
    }

    @Mutation(() => AuthType)
    public async authentication(@Args('authenticationWithEmailInput') authenticationInput: AuthenticationInput)
    {
        return this.authService.authentication(authenticationInput);
    }

    @Query(() => AuthType)
    @UseGuards(AuthGuard)
    public async logout(@Context('req') request: Request)
    {
        return this.authService.logout(request, request.res);
    }

    @Mutation(() => AuthType)
    public async refreshToken(@Context('req') request: Request)
    {
        return this.authService.refreshToken(request, request.res);
    }
}
