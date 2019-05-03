import React from "react";
import { Text, View, TextInput, Image, Dimensions } from "react-native";

import { fetchHero } from "./api";
import styles from "./styles";

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      hero: null,
      loading: false,
      width: Dimensions.get("window").width.toFixed()
    };
  }

  componentDidMount() {
    this.fetch(this.state.id);
    this.interval = setInterval(this.handleScreenResize, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetch = async id => {
    this.setState({ loading: true });
    const hero = await fetchHero(id);
    this.setState({ hero, loading: false });
  };

  handleScreenResize = () => {
    this.setState({ width: Dimensions.get("window").width.toFixed() });
  };

  handleIDChange = value => {
    this.setState(
      {
        id: value
      },
      () => this.fetch(value)
    );
  };

  render() {
    const { id, hero, loading, width } = this.state;
    return (
      <View>
        <View style={styles.inputWrapper}>
          <View>
            <Text>ID :</Text>
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder="Input ID here!"
              value={`${id}`}
              onChangeText={this.handleIDChange}
            />
          </View>
        </View>
        {loading ? (
          <Text>Loading...</Text>
        ) : hero ? (
          <React.Fragment>
            <Text>{hero.name}</Text>
            <Image
              source={hero.source}
              resizeMode="contain"
              style={styles.image}
            />
            <Text>{`screen width size is: ${width}`}</Text>
          </React.Fragment>
        ) : (
          <Text>{`No Hero :(`}</Text>
        )}
      </View>
    );
  }
}

export default Hero;
