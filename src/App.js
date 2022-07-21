import useUserSession from "hooks/useUserSession";
import { Routes, Route } from "react-router-dom";
import AuthScreen from "screens/AuthScreen";
import SignedInScreen from "screens/SignedInScreen";

const App = () => {
  const isLoading = useUserSession();

  if (isLoading) return null;

  return (
    <Routes>
      <Route path="/auth" element={<AuthScreen />} />
      <Route path="/" element={<SignedInScreen />} />
    </Routes>
  );
};

export default App;
