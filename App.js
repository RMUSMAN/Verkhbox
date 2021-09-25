import React, { useEffect } from "react";
import { LogBox } from "react-native";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import NavigationRoot from "./app/navigation";
import NavigationService from "./app/navigation/NavigationService";
import { persistor, store } from "./app/Redux/store";
import StringsOfLanguages from "./app/util/stringsOfLanguage";


const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationRoot
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        <FlashMessage position="top" duration={4000} />
      </PersistGate>
    </Provider>
  );
};

// export default codePush(App);
export default App;
