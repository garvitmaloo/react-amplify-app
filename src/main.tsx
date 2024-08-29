import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Amplify } from "aws-amplify";

import App from "./App";
import store from "./store";

const queryClient = new QueryClient();
Amplify.configure({
  auth: {
    user_pool_id: import.meta.env.VITE_user_pool_id,
    aws_region: import.meta.env.VITE_aws_region,
    user_pool_client_id: import.meta.env.VITE_user_pool_client_id,
    identity_pool_id: import.meta.env.VITE_identity_pool_id,
    mfa_methods: [],
    standard_required_attributes: ["email"],
    username_attributes: ["email"],
    user_verification_types: ["email"],
    mfa_configuration: "NONE",
    password_policy: {
      min_length: 8,
      require_lowercase: true,
      require_numbers: true,
      require_symbols: true,
      require_uppercase: true,
    },
    unauthenticated_identities_enabled: true,
  },
  data: {
    url: import.meta.env.VITE_DATA_URL,
    api_key: import.meta.env.VITE_DATA_API_KEY,
    aws_region: import.meta.env.VITE_aws_region,
    default_authorization_type: "API_KEY",
    authorization_types: ["AMAZON_COGNITO_USER_POOLS", "AWS_IAM"],
    model_introspection: {
      version: 1,
      models: {
        Polaroid: {
          name: "Polaroid",
          fields: {
            id: {
              name: "id",
              isArray: false,
              type: "ID",
              isRequired: true,
              attributes: [],
            },
            title: {
              name: "title",
              isArray: false,
              type: "String",
              isRequired: true,
              attributes: [],
            },
            date: {
              name: "date",
              isArray: false,
              type: "AWSDate",
              isRequired: false,
              attributes: [],
            },
            image: {
              name: "image",
              isArray: false,
              type: "String",
              isRequired: false,
              attributes: [],
            },
            createdAt: {
              name: "createdAt",
              isArray: false,
              type: "AWSDateTime",
              isRequired: false,
              attributes: [],
              isReadOnly: true,
            },
            updatedAt: {
              name: "updatedAt",
              isArray: false,
              type: "AWSDateTime",
              isRequired: false,
              attributes: [],
              isReadOnly: true,
            },
          },
          syncable: true,
          pluralName: "Polaroids",
          attributes: [
            {
              type: "model",
              properties: {},
            },
            {
              type: "auth",
              properties: {
                rules: [
                  {
                    allow: "public",
                    provider: "apiKey",
                    operations: ["create", "update", "delete", "read"],
                  },
                ],
              },
            },
          ],
          primaryKeyInfo: {
            isCustomPrimaryKey: false,
            primaryKeyFieldName: "id",
            sortKeyFieldNames: [],
          },
        },
      },
      enums: {},
      nonModels: {},
    },
  },
  storage: {
    aws_region: import.meta.env.VITE_aws_region,
    bucket_name: import.meta.env.VITE_STORAGE_BUCKET_NAME,
    buckets: [
      {
        name: import.meta.env.VITE_BUCKET_SUBPATH,
        bucket_name: import.meta.env.VITE_STORAGE_BUCKET_NAME,
        aws_region: import.meta.env.VITE_aws_region,
      },
    ],
  },
  version: "1.1",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
