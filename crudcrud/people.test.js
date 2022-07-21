const fetch = require("node-fetch");

describe("CrudCrud: People", () => {
  it("can create a person", async () => {
    const name = `${Math.random()}`;
    const age = Math.ceil(Math.random() * 100);
    const body = JSON.stringify({
      name,
      age,
    });

    const createPersonRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };

    const createResponse = await fetch(
      "https://crudcrud.com/api/d6c5d270b6994da9bc4982d395ee3f17/people",
      createPersonRequestOptions
    );
    const createResponseData = await createResponse.json();
    console.log(createResponseData);
  });
});
