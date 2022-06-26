const Picnic = require("../../model/picnic.model");
const User = require("../../model/user.model");

const CreatePicnic = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPicnic = new Picnic({
      user: req.user.id,
      user_name: user.name,
      picnic_name: req.body.picnic_name,
      place: req.body.place,
      planed_date: req.body.planed_date,
      victuals: {
        food: req.body.food.split(",").map((item) => item.trim()),
        drinks: req.body.drinks.split(",").map((item) => item.trim()),
      },
      games: req.body.games.split(",").map((item) => item.trim()),
      things: req.body.things.split(",").map((item) => item.trim()),
      guests: req.body.guests.split(",").map((item) => item.trim()),
      note: req.body.note,
      participations: req.body.participations
        .split(",")
        .map((item) => item.trim()),
    });

    const picnic = await newPicnic.save();

    res.json(picnic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const GetPicnics = async (req, res) => {
  try {
    const picnics = await Picnic.find().sort({ created_date: -1 });
    res.json(picnics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const GetUserPicnics = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const picnics = await Picnic.find({ participations: user.name });

    res.json(picnics);
  } catch (err) {}
};

const GetIdPicnic = async ({ params: { id } }, res) => {
  try {
    const picnic = await Picnic.findOne({
      _id: id,
    });

    if (!picnic) return res.status(400).json({ msg: "Picnic not found" });

    return res.json(picnic);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

const isArray = (check) =>
  typeof check === "object" && check.constructor === Array;

const UpdatePicnic = async (req, res) => {
  try {
    const picnic = await Picnic.findById(req.params.id);

    Object.assign(picnic, {
      ...req.body,
      victuals: {
        food: isArray(req.body?.victuals[0]?.food)
          ? req.body?.victuals[0]?.food
          : req.body?.victuals[0]?.food?.split(",").map((item) => item.trim()),
        drinks: isArray(req.body?.victuals[0]?.drinks)
          ? req.body?.victuals[0]?.drinks
          : req.body?.victuals[0]?.drinks
              ?.split(",")
              .map((item) => item.trim()),
      },
      games: isArray(req.body?.games)
        ? req.body?.games
        : req.body?.games?.split(",").map((item) => item.trim()),
      things: isArray(req.body?.things)
        ? req.body?.things
        : req.body?.things?.split(",").map((item) => item.trim()),
      guests: isArray(req.body?.guests)
        ? req.body?.guests
        : req.body?.guests?.split(",").map((item) => item.trim()),
      participations: isArray(req.body?.participations)
        ? req.body?.participations
        : req.body?.participations?.split(",").map((item) => item.trim()),
    });

    await picnic.save();

    res.json(picnic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const DeltePicnic = async (req, res) => {
  try {
    const picnic = await Picnic.findById(req.params.id);

    if (!picnic) {
      return res.status(404).json({ msg: "Picnic not found" });
    }

    if (picnic.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await picnic.remove();

    res.json({ msg: "Picnic removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

const AddMsg = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findById(req.user.id).select("-password");
    const picnic = await Picnic.findById(req.params.id);

    const newMessage = {
      text: req.body.text,
      name: user.name,
      user: req.user.id,
    };

    picnic.messages.unshift(newMessage);

    await picnic.save();

    res.json({ ...newMessage, date: new Date() });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const DeleteMsg = async (req, res) => {
  try {
    const picnic = await Picnic.findById(req.params.id);

    const message = picnic.messages.find(
      (message) => message.id === req.params.message_id
    );

    if (!message) {
      return res.status(404).json({ msg: "message does not exist" });
    }

    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    picnic.messages = picnic.messages.filter(
      ({ id }) => id !== req.params.message_id
    );

    await picnic.save();

    return res.json(picnic.messages);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  CreatePicnic,
  GetPicnics,
  GetUserPicnics,
  GetIdPicnic,
  UpdatePicnic,
  DeltePicnic,
  AddMsg,
  DeleteMsg,
};
