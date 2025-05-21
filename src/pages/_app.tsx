import type { AppProps } from "next/app";
import "@/assets/styles/globals.scss";
import { setupStore } from "@/store/store";
import { Provider } from "react-redux";
import { AuthWrapper } from "@/components/AuthWrapper";
import { LanguageWrapper } from "@/components/LanguageWrapper";

const store = setupStore();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <LanguageWrapper>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </LanguageWrapper>
    </Provider>
  );
};

export default App;