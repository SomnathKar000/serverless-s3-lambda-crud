import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  Callback,
} from "aws-lambda";
import { routes } from "./api/routes";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
): Promise<APIGatewayProxyResult> => {
  const { httpMethod, resource } = event;
  const routeKey = `${httpMethod}:${resource}`;

  const handler = routes[routeKey];
  if (handler) {
    return handler(event, context, callback);
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Not Found" }),
    };
  }
};
