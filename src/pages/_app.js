import "@/styles/globals.css";
import {Provider} from "react-redux";
import {store} from "../store/store.js";
import {QueryClient, QueryClientProvider} from "react-query";
import PropTypes from "prop-types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>
  );
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
}