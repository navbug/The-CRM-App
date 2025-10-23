import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleLoginButton";

const GoogleWrapper = () => (
  <GoogleOAuthProvider clientId="878071135054-db5833lgjtv54ae51d7qo6ivj704eus9.apps.googleusercontent.com">
    <GoogleLoginButton />
  </GoogleOAuthProvider>
);

export default GoogleWrapper;