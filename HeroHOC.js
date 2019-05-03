import React from "react";
import { Text, View, TextInput, Image, Dimensions } from "react-native";
import { withState, compose } from "recompose";

import { fetchHero } from "./api";
import styles from "./styles";

const withSubscribeHeroData = Comp => {
  return class SubscribeHeroData extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withDetectScroller = Comp => {
  return class DetectScroller extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withAnimatedLoading = Comp => {
  return class AnimatedLoading extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withAuth = Comp => {
  return class Auth extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withTracking = Comp => {
  return class Tracking extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withIronManIsDead = Comp => {
  return class IronManIsDead extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withYouForever = Comp => {
  return class YouForever extends React.Component {
    render() {
      return <Comp {...this.props} />;
    }
  };
};

const withHeroData = Comp => {
  return class HeroData extends React.Component {
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
      return (
        <Comp
          {...this.props}
          hero={this.state.hero}
          loading={this.state.loading}
        />
      );
    }
  };
};

const withScreenWidth = Comp => {
  return class ScreenWidth extends React.Component {
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
      return <Comp {...this.props} width={this.state.width} />;
    }
  };
};

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

export default compose(
  withState("id", "setID", 0),
  withScreenWidth,
  withSubscribeHeroData,
  withHeroData,
  withDetectScroller,
  withAnimatedLoading,
  withAuth,
  withTracking,
  withIronManIsDead,
  withYouForever
)(Hero);
