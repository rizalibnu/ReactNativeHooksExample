import React from "react";
import { Text, View, TextInput, Image, Dimensions } from "react-native";
import Composer from "react-composer";

import { fetchHero } from "./api";
import styles from "./styles";

class SubscribeHeroData extends React.Component {
  render() {
    return this.props.children();
  }
}

class DetectScroller extends React.Component {
  render() {
    return this.props.children();
  }
}

class AnimatedLoading extends React.Component {
  render() {
    return this.props.children();
  }
}

class Auth extends React.Component {
  render() {
    return this.props.children();
  }
}

class Tracking extends React.Component {
  render() {
    return this.props.children();
  }
}

class ThanosIsDead extends React.Component {
  render() {
    return this.props.children();
  }
}

class HeroData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hero: null,
      loading: false
    };
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetch();
    }
  }

  fetch = async () => {
    this.setState({ loading: true });
    const hero = await fetchHero(this.props.id);
    this.setState({ hero, loading: false });
  };

  render() {
    return this.props.children({
      hero: this.state.hero,
      loading: this.state.loading
    });
  }
}

class ScreenWidth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get("window").width.toFixed()
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.handleScreenResize, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleScreenResize = () => {
    this.setState({ width: Dimensions.get("window").width.toFixed() });
  };

  render() {
    return this.props.children({
      width: this.state.width
    });
  }
}

class ValueHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue
    };
  }

  render() {
    return this.props.children({
      value: this.state.value,
      setValue: value => this.setState({ value })
    });
  }
}

const Hero = props => {
  const { hero, loading, width, id, setID } = props;
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
            onChangeText={value => setID(value)}
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
};

export default props => (
  <Composer
    components={[
      <ValueHandler initialValue={0} />,
      ({ results: [valueHandler], render }) => (
        <HeroData id={valueHandler.value} children={render} />
      ),
      <ScreenWidth />,
      <SubscribeHeroData />,
      <DetectScroller />,
      <AnimatedLoading />,
      <Auth />,
      <Tracking />,
      <ThanosIsDead />
    ]}
  >
    {([valueHandler, heroData, screenWidth, ...args]) => (
      <Hero
        id={valueHandler.value}
        setID={valueHandler.setValue}
        hero={heroData.hero}
        loading={heroData.loading}
        width={screenWidth.width}
      />
    )}
  </Composer>
);
