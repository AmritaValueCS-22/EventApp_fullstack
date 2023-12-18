/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import AsyncStorage from "@react-native-community/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import Toast from "react-native-toast-message";

const initialState = {
  isLoading: false,
  isLoadingSignup: false,
  userProfileList: [],
  UserData: [],
  eventDetails: {},
  reasonForLeave: "",
  isLoggedIn: false,
  loginData: [],
  showSplash: true,
  status: "",
  userDetails: {},
  userNames: [],
  attedence: [],
  isProfileLoading: false,
  eventLoading: false,
  refresh: false,
  userLoading: false,
};

export const signupAction = createAsyncThunk(
  "eventauth/eventSignup",
  async (body) => {
    const response = await fetch("http://123.63.2.13:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    if (result.statuscode === 201) {
      Toast.show({
        type: "SuccessToast",
        text1: result.message,
      });
    }

    if (result.statuscode === 400) {
      Toast.show({
        type: "ErrorToast",
        text1: result.message,
      });
    }

    return result;
  }
);

const getDifferDate = (start, end) => {
  const dates = [];
  const currentDate = moment(start);

  while (currentDate.isSameOrBefore(end)) {
    dates.push(currentDate.format("YYYY-MM-DD"));
    currentDate.add(1, "days");
  }
  return dates;
};
export const profileAction = createAsyncThunk(
  "eventauth/eventLogin",
  async (body) => {
    const response = await fetch(
      "http://123.63.2.13:3000/profile/add-profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();

    if (result.statuscode === 200) {
      Toast.show({
        type: "SuccessToast",
        text1: result.message,
      });
    }

    if (result.statuscode === 400) {
      Toast.show({
        type: "ErrorToast",
        text1: result.message,
      });
    }

    return result;
  }
);
export const AddProfileAction = createAsyncThunk(
  "eventauth/addprofile",
  async (body) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: body.token,
    };
    const response = await fetch(
      "http://123.63.2.13:3000/profile/add-profile",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();

    if (result.statuscode === 200) {
      Toast.show({
        type: "SuccessToast",
        text1: result.message,
      });
      return result;
    }

    if (result.statuscode === 400) {
      Toast.show({
        type: "ErrorToast",
        text1: result.message,
      });
    }
  }
);
export const getUserDetailsAction = createAsyncThunk(
  "eventauth/userDetails",
  async (userId) => {
    const response = await fetch(
      `http://123.63.2.13:3000/user/userDetails?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (result.statuscode === 200) {
      // Toast.show({
      //   type: "SuccessToast",
      //   text1: result.message,
      // });
      return result;
    }

    if (result.statuscode === 400) {
      // Toast.show({
      //   type: "ErrorToast",
      //   text1: result.message,
      // });
    }
  }
);
export const addEventAction = createAsyncThunk(
  "eventauth/addEvent",
  async (body) => {
    const response = await fetch("http://123.63.2.13:3000/events/add-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: body.token,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    if (result.statuscode === 200) {
      Toast.show({
        type: "SuccessToast",
        text1: result.message,
      });
      return result;
    }

    if (result.statuscode === 400) {
      Toast.show({
        type: "ErrorToast",
        text1: result.message,
      });
    }
  }
);
export const editEventAction = createAsyncThunk(
  "eventauth/editEvent",
  async (body) => {
    const response = await fetch(
      `http://123.63.2.13:3000/events/edit-event?eventId=${body.eventId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: body.token,
        },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();

    if (result.statuscode === 200) {
      Toast.show({
        type: "SuccessToast",
        text1: result.message,
      });
      return result;
    }

    if (result.statuscode === 400) {
      Toast.show({
        type: "ErrorToast",
        text1: result.message,
      });
    }
  }
);
export const loginAction = createAsyncThunk(
  "eventauth/eventLogin",
  async (body) => {
    const response = await fetch("http://123.63.2.13:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    if (result.statuscode === 200) {
      await AsyncStorage.setItem("token", result.token);
      await AsyncStorage.setItem("userId", result.userId);
      await AsyncStorage.setItem("userRole", result.userRole);
      await AsyncStorage.setItem("phoneNumber", result.phoneNumber);

      Toast.show({
        type: "SuccessToast",
        text1: result.message,
      });
      return result;
    }

    if (result.statuscode === 400) {
      Toast.show({
        type: "ErrorToast",
        text1: result.message,
      });
    }
  }
);
export const getAllNamesAction = createAsyncThunk(
  "eventauth/userNames",
  async (body) => {
    const response = await fetch(
      `http://123.63.2.13:3000/user/profileName?userId=${body.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (result.statuscode === 200) {
      // Toast.show({
      //   type: "SuccessToast",
      //   text1: result.message,
      // });
      return result;
    }

    if (result.statuscode === 400) {
      // Toast.show({
      //   type: "ErrorToast",
      //   text1: result.message,
      // });
    }
  }
);
export const addAttedence = createAsyncThunk(
  "eventauth/addAttedence",
  async (body) => {
    const response = await fetch("http://123.63.2.13:3000/user/attedence/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: body.token,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    if (result.statuscode === 200) {
      Toast.show({
        type: "SuccessToast",
        text1: result.message,
      });
      return result;
    }

    if (result.statuscode === 400) {
      Toast.show({
        type: "ErrorToast",
        text1: result.message,
      });
    }
  }
);
export const getAllAttedence = createAsyncThunk(
  "eventauth/getAttedence",
  async (userId) => {
    const response = await fetch(
      `http://123.63.2.13:3000/user/attedence/getAttedence?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (result.statuscode === 200) {
      // Toast.show({
      //   type: "SuccessToast",
      //   text1: result.message,
      // });
      return result;
    }

    if (result.statuscode === 400) {
      // Toast.show({
      //   type: "ErrorToast",
      //   text1: result.message,
      // });
    }
  }
);
export const createProfileAction = createAsyncThunk(
  "eventauth/createprofile",
  async (body) => {
    const response = await fetch(
      `http://123.63.2.13:3000/profile/add-profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: body.token,
        },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();

    if (result.statuscode === 200) {
      Toast.show({
        type: "SuccessToast",
        text1: result.message,
      });
      return result;
    }

    if (result.statuscode === 400) {
      Toast.show({
        type: "ErrorToast",
        text1: result.message,
      });
    }
  }
);
export const deleteProfileAction = createAsyncThunk(
  "eventauth/deleteProfile",
  async (body) => {
    const response = await fetch(
      `http://123.63.2.13:3000/profile/deleteProfile/${body.userId}?id=${body.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (result.statuscode === 200) {
      Toast.show({
        type: "SuccessToast",
        text1: result.message,
      });
      return result;
    }

    if (result.statuscode === 400) {
      Toast.show({
        type: "ErrorToast",
        text1: result.message,
      });
    }
  }
);
export const editProfileAction = createAsyncThunk(
  "eventauth/editProfile",
  async (body) => {
    const response = await fetch(
      `http://123.63.2.13:3000/profile/editProfile/${body.userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();

    if (result.statuscode === 200) {
      Toast.show({
        type: "SuccessToast",
        text1: result.message,
      });
      return result;
    }

    if (result.statuscode === 400) {
      Toast.show({
        type: "ErrorToast",
        text1: result.message,
      });
    }
  }
);
export const getEventDetailsAction = createAsyncThunk(
  "eventauth/getEventDetails",
  async (body) => {
    const response = await fetch(
      `http://123.63.2.13:3000/user/userEvents?userId=${body.userId}&&id=${body.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (result.statuscode === 200) {
      // Toast.show({
      //   type: "SuccessToast",
      //   text1: result.message,
      // });
      return result;
    }

    if (result.statuscode === 400) {
      // Toast.show({
      //   type: "ErrorToast",
      //   text1: result.message,
      // });
    }
  }
);
export const getAttendenceAction = createAsyncThunk(
  "eventauth/getAttendence",
  async (body) => {
    const response = await fetch(
      `http://123.63.2.13:3000/user/userAttendence?userId=${body.userId}&&id=${body.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (result.statuscode === 200) {
      // Toast.show({
      //   type: "SuccessToast",
      //   text1: result.message,
      // });
      return result;
    }

    if (result.statuscode === 400) {
      // Toast.show({
      //   type: "ErrorToast",
      //   text1: result.message,
      // });
    }
  }
);
const eventAuthReducer = createSlice({
  name: "eventauth",
  initialState,
  reducers: {
    updateUserProfileList: (state, action) => {
      state.userProfileList = action.payload;
    },
    updateUserData: (state, action) => {
      state.UserData = action.payload;
    },
    // updateEvents: (state, action) => {
    //   state.events = { ...state.events, ...action.payload };
    // },
    updateReason: (state, action) => {
      state.reasonForLeave = action.payload;
    },
    updateSplash: (state, action) => {
      state.showSplash = action.payload;
    },
    logout: (state, action) => {
      state.loginData = [];
      state.isLoading = false;
      state.userDetails = [];
      state.eventDetails = {};
    },
  },
  extraReducers: (builder) => {
    // signup
    builder.addCase(signupAction.pending, (state) => {
      state.isLoadingSignup = false;
    });
    builder.addCase(signupAction.fulfilled, (state, action) => {
      state.isLoadingSignup = action.payload.statuscode === 400 ? false : true;
    });
    builder.addCase(signupAction.rejected, (state, action) => {
      state.isLoadingSignup = false;
    });

    // login

    builder.addCase(loginAction.pending, (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.status = "loading";
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isLoading = true;
      state.isLoggedIn = true;
      state.loginData = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.status = "failed";
    });
    // userDetails

    builder.addCase(getUserDetailsAction.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(getUserDetailsAction.fulfilled, (state, action) => {
      state.userDetails = action.payload;
      state.userLoading = false;
    });
    builder.addCase(getUserDetailsAction.rejected, (state, action) => {
      state.userLoading = true;
    });
    // addEvent

    builder.addCase(addEventAction.pending, (state) => {});
    builder.addCase(addEventAction.fulfilled, (state, action) => {
      // state.userDetails = action.payload;
    });
    builder.addCase(addEventAction.rejected, (state, action) => {});
    // userNames

    builder.addCase(getAllNamesAction.pending, (state) => {
      state.refresh = false;
    });
    builder.addCase(getAllNamesAction.fulfilled, (state, action) => {
      state.refresh = false;
      state.profileNames = action.payload.profileNames;
    });
    builder.addCase(getAllNamesAction.rejected, (state, action) => {
      state.refresh = false;
    });
    // attedence

    builder.addCase(getAllAttedence.pending, (state) => {});
    builder.addCase(getAllAttedence.fulfilled, (state, action) => {
      state.attedence = action.payload.attedence;
    });
    builder.addCase(getAllAttedence.rejected, (state, action) => {});
    // create profie

    builder.addCase(createProfileAction.pending, (state) => {
      state.isProfileLoading = true;
    });
    builder.addCase(createProfileAction.fulfilled, (state, action) => {
      state.isProfileLoading = false;
    });
    builder.addCase(createProfileAction.rejected, (state, action) => {
      state.isProfileLoading = true;
    });
    // delete profie

    builder.addCase(deleteProfileAction.pending, (state) => {
      state.isProfileLoading = true;
    });
    builder.addCase(deleteProfileAction.fulfilled, (state, action) => {
      state.isProfileLoading = false;
    });
    builder.addCase(deleteProfileAction.rejected, (state, action) => {
      state.isProfileLoading = true;
    });
    // eventDetails

    builder.addCase(getEventDetailsAction.pending, (state) => {
      state.eventLoading = false;
      state.refresh = true;
    });
    builder.addCase(getEventDetailsAction.fulfilled, (state, action) => {
      const result = {};

      action.payload?.events?.forEach((event) => {
        const dates = getDifferDate(event.startDate, event.endDate);
        const currentDate = moment().format("YYYY-MM-DD");
        const yesterdayDate = moment().subtract(1, "day").format("YYYY-MM-DD");

        dates.forEach((date) => {
          result[date] = result[date] || [];

          const isTodayOrYesterday =
            date === currentDate || date === yesterdayDate;
          const isLoggedin =
            event.eventId && event?.userAttendence?.includes(date);
          result[date].push({
            location: event.location,
            eventName: event.eventName,
            startTime: event.startTime,
            endTime: event.endTime,
            startDate: date,
            endDate: event.endDate,
            eventId: event.eventId,
            isEnable: isTodayOrYesterday,
            isLoggedin: isLoggedin,
          });
        });
      });

      return {
        ...state,
        eventDetails: result,
        refresh: false,
      };
    });

    builder.addCase(getEventDetailsAction.rejected, (state, action) => {
      state.isProfileLoading = true;
      state.refresh = true;
    });
    // get attendence

    builder.addCase(getAttendenceAction.pending, (state) => {
      state.isProfileLoading = true;
      state.refresh = true;
    });
    builder.addCase(getAttendenceAction.fulfilled, (state, action) => {
      state.attedence = action.payload.attendence;
      state.refresh = false;
    });
    builder.addCase(getAttendenceAction.rejected, (state, action) => {
      state.isProfileLoading = true;
      state.refresh = true;
    });
  },
});

export const {
  updateUserProfileList,
  updateUserData,
  updateEvents,
  updateReason,
  updateSplash,
  logout,
} = eventAuthReducer.actions;
export default eventAuthReducer.reducer;
