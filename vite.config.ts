import { reactRouter } from "@react-router/dev/vite";
import {
  sentryReactRouter,
  type SentryReactRouterBuildOptions,
} from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
const sentryConfig: SentryReactRouterBuildOptions = {
  org: "js-mastery-1qw",
  project: "travel-agency",
  // An auth token is required for uploading source maps;
  // store it in an environment variable to keep it secure.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // ...
};

export default defineConfig((config) => {
  return {
    plugins: [
      tailwindcss(),
      tsconfigPaths(),
      reactRouter(),
      sentryReactRouter(sentryConfig, config),
    ],
    ssr: {
      // Forces bundling of Syncfusion
      noExternal: [/@syncfusion/],
    },
  };
});
