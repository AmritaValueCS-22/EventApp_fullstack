import { View, Text } from "react-native";
import React from "react";
import StackNaviagator from "./src/Navigation/StackNaviagator";
import store from "./src/Redux/store";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/Helper/toastConfig";
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <StackNaviagator />
      <Toast
        config={toastConfig}
        position="top"
        bottomOffset={5}
        visibilityTime={2000}
      />
    </Provider>
  );
};

export default AppWrapper;
