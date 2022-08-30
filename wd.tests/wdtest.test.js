const { remote } = require("webdriverio");

function sleep(x) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, x));
}
jest.setTimeout(30000);
describe("List of paragraphs", () => {
  let browser;
  let input;
  let button;
  // beforeAll( async () => {
  // });

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
    input = await browser.$("input");
    button = await browser.$("button");
  });

  afterEach(async () => {
    await browser.deleteSession();
    await sleep(1000);
  });

  async function getParagraphs() {
    const pList = await browser.$$("p");
    const pListText = await Promise.all(pList.map((p) => p.getText()));
    return pListText;
  }

  async function clickButton() {
    // eslint-disable-next-line no-return-await
    return await button.click();
  }

  async function isInputVisible() {
    // eslint-disable-next-line no-return-await
    return await input.isDisplayed();
  }

  async function getInputValue() {
    // eslint-disable-next-line no-return-await
    return await input.getValue();
  }
  async function type(str) {
    // eslint-disable-next-line no-return-await
    return await input.setValue(str);
  }
  async function isButtonHidden() {
    // eslint-disable-next-line no-return-await
    return !(await button.isDisplayed());
  }

  it("renders 3 paragraphs and input", async () => {
    expect(await getParagraphs()).toEqual(["1", "2", "3"]);
    // поле ввода
    expect(await isInputVisible()).toBe(true);
  });

  it("adds new paragraph on button click", async () => {
    await type("123");

    await clickButton();

    expect((await getParagraphs()).length).toBe(4);

    expect((await getParagraphs())[0]).toBe("123");
    expect(await isButtonHidden()).toBe(true);
    expect(await getInputValue()).toBe("");
  });

  it("renders button which appears on input and disappears on clear", async () => {
    // ввести текст
    await type("123");

    expect(await isButtonHidden()).toBe(false);

    await type("");
    expect(await isButtonHidden()).toBe(false);
  });
});
