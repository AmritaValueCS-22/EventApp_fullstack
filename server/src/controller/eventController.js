// Assuming you have ObjectId from mongoose
import mongoose from "mongoose";
import moment from "moment";
import User from "../model/userSchema.js";
import { StatusCodes } from "http-status-codes";
import { generateUniqueId } from "../helper/index.js";

export const addEvent = async (req, res) => {
  try {
    const { userId } = req.user;

    const {
      eventName,
      participants, // Array of participant usernames
      startDate,
      endDate,
      allDay,
      location,
      startTime,
      endTime,
      repeat,
    } = req.body;

    // Find the organizer by userId
    const organizer = await User.findOne({ userId });

    if (!organizer || organizer.userRole !== "organizer") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Permission denied. Only organizers can add events.",
        statuscode: 400,
      });
    }
    const newEvent = {
      eventName,
      participants,
      startDate,
      endDate,
      startTime,
      endTime,
      allDay,
      location,
      repeat,
      eventId: generateUniqueId(),
      userAttendence: false,
    };
    if (organizer.userRole === "organizer") {
      organizer.events.push(newEvent);

      const participantsData = await User.find({
        "profile.name": { $in: participants },
      });

      await Promise.all(
        participantsData.map(async (participant) => {
          participant.profile.forEach((profileItem) => {
            if (participants.includes(profileItem.name)) {
              profileItem.events.push(newEvent);
            }
          });

          await participant.save();
        })
      );

      // Save the organizer
      await organizer.save();
    }

    res.status(StatusCodes.CREATED).json({
      message: "Event added successfully",
      event: newEvent.eventId,
      statuscode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Event added successfully",
      statuscode: 400,
    });
  }
};

export const editEvent = async (req, res) => {
  try {
    const { userId } = req.user;
    const { eventId } = req.query;
    console.log(userId, eventId, "g");
    const {
      eventName,
      participants,
      startDate,
      endDate,
      allDay,
      location,
      startTime,
      endTime,
      repeat,
    } = req.body;

    const organizer = await User.findOne({ userId });

    if (!organizer || organizer.userRole !== "organizer") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Permission denied. Only organizers can edit events.",
        statuscode: 400,
      });
    }

    // Find the event to edit in the organizer's events array
    const eventToEditIndex = organizer.events.findIndex(
      (event) => event.eventId === eventId
    );

    if (eventToEditIndex === -1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Event not found",
        statuscode: 404,
      });
    }

    // Update the event details
    organizer.events[eventToEditIndex] = {
      eventName,
      participants,
      startDate,
      endDate,
      startTime,
      endTime,
      allDay,
      location,
      repeat,
      eventId,
      userAttendence: false,
    };

    // Update events for participants
    const participantsData = await User.find({
      "profile.name": { $in: participants },
    });

    await Promise.all(
      participantsData.map(async (participant) => {
        const participantEventIndex = participant.profile.findIndex(
          (profileItem) => participants.includes(profileItem.name)
        );

        if (participantEventIndex !== -1) {
          participant.profile[participantEventIndex].events[eventToEditIndex] =
            organizer.events[eventToEditIndex];

          await participant.save();
        }
      })
    );

    // Save the updated organizer
    await organizer.save();

    res.status(StatusCodes.OK).json({
      message: "Event updated successfully",
      event: eventId,
      statuscode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Error updating event",
      statuscode: 400,
    });
  }
};
