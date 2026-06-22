import { Redirect } from 'expo-router';

/** Auth was removed — send any stale /login links to the main app. */
export default function LoginRedirect() {
  return <Redirect href="/(tabs)" />;
}
