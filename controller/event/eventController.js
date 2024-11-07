const { Event } = require("../../models/event");
const ctrlWrapper = require("../../helper/ctrlWrapper");

const eventAdd = async (req, res, next) => {
  try {
    const { start, end, title } = req.body;

    if (!start || !title) {
      return res.status(400).json({
        status: "fail",
        message: "Необходимо заполнить все поля: start & title",
      });
    }

    

    // Создание нового контакта
    const newEvent = await Event.create({ start, end, title });

    // Ответ с созданным контактом
    res.status(201).json({
      status: "success",
      result: newEvent,
    });
  } catch (error) {
    console.error("Ошибка при добавлении контакта:", error);
    res.status(500).json({
      status: "error",
      message: "Ошибка на сервере",
    });
  }
};

const eventList = async (req, res, next) => {
  try {
    const result = await Event.find({});
    res.status(200).json({
      status: "success",
      code: 200,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const eventDel = async (req, res, next) => {
  console.log(req.params)
  const { id } = req.params;
  const result = await Event.findByIdAndRemove(id);
  console.log(result)
  res.json({
    status: "success",
    code: 200,
    result,
  });
};

module.exports = {
  eventList,
  eventAdd,
  eventDel,
};
