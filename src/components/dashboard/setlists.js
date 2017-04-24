import React, { Component } from 'react';
import axios from 'axios';
import SetlistCard from './setlist_card';

class Setlists extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    axios.get('http://localhost:3000/setlists')
      .then(({ data }) => this.setState({ setlists: data }))
      .catch(err => console.log(err));
  }
  renderSetLists = () => {
    return this.state.setlists
    ? this.state.setlists.map(setlist => <SetlistCard key={setlist._id} setlist={setlist} />)
    : <div></div>;
  }
  render() {
    return(
      <div className="container flex-row">
        {this.renderSetLists()}
      </div>
    );
  }
}
export default Setlists;
