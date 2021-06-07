import type { AWS } from "@serverless/typescript";

import sendEmail from "@functions/email";

const serverlessConfiguration: AWS = {
  service: "sesless",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    region: "sa-east-1",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["ses:SendEmail", "ses:SendRawEmail"],
        Resource: ["*"],
      },
    ],
  },
  // import the function via paths
  functions: { sendEmail },
};

module.exports = serverlessConfiguration;
