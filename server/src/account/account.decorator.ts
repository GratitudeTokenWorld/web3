import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const getCurrentAccountByContext = (context: ExecutionContext) =>
{
    if (context.getType() === 'http')
        return context.switchToHttp().getRequest().accountId;

    if ((context.getType() as any) === 'graphql')
    {
        const ctx = GqlExecutionContext.create(context);

        return ctx.getContext().req.accountId;
    }
};

export const AccountDecorator = createParamDecorator((_data: unknown, context: ExecutionContext) => getCurrentAccountByContext(context));
