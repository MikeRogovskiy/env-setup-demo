const { remote } = require("webdriverio");

describe("List of paragraphs", () => {
  let browser;
  beforeEach(async () => {
    browser = await remote({
      capabilities: {
        browserName: "chrome",
      },
    });
    await browser.url("https://xvjhzt.csb.app/");
    await browser.$("input").waitForExist({
      timeout: 5000,
    });
  });
  afterEach(async () => {
    await browser.deleteSession();
  });

  async function getParagraphs() {
    const pList = await browser.$$("p");
    const pListText = await Promise.all(pList.map((p) => p.getText()));
    return pListText;
  }

  it("renders 3 paragraphs and input", async () => {
    expect(await getParagraphs()).toEqual(["1", "2", "3"]);
    // поле ввода
    // expect(el.querySelectorAll("input").length).toBe(1);
  });
});
