import { util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: any) {
  const item = { ...ctx.arguments, ups: 1, downs: 0, version: 1 };
  const key = { id: ctx.args.id ?? util.autoId() };
  return ddb.put({ key, item });
}

export function response(ctx: any) {
  return ctx.result;
}