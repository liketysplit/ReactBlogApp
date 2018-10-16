import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

import PostsIndex from "./containers/posts_index";
import PostsNew from "./containers/posts_new";

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
				<Switch>
					<Route path="/api/posts/new" component={PostsNew} />
					<Route exact path="/" component={PostsIndex} />
					<Route path="/api/posts" component={PostsIndex} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
