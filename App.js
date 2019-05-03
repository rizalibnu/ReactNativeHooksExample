import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// import Hero from "./HeroBasic";
// import Hero from "./HeroHOC";
// import Hero from "./HeroRenderProps";
// import Hero from "./HeroRenderPropsComposer";
import Hero from "./HeroHooks";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

const App = () => {
  return (
    <View style={styles.container}>
      <Hero />
    </View>
  );
};

export default App;
