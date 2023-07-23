import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { uploadFileToS3 } from "../services/s3Services";
import { errorHandler } from "../utils/errorHandler";
import { successResponse } from "../utils/responseHandler";

export const uploadFileHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const { fileName, fileContext } = JSON.parse(event.body!);

    if (!fileName || !fileContext) {
      return errorHandler(
        400,
        "Please provide both file name and file content"
      );
    }

    const fileId = await uploadFileToS3(fileName, fileContext);

    if (!fileId) {
      return errorHandler(500, "Failed to upload file");
    }
    return successResponse({ message: "Successfully uploaded file", fileId });
  } catch (error) {
    console.log(error);
    return errorHandler(500, "Internal Server Error");
  }
};
