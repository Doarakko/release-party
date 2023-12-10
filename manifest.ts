import { Manifest } from "deno-slack-sdk/mod.ts";
import Workflow from "./workflows/workflow.ts";

export default Manifest({
  name: "release-party",
  description:
    "Trigger the Slack release completion message to light up the smart light bulb",
  icon: "assets/icon.png",
  functions: [],
  workflows: [Workflow],
  outgoingDomains: [
    "api.switch-bot.com",
  ],
  botScopes: [
    "groups:history",
    "channels:history",
    "chat:write",
    "chat:write.public",
    "reactions:write",
  ],
});
