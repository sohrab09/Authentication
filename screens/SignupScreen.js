import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { CreateUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function SignupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await CreateUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication Failed',
        'Please use a valid email and password',
        [{ text: 'Okay' }]
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="User Create Successfully" />
  }

  return <AuthContent onAuthenticate={SignupHandler} />;
}

export default SignupScreen;