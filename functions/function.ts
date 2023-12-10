import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import SwitchBot from "../devices/switchbot.ts";

export const FunctionDefinition = DefineFunction({
  callback_id: "function",
  title: "function",
  description: "function",
  source_file: "functions/function.ts",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.types.string },
      message_ts: { type: Schema.types.string },
    },
    required: ["channel_id", "message_ts"],
  },
});

export default SlackFunction(
  FunctionDefinition,
  async ({ inputs, client, env }) => {
    const key = env["SWITCHBOT_API_KEY"];
    const device_id = env["SWITCHBOT_DEVICE_ID"];
    const switchBotClient = new SwitchBot(key);

    await switchBotClient.turnOn(device_id);
    await switchBotClient.turnOff(device_id);

    await client.reactions.add({
      channel: inputs.channel_id,
      timestamp: inputs.message_ts,
      name: "tada",
    });

    return { outputs: {} };
  },
);
