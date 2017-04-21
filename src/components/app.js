import React, { Component } from 'react';
import axios from 'axios';
import { markdown } from 'markdown';

import SearchBox from './search-box';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      setlist: [],
      searchResults: [],
      currentSongLyrics: ''
    }
  }
  submitSearch = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/search', { q: this.state.q })
      .then(({ data }) => this.setState({ searchResults: data }))
  }
  getLyrics = e => {
    e.preventDefault();
    const songId = e.target.href.replace('http://localhost:8080/', '');
    axios.post('http://localhost:3000/lyrics', { songId })
      .then(data => {
        this.setState({ currentSongLyrics: data.data });
      });
  }
  renderSearchResults = () => this.state.searchResults.map(hit => {
    return (
      <li key={hit.result.id}>
        <span>{hit.result.full_title}</span>
        <br></br>
        <a
          onClick={this.getLyrics}
          href={hit.result.id}>View Lyrics</a>
      </li>
    );
  });
  render() {
    const content = markdown.toHTML(this.state.currentSongLyrics);
    return (
      <div>
        <SearchBox
          onSubmit={this.submitSearch}
          onChange={e => this.setState({ q: e.target.value })}/>
        <div className="row">
          <div className="col-md-4">
            <ul>{this.renderSearchResults()}</ul>
          </div>
          <div className="col-md-8" dangerouslySetInnerHTML={{ __html: content }}>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
