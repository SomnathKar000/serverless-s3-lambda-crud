import { APIGatewayProxyResult } from "aws-lambda";

export const errorHandler = (
  statusCode: number,
  message: string
): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify({
      success: false,
      message,
    }),
  };
};
