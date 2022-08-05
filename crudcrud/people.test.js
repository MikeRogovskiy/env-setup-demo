import {
  createPerson,
  readPerson,
  updatePerson,
  deletePerson,
} from "../utils/crud";

describe("CrudCrud: People", () => {
  // Cоздать фейковые данные
  it("can create a person", async () => {
    const name = `${Math.random()}`;
    const age = Math.ceil(Math.random() * 100);
    // отправить запрос на создание с этими данными

    const createResponseData = await createPerson({ age, name });
    // проверить ответ от запроса(что там есть наши данные)
    expect(createResponseData).toEqual(
      expect.objectContaining({
        age,
        name,
        _id: expect.stringMatching(/\w+/),
      })
    );
    // отправить запрос на чтение созданной персоны
    const readPersonResponseData = await readPerson(createResponseData._id);
    expect(readPersonResponseData).toEqual({
      age,
      name,
      _id: createResponseData._id,
    });
  });
  // Изменяем имя пользователя
  // cоздать пользователя
  it("can create a person", async () => {
    const name = `${Math.random()}`;
    const age = Math.ceil(Math.random() * 100);
    const createResponseData = await createPerson({ age, name });

    // создаем новое имя
    const newName = `new${Math.random()}`;
    // обновить пользователя
    await updatePerson(createResponseData._id, {
      ...createResponseData,
      name: newName,
    });
    // проверить имя
    const readPersonResponseData = await readPerson(createResponseData._id);
    expect(readPersonResponseData).toEqual({
      age,
      name: newName,
      _id: createResponseData._id,
    });
  });

  it("can create a person", async () => {
    const name = `${Math.random()}`;
    const age = Math.ceil(Math.random() * 100);
    const createResponseData = await createPerson({ age, name });

    // удаляем пользователя
    await deletePerson(createResponseData._id, createResponseData);

    // проверяем пользователя на наличие

    const readPersonResponseData = await readPerson(createResponseData);
    expect(readPersonResponseData).toEqual({
      type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
      title: "Not Found",
      status: 404,
      traceId: "0HMFUSLN7UELQ:00000001",
    });
  });
});
