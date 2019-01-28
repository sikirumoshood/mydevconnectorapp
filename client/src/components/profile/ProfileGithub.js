import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: "b40ad624918b8a03149c",
      clientSecret: "ae5ad2e3665375de5f934cbc2d04156fe61288b5",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { clientId, clientSecret, count, sort } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => this.setState({ repos: data }))
      .catch(err => console.log(`GITHUB_ERROR: ${err}`));
  }
  render() {
    const repoItems = this.state.repos.map(repo => (
      <div
        style={{ borderStyle: "none", backgroundColor: "#FAFAFA" }}
        key={repo.id}
        className="card card-body mb-2"
      >
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link
                to={repo.html_url}
                className="text-info"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div
            style={{ borderStyle: "none", backgroundColor: "#FAFAFA" }}
            className="col-md-6"
          >
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};
export default ProfileGithub;
