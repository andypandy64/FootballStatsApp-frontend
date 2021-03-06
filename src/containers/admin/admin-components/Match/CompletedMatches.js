import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table';
import EditPage from '../EditPage';
import AddPage from './AddMatch';

class CompletedMatches extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 'table',
      itemToEdit: {},
      itemFields: ['match_id', 'match_date', 'home_team_id', 'away_team_id', 'season_id', 'location_id'],
      itemFieldsName: ['Match ID', 'Match Date', 'Home Team', 'Away Team', 'Season', 'Location Name'],
      renderTable: [],
      renderComplete: false
    }
    this.onEdit = this.onEdit.bind(this);
  }


  componentDidMount() {

    const matches = axios.get("https://case-match.herokuapp.com/showCompletedMatches");
    const teams = axios.get("https://case-team.herokuapp.com/showAllTeamData");
    const seasons = axios.get("http://case-season.herokuapp.com/showSeasons");
    const locations = axios.get("http://case-address.herokuapp.com/showAddresses");

    Promise.all([matches, teams, seasons, locations]).then(values => {
      const renderTable = [];
      values[0].data.forEach((match, i) => {
        const home_team = values[1].data.find(team => team.team_id === match.home_team_id);
        const away_team = values[1].data.find(team => team.team_id === match.away_team_id);
        const season = values[2].data.find(season => season.season_id === match.season_id);
        const location = values[3].data.find(location => location.location_id === match.location_id);
        renderTable[i] = {
          match_id: match.match_id,
          match_date: match.match_date,
          home_team_id: home_team.association_name,
          away_team_id: away_team.association_name,
          season_id: season.name,
          location_id: location.location_name
        }
      });
      this.setState({ renderTable: renderTable });
    });
  }


  onEdit(editItem) {
    this.setState({ activePage: 'editPage', itemToEdit: editItem});
  }

  addPage = () => {
    this.setState({ activePage: 'addPage'});
  }

  onRouteChange = () => {
    this.setState({activePage: 'table'})
  }

  getView() {
    console.log(this.state.renderTable, 'renderTable getview');
    switch (this.state.activePage) {
      case 'table':
        return <Table objectList={this.state.renderTable} onEdit={this.onEdit} addPage={this.addPage} itemFieldsName={this.state.itemFieldsName} itemFields={this.state.itemFields} title='Matches' addButton='Add Match' helperAPI={this.state.helperAPI} helperAPIfield={this.state.helperAPIfield} />
      default:
        break;
    }
  }

  render() {
    console.log(this.state, 'render');
    if (!this.state.renderTable) return 'Loading...';
    console.log('hit');
    return ( 
      <div>
        {this.getView()}
      </div>
    )
  }
}

export default CompletedMatches;