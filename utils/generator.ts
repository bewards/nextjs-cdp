class DummyGenerator {
  readonly constants = {
    page: ["homepage", "garden-center", "hardware", "appliances", "DIY", "tool-rental", "paint", "flooring"],
    channel: ["WEB", "MOBILE_WEB", "MOBILE_APP"],
  };

  getRandomPageValue = (): string => {
    const values = this.constants.page;
    return values[Math.floor(Math.random() * values.length)];
  };
  getRandomChannelValue = (): string => {
    const values = this.constants.channel;
    return values[Math.floor(Math.random() * values.length)];
  };
}

const dummyGeneratorInstance = new DummyGenerator();
export { dummyGeneratorInstance as DummyGenerator };
