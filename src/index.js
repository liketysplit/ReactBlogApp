import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route } from "react-router-dom";
import PostsIndex from "./containers/posts_index";
import ReduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
// import App from "./components/app";
import rootReducer from "./reducers";
import "bootstrap/dist/css/bootstrap.min.css"; // import Bootstrap CSS library
import "./index.css";

// const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStore(
	rootReducer,
	{},
	composeWithDevTools(applyMiddleware(ReduxPromise))
);
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Route path="/api/posts" component={PostsIndex} />
				<Route exact path="/" component={PostsIndex} />
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
