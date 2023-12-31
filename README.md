# Serverless S3 Lambda Crud - Serverless Application

This is a serverless application that provides a RESTful API to interact with an S3 bucket for file upload, retrieval, and deletion.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [GitHub Actions Configuration](#github-actions-configuration)

## Overview

The S3 Bucket API is built using the Serverless Framework and AWS Lambda. It allows users to perform various operations on an S3 bucket, such as uploading files, retrieving files, and deleting files. The API is implemented with Lambda functions, and the data is stored in an S3 bucket with private access control.

## Prerequisites

Before running this application, you'll need the following:

- Node.js (>= 14.x) and npm installed on your local machine.
- AWS CLI configured with proper credentials to deploy the application.
- An S3 bucket configured with the appropriate permissions and an environment variable `FILE_UPLOAD_BUCKET_NAME` set to the bucket name.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/SomnathKar000/serverless-s3-lambda-crud.git
cd serverless-s3-lambda-crud
```

2. Install dependencies:

```bash
npm install
```

3. Update the `serverless.yml` file:

   - Replace `ap-south-1` in the `provider` section with your desired AWS region.
   - Replace `${self:custom.bucketName}` in the `custom` section with your desired S3 bucket name prefix.

## Usage

To run the application locally, you can use the Serverless Framework's `invoke local` command. For example, to test the `getFileHandler` function:

```bash
serverless invoke local --function getFileHandler --path ./test/event.json
```

Replace `getFileHandler` with the desired function name and update the `event.json` file with the event data.

## API Endpoints

The following API endpoints are available:

1. `POST /upload`: Upload a file to the S3 bucket.

   Request body:

   ```json
   {
     "fileName": "example.txt",
     "fileContext": "Your file content here"
   }
   ```

2. `GET /files/{id}`: Retrieve a file from the S3 bucket by its ID.

3. `DELETE /delete/{id}`: Delete a file from the S3 bucket by its ID.

## Deployment

To deploy the application to AWS, use the following command:

```bash
npm run deploy
```

This will create the necessary AWS resources, including the Lambda functions and API Gateway with the defined routes.

### AWS API Gateway Stage Endpoint

The API Gateway stage endpoint for the deployed application is:

```
https://7xkvhkn60c.execute-api.ap-south-1.amazonaws.com/dev
```

## GitHub Actions Configuration

To enable GitHub Actions for continuous integration and deployment, the following IAM permissions were granted to the IAM user associated with the GitHub Actions workflow:

Permissions Policies attached to the IAM user:

1. `AmazonAPIGatewayAdministrator`: AWS managed policy that provides full access to Amazon API Gateway resources.

2. `AmazonAPIGatewayPushToCloudWatchLogs`: AWS managed policy that allows pushing API Gateway logs to CloudWatch Logs.

3. `AmazonS3FullAccess`: AWS managed policy that provides full access to Amazon S3 resources.

4. `AWSCloudFormationFullAccess`: AWS managed policy that provides full access to AWS CloudFormation resources.

5. `AWSLambda_FullAccess`: AWS managed policy that provides full access to AWS Lambda resources.

6. `AWSLambdaRole`: AWS managed policy that grants permissions required for Lambda execution.

7. `CloudWatchLogsFullAccess`: AWS managed policy that provides full access to CloudWatch Logs.

8. `IAMFullAccess`: AWS managed policy that provides full access to IAM resources.

**Note**: It is important to ensure that the IAM user associated with the GitHub Actions workflow has the necessary permissions to deploy the application.

Please make sure to handle IAM user credentials securely and avoid sharing sensitive information. Using GitHub Actions secrets to store the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` is a good practice.
