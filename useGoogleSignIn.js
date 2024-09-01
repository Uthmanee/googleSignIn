import { useState } from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    // androidClientId:
    //   "267070101593-2l6iaf7p8lree9j54a4gi7kk5or7qcm6.apps.googleusercontent.com",
    webClientId:
      "1042066718115-fr6s183km77cq92dva1a7u0ige5s4hoo.apps.googleusercontent.com",
    scopes: ["openid", "profile", "email"],
    offlineAccess: true, // new
  });
};

const useGoogleSignIn = () => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const response = await GoogleLogin();
      console.log("response", response);
      const { user } = response;
      setLoading(false);

      setUser(user);
    } catch (error) {
      console.log("Message", error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // return;
        alert("User cancelled the login flow !"); // new
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // return;
        alert("Signin in progress"); // new
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // setError("Play Services Not Available");
        alert("Google play services not available or outdated !");
      } else {
        // setError("An error occured");
        console.log(error); // new
      }
    } finally {
      setLoading(false);
    }
  };

  const googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({});
    } catch (error) {
      console.error(error);
    }
  };

  return { error, handleGoogleLogin, loading, user, googleSignOut };
};

export default useGoogleSignIn;
