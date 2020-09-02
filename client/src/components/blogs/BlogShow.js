import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBlog } from "../../actions";

const BASE_URL =
  "https://blog-bucket-advanced-node.s3-us-west-1.amazonaws.com/";
class BlogShow extends Component {
  componentDidMount() {
    this.props.fetchBlog(this.props.match.params._id);
  }
  renderImage() {
    if (this.props.blog.imageUrl) {
      return <img src={BASE_URL + this.props.blog.imageUrl} />;
    }
  }

  render() {
    if (!this.props.blog) {
      return "";
    }
    console.log(this.props.blog.imageUrl);
    const { title, content } = this.props.blog;

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        {this.renderImage()}
      </div>
    );
  }
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
