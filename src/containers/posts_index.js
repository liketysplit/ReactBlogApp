import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/index";
import { Link } from "react-router-dom";
import _ from "lodash";

class PostsIndex extends Component {
	componentDidMount() {
		this.props.fetchPosts();
	}

	renderPosts() {
		return _.map(this.props.posts, post => {
			return (
				// <li className="list-group-item" key={post._id}>
				// 	{post.title}
				// </li>
				<Link to={`/api/posts/${post._id}`}>{post.title}</Link>
			);
		});
	}

	render() {
		// console.log(this.props.posts);
		return (
			<div className="container">
				<div className="float-right">
					<Link className="btn btn-primary" to="/api/posts/new">
						Add a Post
					</Link>
				</div>
				<div className="container">
					<h2>Posts</h2>
					<ul className="list-group">{this.renderPosts()}</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { posts: state.posts };
}

export default connect(
	mapStateToProps,
	{ fetchPosts }
)(PostsIndex);
