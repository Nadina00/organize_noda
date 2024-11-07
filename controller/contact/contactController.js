const { Contact } = require("../../models/contact");
const ctrlWrapper = require("../../helper/ctrlWrapper");

const contactAdd = async (req, res, next) => {
  try {
    const { name, tel, email, commit } = req.body;

    if (!name || !tel) {
      return res.status(400).json({
        status: "fail",
        message: "Необходимо заполнить все поля: имя, телефон и email",
      });
    }

    // Проверка, существует ли контакт с таким же именем
    const existingContact = await Contact.findOne({ name });

    if (existingContact) {
      return res.status(409).json({
        status: "fail",
        message: `Контакт с именем ${name} уже существует.`,
      });
    }

    // Создание нового контакта
    const newContact = await Contact.create({ name, tel, email, commit });

    // Ответ с созданным контактом
    res.status(201).json({
      status: "success",
      data: newContact,
    });
  } catch (error) {
    console.error("Ошибка при добавлении контакта:", error);
    res.status(500).json({
      status: "error",
      message: "Ошибка на сервере",
    });
  }
};

const contactsList = async (req, res, next) => {
  try {
    const result = await Contact.find({});
    res.status(200).json({
      status: "success",
      code: 200,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const contactDel = async (req, res, next) => {
  console.log(req.params)
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  console.log(result)
  res.json({
    status: "success",
    code: 200,
    result,
  });
};

module.exports = {
  contactsList,
  contactAdd,
  contactDel,
};
