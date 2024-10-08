import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  Polaroid: a
    .model({
      title: a.string().required(),
      date: a.date(),
      image: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});
