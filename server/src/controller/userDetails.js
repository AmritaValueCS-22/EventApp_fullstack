import { StatusCodes } from "http-status-codes";
import User from "../model/userSchema.js";

export const userDetails = async (req, res) => {
  try {
    const { userId } = req.query;

    let user = await User.findOne({ userId });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User not found",
        statuscode: 400,
      });
    }
    if (user.userRole === "participant") {
      res.status(StatusCodes.OK).json({
        message: "fetched userData",
        statuscode: 200,
        user,
      });
    } else {
      res.status(StatusCodes.OK).json({
        message: "fetched userData",
        statuscode: 200,
        user: await User.find({}),
        userEvents: user.events,
      });
    }
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Internal Server Error",
      statuscode: 400,
    });
  }
};
export const getAllUserNames = async (req, res) => {
  try {
    const { userId } = req.query;

    let user = await User.findOne({ userId });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User not found",
        statuscode: 400,
      });
    }
    let userNames = [];
    const allUsers = await User.find({});
    allUsers.map((item) => {
      if (item.username !== "Organizer") {
        userNames.push(item.username);
      }
    });

    if (user.userRole === "organizer") {
      res.status(StatusCodes.OK).json({
        message: "username fetched",
        statuscode: 200,
        userNames: userNames,
      });
    }
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Internal Server Error",
      statuscode: 400,
    });
  }
};
export const getAllProfileNames = async (req, res) => {
  try {
    const { userId } = req.query;

    let user = await User.findOne({ userId });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User not found",
        statuscode: 400,
      });
    }
    let profileNames = [];
    const allUsers = await User.find({});
    allUsers.map((item) => {
      if (item.username !== "Organizer") {
        item.profile.map((names) => {
          if (names.name !== undefined) {
            profileNames.push(names.name);
          }
        });
      }
    });

    if (user.userRole === "organizer") {
      console.log(profileNames);
      res.status(StatusCodes.OK).json({
        message: "profileName is fetched",
        statuscode: 200,
        profileNames: profileNames,
      });
    }
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Internal Server Error",
      statuscode: 400,
    });
  }
};

const getUserById = async (userId) => {
  return await User.findOne({ userId });
};

const getOrganizerEvents = (user) => {
  return user.events;
};

const getUserProfileEvents = (user, id) => {
  const events = [];
  user.profile.forEach((item) => {
    if (id === item.id) {
      events.push(...item.events);
    }
  });
  return events;
};

export const getEvents = async (req, res) => {
  try {
    const { userId, id } = req.query;
    console.log(userId, id);
    if (!userId || userId === "") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid user ID",
        statuscode: StatusCodes.BAD_REQUEST,
      });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User not found",
        statuscode: StatusCodes.BAD_REQUEST,
      });
    }

    let events = [];

    if (user.userRole === "organizer") {
      events = getOrganizerEvents(user);
    } else {
      events = getUserProfileEvents(user, id);
    }

    res.status(StatusCodes.OK).json({
      message: "Events fetched successfully",
      statuscode: StatusCodes.OK,
      events,
    });
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
const getUserProfileAttendence = (user, id) => {
  const attedence = [];
  user.profile.forEach((item) => {
    if (id === item.id) {
      console.log(item.attedence);
      attedence.push(...item.attedence);
    }
  });
  return attedence;
};
const getOrganizerAttendence = (user) => {
  const attendence = [];

  user.map((item) => {
    item.profile.map((att) => {
      attendence.push(...att.attedence);
    });
  });
  return attendence;
};
export const getAttendence = async (req, res) => {
  try {
    const { userId, id } = req.query;
    console.log(userId, id, "f");
    if (!userId || userId === "") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid user ID",
        statuscode: StatusCodes.BAD_REQUEST,
      });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User not found",
        statuscode: StatusCodes.BAD_REQUEST,
      });
    }

    let attendence = [];

    if (user.userRole === "organizer") {
      const allUser = await User.find({});

      attendence = getOrganizerAttendence(allUser);
    } else {
      attendence = getUserProfileAttendence(user, id);
    }

    res.status(StatusCodes.OK).json({
      message: "Attendence fetched successfully",
      statuscode: StatusCodes.OK,
      attendence,
    });
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
