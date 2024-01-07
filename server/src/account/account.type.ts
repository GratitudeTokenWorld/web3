import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('AccountDataType')
export class AccountDataType
{
    @Field(() => Int)
    id: number;

    @Field(() => String)
    first_name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => String, { nullable: true })
    email: string;

    @Field(() => String, { nullable: true })
    phone_number: string;

    @Field(() => Boolean)
    verified: boolean;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;
}

@ObjectType('AccountType')
export class AccountType
{
    @Field(() => Int, { nullable: true })
    public readonly statusCode: number;

    @Field(() => AccountDataType, { nullable: true })
    public readonly neuronData: AccountDataType;

    @Field(() => [AccountDataType], { nullable: true })
    public readonly neuronArrayData: [AccountDataType];
}
