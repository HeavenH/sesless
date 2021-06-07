import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import SES from "aws-sdk/clients/ses";

import schema from "./schema";

const aws_ses = new SES();

const sendEmail: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async () => {
    await aws_ses
      .sendEmail({
        Source: "Gilmar Silva <heaven@ufrn.edu.br>",
        Destination: {
          ToAddresses: ["Gilmar Silva <gilmarheavensilva@gmail.com>"],
        },
        Message: {
          Subject: {
            Data: "Verification Code",
          },
          Body: {
            Text: {
              Data: "Your verification code is: 40137",
            },
          },
        },
      })
      .promise();

    return formatJSONResponse({
      ok: true,
    });
  };

export const main = middyfy(sendEmail);
