import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

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

type Command = "turnOn" | "turnOff";

async function _commandDevice(
  key: string,
  id: string,
  command: Command,
): Promise<void> {
  await fetch(
    `https://api.switch-bot.com/v1.0/devices/${id}/commands`,
    {
      method: "POST",
      headers: {
        "Authorization": key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command: command,
      }),
    },
  );
}

export default SlackFunction(
  FunctionDefinition,
  async ({ inputs, client, env }) => {
    const key = env["SWITCHBOT_API_KEY"];
    const device_id = env["SWITCHBOT_DEVICE_ID"];
    await _commandDevice(key, device_id, "turnOn");
    await _commandDevice(key, device_id, "turnOff");

    await client.reactions.add({
      channel: inputs.channel_id,
      timestamp: inputs.message_ts,
      name: "tada",
    });

    return { outputs: {} };
  },
);
