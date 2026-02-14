# release-party

Trigger the Slack message to light up the SwitchBot Color Bulb.

![example](example.gif)

## Requirements

- Slack with paid plan
- Slack CLI
- [SwitchBot Color Bulb](https://www.switch-bot.com/products/switchbot-color-bulb)
- SwitchBot API Key
  - [SwitchBot Help Center: How to obtain a Token?](https://support.switch-bot.com/hc/en-us/articles/12822710195351-How-to-obtain-a-Token-)
- SwitchBot device id

## Usage

1. Setup

   ```sh
   git clone https://github.com/Doarakko/release-party
   cd release-party
   ```

2. Enter your release message and channel ids to `triggers/trigger.ts`

   ```ts
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
   ```

3. Deploy

   ```sh
   slack deploy
   slack trigger create

   # SwitchBot
   slack env add SWITCHBOT_API_KEY <your key>
   slack env add SWITCHBOT_DEVICE_ID <your id>
   ```

   When updating the trigger, run the following command.

   ```sh
   slack trigger update --trigger-id=yyyy
   ```

## Hints

### Run on local

1. Enter your environmental variables to `.env`

    ```sh
    cp .env.example .env
    ```

2. Run

   ```sh
   slack run
   slack trigger create
   ```

### Check using Slack incoming webhook

```sh
curl -X POST -H 'Content-type: application/json' --data '{"text":"test"}' "https://hooks.slack.com/services/xxxx/yyyy/zzzz"
```

### SwitchBot: get device id

```sh
curl "https://api.switch-bot.com/v1.0/devices" -H "Authorization: <SWITCHBOT_API_KEY>"
```

### SwitchBot: check if you can turn on the light via API

```sh
# on
curl -X POST -H 'Content-type: application/json' --data '{"command": "turnOn"}' "https://api.switch-bot.com/v1.0/devices/<SWITCHBOT_DEVICE_ID>/commands" -H "Authorization: <SWITCHBOT_API_KEY>"

# off
curl -X POST -H 'Content-type: application/json' --data '{"command": "turnOff"}' "https://api.switch-bot.com/v1.0/devices/<SWITCHBOT_DEVICE_ID>/commands" -H "Authorization: <SWITCHBOT_API_KEY>"
```

## Reference

- [release-party-5.0](https://github.com/Doarakko/release-party-5.0) - Philips Hue version using Raspberry Pi
- [職場を明るくする](https://devblog.thebase.in/entry/work-happy)
