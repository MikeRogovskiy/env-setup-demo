/**
 *
 */
export function runApp(el) {
  const mutableEL = el;
  mutableEL.innerHTML = `
    <div>
      <input />
      <button hidden>Add</button>
    </div>

    <div class="qa-history" data-testid="historyContainer">
      <p>1</p>
      <p>2</p>
      <p>3</p>
    </div>
  `;

  const button = el.querySelector("button");
  const input = el.querySelector("input");
  const historyContainer = el.querySelector('[data-testid="historyContainer"]');

  input.addEventListener("input", () => {
    button.hidden = !input.value;
  });

  el.addEventListener("click", (ev) => {
    if (ev.target.matches("p")) {
      ev.target.remove();
    }
  });

  button.addEventListener("click", () => {
    const newP = document.createElement("p");
    newP.innerHTML = input.value;
    historyContainer.prepend(newP);

    input.value = "";
    button.hidden = true;

    const paragraphs = [...historyContainer.querySelectorAll("p")];
    if (paragraphs.length > 5) {
      paragraphs[5].remove();
    }

    // const paragraphDelete = ("click", () => {

    // });
  });
}
