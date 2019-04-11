import React, { Component } from "react";

export default class Grid extends Component {
  constructor(props) {
    super(props);
    let repos;
    if (__isBrowser__) {
      // if browser bundle running i.e. code being executed on client
      // grab repos from initial data and deletes it from window
      // if didn't happen React would wipe template rendered on server
      repos = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      // if server bundle running i.e. code being executed on server
      // grab repos from context given to 'getHtmlString' function
      repos = this.props.staticContext.data;
    }
    this.state = {
      repos,
      loading: repos ? false : true
    };
    this.fetchRepos = this.fetchRepos.bind(this);
  }
  componentDidMount() {
    if (!this.state.repos) {
      // if no repos at point of mount
      // e.g. when navigating within client app from one page to another
      // get repos via API request
      this.fetchRepos(this.props.match.params.id);
    }
  }
  componentDidUpdate(nextProps) {
    // when navigating from one grid to another the component
    // will update, not dismount and remount
    const { match, fetchInitialData } = this.props;
    if (nextProps.match.params.id !== match.params.id) {
      // if navigating to a new page get new repos
      this.fetchRepos(nextProps.match.params.id);
    }
  }
  fetchRepos(lang) {
    this.setState({ loading: true });
    this.props
      .fetchInitialData(lang)
      .then(repos => this.setState({ repos, loading: false }));
  }
  render() {
    const { repos, loading } = this.state;
    if (loading) {
      return <h1>LOADING!</h1>;
    }
    return (
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {repos.map(({ name, owner, stargazers_count, html_url }) => (
          <li key={name} style={{ margin: 30 }}>
            <ul>
              <li>
                <a href={html_url}>{name}</a>
              </li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}
