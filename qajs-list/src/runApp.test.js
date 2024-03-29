/**
 * @jest-environment jsdom
 */
import { runApp } from "./runApp";

describe("runApp", () => {
  it("is a fucnction", () => {
    expect(runApp).toBeInstanceOf(Function);
  });
  let el;
  let input;
  let button;
  beforeEach(() => {
    el = document.createElement("div");
    runApp(el);
    button = el.querySelector("button");
    input = el.querySelector("input");
  });

  function type(text) {
    input.value = text;
    input.dispatchEvent(new Event("input", {}));
  }

  function getParagraphs() {
    return [...el.querySelectorAll("p")].map((pEl) => pEl.innerHTML);
  }
  function clickButton() {
    button.click();
  }

  function isButtonHidden() {
    return button.hidden;
  }

  function getInputValue() {
    return input.value;
  }

  function clickParagraph(index) {
    el.querySelectorAll("p")[index].click();
  }

  it("renders 3 paragraphs and input", () => {
    expect(getParagraphs()).toEqual(["1", "2", "3"]);
    // поле ввода
    expect(el.querySelectorAll("input").length).toBe(1);
  });

  it("renders hidden button", () => {
    expect(isButtonHidden()).toBe(true);
  });

  it("renders button which appears on input and disappears on clear", () => {
    // ввести текст
    type("123");

    expect(isButtonHidden()).toBe(false);

    type("");
    expect(isButtonHidden()).toBe(true);
  });

  it("adds new paragraph on button click", () => {
    type("123");

    clickButton();

    expect(getParagraphs().length).toBe(4);

    expect(getParagraphs()[0]).toBe("123");

    expect(isButtonHidden()).toBe(true);
    expect(getInputValue()).toBe("");
  });

  it("adds maximum 5 paragraphs", () => {
    ["123", "234", "345"].forEach((text) => {
      type(text);
      clickButton();
    });
    expect(getParagraphs()).toEqual(["345", "234", "123", "1", "2"]);
  });
  // it("delete one pharagraph", () => {
  //   clickParagraph(1);

  //   expect(getParagraphs()).toEqual(["1", "3"]);

  // });
  it("Remove paragraph", () => {
    clickParagraph(0);
    expect(getParagraphs()).toEqual(["2", "3"]);
  });

  it("removes new paragraph", () => {
    type("123");
    clickButton();
    expect(getParagraphs()).toEqual(["123", "1", "2", "3"]);

    clickParagraph(0);
    expect(getParagraphs()).toEqual(["1", "2", "3"]);
  });

  it("removes any paragraph", () => {
    type("234");
    clickButton();

    type("345");
    clickButton();

    clickParagraph(4);
    expect(getParagraphs()).toEqual(["345", "234", "1", "2"]);
  });
});
