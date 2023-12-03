# release-party

Trigger the Slack release completion message to light up the smart light bulb.

## Requirements

- Slack with paid plan
- Slack CLI
- curl

### Smart light bulb

Compatible with the following smart bulbs.

#### SwitchBot

- [SwitchBot Color Bulb](https://www.switch-bot.com/products/switchbot-color-bulb)
- SwitchBot API Key
  - [SwitchBot Help Center: How to obtain a Token?](https://support.switch-bot.com/hc/en-us/articles/12822710195351-How-to-obtain-a-Token-)
- SwitchBot device id

#### Philips Hue

- [Philips Hue Bridge](https://www.philips-hue.com/en-us/p/hue-bridge/046677458478)
- [Philips Hue Smart Bulbs](https://www.philips-hue.com/en-hk/products/smart-lightbulbs)
- Philips Hue Bridge IP address
- Philips username and device id
  - [Philips Hue Developer: Getting started](https://developers.meethue.com/develop/get-started-2/)

## Usage

1. Setup

   ```sh
   git clone https://github.com/Doarakko/release-party
   cd release-party
   cp .env.example .env
   ```

2. Enter your environmental variables to `.env`

   Please specify your device.
   There is no need to change environment variables for devices that are not used.

   ```shell
    # DEVICE=SwitchBot
    DEVICE=Philips
   ```

3. Enter your release message and channel ids to `triggers/trigger.ts`

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

4. Deploy

   ```sh
   slack deploy
   slack trigger create
   ```

   ```sh
   slack trigger update --trigger-id=yyyy
   ```

## Hints

### Run on local

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
