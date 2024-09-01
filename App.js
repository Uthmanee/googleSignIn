import { View, Pressable, Image, Text, StyleSheet } from "react-native";

import { configureGoogleSignIn } from "./useGoogleSignIn";
import useGoogleSignIn from "./useGoogleSignIn";

configureGoogleSignIn();

export default function App() {
  const { googleSignOut, handleGoogleLogin, user } = useGoogleSignIn();
  console.log(user);

  console.log(
    "A man, a plan, a canal: Panama"
      .toLowerCase()
      .split(" ")
      .filter(
        (char) => (char >= "a" && char <= "z") || (char >= "0" && char <= "9")
      )
  );
  console.log(
    "A man, a plan, a canal: Panama"
      .toLowerCase()
      .split(" ")
      .filter(
        (char) => (char >= "a" && char <= "z") || (char >= "0" && char <= "9")
      )
      .reverse()
      .join("")
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleGoogleLogin}>
        <Text>Continue with Google</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={googleSignOut}>
        <Text>Sign Out</Text>
      </Pressable>
      {user?.photo && (
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: user?.photo }}
        />
      )}
      <Text>{user?.name}</Text>
      <Text>{user?.idToken}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",
  },
  button: {
    padding: 10,
    backgroundColor: "#DDDDDD",
    marginBottom: 20,
  },
  image: {
    height: 50,
    width: 50,
  },
});
