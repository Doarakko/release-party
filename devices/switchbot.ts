type Command = "turnOn" | "turnOff";

export default class SwitchBot {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  private async commandDevice(
    id: string,
    command: Command,
  ): Promise<void> {
    await fetch(
      `https://api.switch-bot.com/v1.0/devices/${id}/commands`,
      {
        method: "POST",
        headers: {
          "Authorization": this.key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: command,
        }),
      },
    );
  }

  public async turnOn(id: string): Promise<void> {
    await this.commandDevice(id, "turnOn");
  }

  public async turnOff(id: string): Promise<void> {
    await this.commandDevice(id, "turnOff");
  }
}
