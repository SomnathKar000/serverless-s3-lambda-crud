import { APIGatewayProxyResult } from "aws-lambda";

export const successResponse = (data: any): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: JSON.stringify({ ...data, success: true }),
  };
};
