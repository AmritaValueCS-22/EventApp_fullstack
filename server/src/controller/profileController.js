// src/controllers/profileController.js
import { StatusCodes } from "http-status-codes";
import User from "../model/userSchema.js";

export const addProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const userProfileData = req.body;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User not found",
        statuscode: StatusCodes.BAD_REQUEST,
      });
    }

    const organizerUser = await User.findOne(
      { email: "organizer@gmail.com" },
      "events"
    );
    user.profile.push(userProfileData);

    for (const item of organizerUser.events) {
      if (item.forAllUser) {
        const userProfile = user.profile.find(
          (i) => i.id === userProfileData.id
        );
        console.log(typeof userProfileData.id, userProfile);
        if (userProfile) {
          console.log("working");
          userProfile.events.push(item);
        }
      }
    }

    await user.save();

    res.status(StatusCodes.OK).json({
      message: "Profile added successfully",
      statuscode: StatusCodes.OK,
      userId,
    });
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const userProfileData = req.body;

    const user = await User.findOne({ userId });

    const findProfile = user.profile.find((profile) => {
      return profile.id === userProfileData.id;
    });

    console.log(findProfile, "hghgh");

    await user.save();
    if (!findProfile || !user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User not found",
        statuscode: 400,
      });
    }
    Object.assign(findProfile, userProfileData);
    await user.save();

    res.status(StatusCodes.OK).json({
      message: "Profile added successfully",
      statuscode: 200,
      id: userProfileData.id,
    });
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Internal Server Error",
      statuscode: 400,
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id } = req.query;

    const user = await User.findOne({ userId });
    const findProfileIndex = user.profile.findIndex((profile) => {
      return profile.id === id;
    });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User not found",
        statuscode: 400,
      });
    }
    if (findProfileIndex === -1) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Profile not found",
        statuscode: 400,
      });
    }

    user.profile.splice(findProfileIndex, 1);
    await user.save();
    //
    res.status(StatusCodes.OK).json({
      message: "Profile deleted successfully",
      statuscode: 200,
    });
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Internal Server Error",
      statuscode: 400,
    });
  }
};
