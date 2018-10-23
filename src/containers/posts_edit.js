import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Link } from "react-router-dom";
import { updatePost } from "../actions";

class PostsEdit extends Component {
	renderTitleField(field) {
		const className = `form-control ${
			field.meta.touched && field.meta.error ? "is-invalid" : ""
		}`;

		return (
			<div className="form-group">
				<label>Title</label>
				<input {...field.input} className={className} type="text" />
				<div className="invalid-feedback">
					{field.meta.touched ? field.meta.error : ""}
				</div>
			</div>
		);
	}
	renderCategoryField(field) {
		return (
			<div className="form-group">
				<label>Category</label>
				<select {...field.input} className="form-control">
					<option />
					<option>React - Basics</option>
					<option>React - Router</option>
					<option>Redux - Basics</option>
					<option>Redux - Middleware</option>
					<option>Redux - Form</option>
					<option>NodeJS</option>
					<option>MongoDB</option>
				</select>
			</div>
		);
	}

	renderContentField(field) {
		return (
			<div className="form-group">
				<label>Content</label>
				<textarea
					{...field.input}
					className="form-control"
					type="text"
					rows="10"
				/>
			</div>
		);
	}

	renderReferencesField(field) {
		const className = `form-control ${
			field.meta.touched && field.meta.error ? "is-invalid" : ""
		}`;

		return (
			<div className="form-group">
				<label>References</label>
				<textarea
					{...field.input}
					className={className}
					type="text"
					rows="3"
				/>
				<div className="invalid-feedback">
					{field.meta.touched ? field.meta.error : ""}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		// console.log(values);
		this.props.updatePost(this.props.match.params.id, values, () => {
			// user is redirected to the '/' route
			this.props.history.push("/");
		});
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="container">
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field name="title" component={this.renderTitleField} />
					<Field
						name="category"
						component={this.renderCategoryField}
					/>

					<Field name="content" component={this.renderContentField} />

					<div>
						<label htmlFor="hasReferences">Has References?</label>
						<div>
							<Field
								name="hasReferences"
								id="hasReferences"
								component="input"
								type="checkbox"
							/>
						</div>
					</div>

					{this.props.hasRefsValue && (
						<Field
							name="references"
							component={this.renderReferencesField}
						/>
					)}
					<button type="submit" className="btn btn-primary">
						Update
					</button>
					<Link to="/" className="btn btn-primary">
						Cancel
					</Link>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		// The name of the error "title" here has to match the name of the field such that the erorr message shows up correctly
		errors.title = "Enter a title!";
	}
	if (values.hasReferences && !values.references) {
		// The name of the error "references" here has to match the name of the field such that the erorr message shows up correctly
		errors.references = "Enter references";
	}

	// if errors is empty, the form is fine to submit,
	// or redux form assumes form is invalid.
	return errors;
}

PostsEdit = reduxForm({
	validate,
	form: "PostsEditForm"
})(PostsEdit);

const selector = formValueSelector("PostsEditForm");

PostsEdit = connect(
	(state, ownProps) => {
		const title = selector(state, "title");
		const category = selector(state, "category");
		const content = selector(state, "content");
		const hasRefsValue = selector(state, "hasReferences");
		const refsValue = selector(state, "references");

		// pull initial values from state "posts"
		const initialValues = state.posts[ownProps.match.params.id];
		// props
		return {
			title,
			category,
			content,
			hasRefsValue,
			refsValue,
			initialValues
		};
	},
	{ updatePost }
)(PostsEdit);

export default PostsEdit;
