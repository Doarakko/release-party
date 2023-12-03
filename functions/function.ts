import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { delay } from "deno.land/std/async/mod.ts";
import SwitchBot from "../devices/switchbot.ts";
import Philips from "../devices/philips.ts";

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

type Device = "SwitchBot" | "Philips";

// https://developers.meethue.com/develop/get-started-2/core-concepts/
const philipsColorYellow = { x: 0.4325, y: 0.5007 };
const philipsColorBlue = { x: 0.167, y: 0.04 };
const philipsColorRed = { x: 0.675, y: 0.322 };
const philipsColorGreen = { x: 0.4091, y: 0.518 };

async function _philipsTurnOnColorful(
  client: Philips,
  device_id: string,
): Promise<void> {
  await client.turnOn(device_id, philipsColorGreen);
  await delay(500);
  await client.turnOn(device_id, philipsColorRed);
  await delay(500);
  await client.turnOn(device_id, philipsColorYellow);
  await delay(500);
  await client.turnOn(device_id, philipsColorBlue);
  await delay(500);
  await client.turnOn(device_id, philipsColorGreen);
  await delay(500);
  await client.turnOn(device_id, philipsColorRed);
  await delay(500);
  await client.turnOn(device_id, philipsColorYellow);
  await delay(500);
  await client.turnOn(device_id, philipsColorBlue);
  await delay(500);

  await client.turnOff(device_id);
}

export default SlackFunction(
  FunctionDefinition,
  async ({ inputs, client, env }) => {
    const device: Device = env["DEVICE"];
    if (device === "SwitchBot") {
      const key = env["SWITCHBOT_API_KEY"];
      const device_id = env["SWITCHBOT_DEVICE_ID"];
      const switchBotClient = new SwitchBot(key);

      await switchBotClient.turnOn(device_id);
      await switchBotClient.turnOff(device_id);
    } else if (device === "Philips") {
      const ipAddress = env["PHILIPS_IP_ADDRESS"];
      const username = env["PHILIPS_USERNAME"];
      const device_id = env["PHILIPS_DEVICE_ID"];
      const philipsClient = new Philips(ipAddress, username);

      await _philipsTurnOnColorful(philipsClient, device_id);

      await philipsClient.turnOff(device_id);
    } else {
      console.error("Unknown device");
      return;
    }

    await client.reactions.add({
      channel: inputs.channel_id,
      timestamp: inputs.message_ts,
      name: "tada",
    });

    return { outputs: {} };
  },
);
