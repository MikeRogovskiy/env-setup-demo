/* eslint-disable no-console */
const { remote } = require("webdriverio");

(async () => {
  const browser = await remote({
    capabilities: {
      browserName: "chrome",
    },
  });

  await browser.url("https://xvjhzt.csb.app/");

  await browser.$("input").waitForExist({
    timeout: 5000,
  });

  // type
  const input = await browser.$("input");
  console.log("@@input is visible:", await input.isDisplayed());

  await input.setValue("1");
  const button = await browser.$("button");

  console.log("@@Button is visible:", await button.isDisplayed());
  // getParagraphs
  const pList = await browser.$$("p");
  const pListText = await Promise.all(pList.map((p) => p.getText()));

  console.log("@@Visible text:", pListText);

  await input.setValue("123");
  // console.log('@@Button is visible:', await button.isDisplayed());
  // getInputValue
  console.log("@@Input value:", await input.getValue());

  // clickButton
  await button.click();
  console.log("@@Button is visible:", await button.isDisplayed());

  const pList2 = await browser.$$("p");
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  const pListText2 = await Promise.all(pList2.map((p) => p.getText()));

  console.log("@@Visible text:", pListText2);
  describe("wd.test", async () => {
    it("renders 3 paragraphs and input", () => {
      expect(pList()).toEqual(["1", "2", "3"]);
      // поле ввода
      expect(pListText.$$("input").length).toBe(1);
    });
    console.log("@@:renders 3 paragraphs and input", await input.isDisplayed());

    it("renders button which appears on input and disappears on clear", async () => {
      // ввести текст
      await input("123");

      expect(button()).toBe(false);

      await input("");
      expect(button()).toBe(true);
    });

    await browser.deleteSession();
  })();
})();
