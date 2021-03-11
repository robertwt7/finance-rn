import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import * as eva from "@eva-design/eva";
import { PersistGate } from "redux-persist/es/integration/react";
import { ThemeProvider } from "react-native-elements";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { registerRootComponent } from "expo";
import theme from "./theme";
import store, { persistor } from "./store/store";
import Routes from "./Routes";
import useLinking from "./navigation/useLinking";
import { default as kittenTheme } from "./kitten-theme.json";

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  }
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ApplicationProvider {...eva} theme={{ ...eva.dark, ...kittenTheme }}>
            <ThemeProvider theme={theme}>
              <View style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <NavigationContainer
                  ref={containerRef}
                  initialState={initialNavigationState}
                >
                  <Routes />
                </NavigationContainer>
              </View>
            </ThemeProvider>
          </ApplicationProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default registerRootComponent(App);
