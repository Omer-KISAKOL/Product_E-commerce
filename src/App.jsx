import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {Root} from "./routes/index.jsx";
import {store} from "./store.js";


function App() {

  return (
    <BrowserRouter
        future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        }}
    >
        <Provider store={store}>
            <Root/>
        </Provider>
    </BrowserRouter>
  )
}

export default App
