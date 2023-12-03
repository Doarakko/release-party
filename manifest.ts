import { Manifest } from "deno-slack-sdk/mod.ts";
import Workflow from "./workflows/workflow.ts";

export default Manifest({
  name: "release-party",
  description: "A blank template for building Slack apps with Deno",
  icon: "assets/default_new_app_icon.png",
  functions: [],
  workflows: [Workflow],
  outgoingDomains: ["api.switch-bot.com"],
  botScopes: [
    "groups:history",
    "channels:history",
    "chat:write",
    "chat:write.public",
    "reactions:write",
  ],
});
