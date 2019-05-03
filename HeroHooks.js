import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Image, Dimensions } from "react-native";

import { fetchHero } from "./api";
import styles from "./styles";

const useHeroData = id => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    if (typeof id === "undefined" || id === "") return;
    setLoading(true);
    const response = await fetchHero(id);
    setHero(response);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  return { hero, loading };
};

const useScreenWidth = () => {
  const [width, setWidth] = useState(Dimensions.get("window").width.toFixed());
  const handleScreenResize = () => {
    setWidth(Dimensions.get("window").width.toFixed());
  };
  useEffect(() => {
    const interval = setInterval(handleScreenResize, 10000);
    return () => {
      clearInterval(interval);
    };
  });

  return width;
};

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleValueChange = value => {
    setValue(value);
  };
  return {
    id: value,
    setID: handleValueChange
  };
};

const Hero = () => {
  const { id, setID } = useInput(0);
  const { hero, loading } = useHeroData(id);
  const width = useScreenWidth();

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

export default Hero;
