import { StatusCodes } from "http-status-codes";
import User from "../model/userSchema.js";
import moment from "moment";

export const attendanceUpdate = async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      eventName,
      id,
      attendance,
      reason,
      startDate,
      endDate,
      eventId,
      name,
      phoneNumber,
    } = req.body;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User not found",
        statuscode: StatusCodes.BAD_REQUEST,
      });
    }

    user.profile.forEach((item) => {
      if (item.id === id) {
        const attendanceObject = {
          eventName,
          attendance,
          reason,
          startDate,
          endDate,
          name,
          phoneNumber,
        };
        item.events.map((evt) => {
          if (evt.eventId === eventId) {
            evt.userAttendence =
              moment().format("YYYY-MM-DD") ===
              moment(startDate).format("YYYY-MM-DD")
                ? true
                : false;
          }
        });
        item.attedence = item.attedence || [];
        item.attedence.push(attendanceObject);
      }
    });

    if (user.userRole === "participant") {
      await user.save();

      return res.status(StatusCodes.OK).json({
        message: "Successfully Entered",
        statuscode: StatusCodes.OK,
        userProfile: user.profile,
      });
    }
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getAttedence = async (req, res) => {
  try {
    const { userId } = req.query;

    let user = await User.findOne({ userId });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User not found",
        statuscode: 400,
      });
    }
    let attedenceUser = [];
    const allUsers = await User.find({});
    allUsers.map((item) => {
      if (item.username !== "admin") {
        item.profile.map((attedences) => {
          console.log(attedences.attedence);
          attedenceUser = [...attedences.attedence, ...attedenceUser];
        });
      }
    });
    console.log(attedenceUser);
    if (user.userRole === "organizer") {
      res.status(StatusCodes.OK).json({
        message: "username fetched",
        statuscode: 200,
        attedence: attedenceUser,
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
