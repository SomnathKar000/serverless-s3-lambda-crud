import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { uploadFileHandler } from "./handlers/uploadFile";
import { getFileHandler } from "./handlers/getFile";
import { deleteFileHandler } from "./handlers/deleteFile";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const { httpMethod, resource } = event;
  const routeKey = `${httpMethod}:${resource}`;

  switch (routeKey) {
    case "POST:/upload":
      return uploadFileHandler(event, context);
    case "GET:/files/{id}":
      return getFileHandler(event, context);
    case "DELETE:/delete/{id}":
      return deleteFileHandler(event, context);
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Not Found" }),
      };
  }
};
