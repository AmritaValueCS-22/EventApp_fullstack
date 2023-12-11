/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import AsyncStorage from "@react-native-community/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const initialState = {
  isLoading: false,
  userProfileList: [],
  UserData: [],
  events: {},
  reasonForLeave: "",
  isLoggedIn: false,
  loginData: [],
  showSplash: true,
  status: "",
  userDetails: {},
  userNames: [],
  attedence: [],
  isProfileLoading: false,
};

export const signupAction = createAsyncThunk(
  "eventauth/eventSignup",
  async (body) => {
    const response = await fetch("http://192.168.56.1:5000/auth/signup", {
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
export const profileAction = createAsyncThunk(
  "eventauth/eventLogin",
  async (body) => {
    const response = await fetch(
      "http://192.168.56.1:5000/profile/add-profile",
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
      "http://192.168.56.1:5000/profile/add-profile",
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
      `http://192.168.56.1:5000/user/userDetails?userId=${userId}`,
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
    const response = await fetch("http://192.168.56.1:5000/events/add-event", {
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
export const loginAction = createAsyncThunk(
  "eventauth/eventLogin",
  async (body) => {
    const response = await fetch("http://192.168.56.1:5000/auth/login", {
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
  async (userId) => {
    const response = await fetch(
      `http://192.168.56.1:5000/user/userName?userId=${userId}`,
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
    const response = await fetch(
      "http://192.168.56.1:5000/user/attedence/add",
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
export const getAllAttedence = createAsyncThunk(
  "eventauth/getAttedence",
  async (userId) => {
    const response = await fetch(
      `http://192.168.56.1:5000/user/attedence/getAttedence?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log(result, "hfhfh");
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
      `http://192.168.56.1:5000/profile/add-profile`,
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
      `http://192.168.56.1:5000/profile/deleteProfile/${body.userId}?id=${body.id}`,
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
      `http://192.168.56.1:5000/profile/editProfile/${body.userId}`,
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
    updateEvents: (state, action) => {
      state.events = { ...state.events, ...action.payload };
    },
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
    },
  },
  extraReducers: (builder) => {
    // signup
    builder.addCase(signupAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupAction.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signupAction.rejected, (state, action) => {
      state.isLoading = false;
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

    builder.addCase(getUserDetailsAction.pending, (state) => {});
    builder.addCase(getUserDetailsAction.fulfilled, (state, action) => {
      state.userDetails = action.payload;
    });
    builder.addCase(getUserDetailsAction.rejected, (state, action) => {});
    // addEvent

    builder.addCase(addEventAction.pending, (state) => {});
    builder.addCase(addEventAction.fulfilled, (state, action) => {
      // state.userDetails = action.payload;
    });
    builder.addCase(addEventAction.rejected, (state, action) => {});
    // userNames

    builder.addCase(getAllNamesAction.pending, (state) => {});
    builder.addCase(getAllNamesAction.fulfilled, (state, action) => {
      state.userNames = action.payload.userNames;
    });
    builder.addCase(getAllNamesAction.rejected, (state, action) => {});
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
