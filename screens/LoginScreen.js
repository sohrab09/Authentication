import { useState, useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { LoginUser } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function LoginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await LoginUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication Failed',
        'You are not a valid user',
        [{ text: 'Okay' }]
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Login Successfully" />
  }

  return <AuthContent isLogin onAuthenticate={LoginHandler} />;
}

export default LoginScreen;