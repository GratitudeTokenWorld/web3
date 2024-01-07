import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType('AuthType')
export class AuthType
{
    @Field(() => Int, { nullable: true })
    public readonly statusCode: number;

    @Field(() => GraphQLJSON, { nullable: true })
    public readonly message: JSON;

    @Field(() => GraphQLJSON, { nullable: true })
    public readonly neuronData: JSON;
}
