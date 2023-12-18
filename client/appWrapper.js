import { View, Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect } from "react";
import StackNaviagator from "./src/Navigation/StackNaviagator";
import store from "./src/Redux/store";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/Helper/toastConfig";
import NetworkComponent from "./src/Screens/NetworkComponent";
const AppWrapper = () => {
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [connectionType, setConnectionType] = React.useState(null);

  const handleNetworkChange = (state) => {
    setConnectionStatus(state.isConnected);
    setConnectionType(state.type);
  };
  useEffect(() => {
    const netInfoSubscription = NetInfo.addEventListener(handleNetworkChange);
    return () => {
      netInfoSubscription && netInfoSubscription();
    };
  }, []);

  return (
    <Provider store={store}>
      <StackNaviagator connectionStatus={connectionStatus} />
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
