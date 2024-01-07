import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AuthenticationInput
{
    @Field(() => String, { nullable: true })
    public readonly firstName?: string;

    @Field(() => String, { nullable: true })
    public readonly lastName?: string;

    @Field(() => String)
    public readonly email: string;

    @Field(() => String, { nullable: true })
    public readonly password?: string;

    @Field(() => String, { nullable: true })
    public readonly confirmPassword?: string;

    @Field(() => Int, { nullable: true })
    public readonly code?: number;
}
