import { Trigger } from "deno-slack-sdk/types.ts";
import {
  TriggerContextData,
  TriggerEventTypes,
  TriggerTypes,
} from "deno-slack-api/mod.ts";
import Workflow from "../workflows/workflow.ts";

const _test_channel_id = "CXXXX";

const trigger: Trigger<typeof Workflow.definition> = {
  type: TriggerTypes.Event,
  name: "trigger",
  description: "trigger",
  workflow: `#/workflows/${Workflow.definition.callback_id}`,
  event: {
    event_type: TriggerEventTypes.MessagePosted,
    filter: {
      version: 1.0,
      root: {
        operator: "AND",
        inputs: [
          {
            // triggers only bot messages
            statement: "{{data.user_id}} == null",
          },
          {
            operator: "OR",
            inputs: [
              {
                statement: "{{data.text}} CONTAINS 'deploy'",
              },
              {
                statement: "{{data.text}} CONTAINS 'test'",
              },
            ],
          },
        ],
      },
    },
    channel_ids: [_test_channel_id],
  },
  inputs: {
    channel_id: {
      value: TriggerContextData.Event.MessagePosted.channel_id,
    },
    message_ts: {
      value: TriggerContextData.Event.MessagePosted.message_ts,
    },
  },
};

export default trigger;
