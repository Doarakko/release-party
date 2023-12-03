import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { FunctionDefinition } from "../functions/function.ts";

const Workflow = DefineWorkflow({
  callback_id: "workflow",
  title: "workflow",
  description: "workflow",
  input_parameters: {
    properties: {
      channel_id: {
        type: Schema.slack.types.channel_id,
      },
      message_ts: {
        type: Schema.types.string,
      },
    },
    required: ["channel_id", "message_ts"],
  },
});

Workflow.addStep(FunctionDefinition, {
  channel_id: Workflow.inputs.channel_id,
  message_ts: Workflow.inputs.message_ts,
});

export default Workflow;
