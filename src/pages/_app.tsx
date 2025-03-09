import type { AppProps } from "next/app";
import "@/assets/styles/globals.scss";
import { setupStore } from "@/store/store";
import { Provider } from "react-redux";

const store = setupStore();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
