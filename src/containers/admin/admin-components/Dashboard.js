import React, { Component } from 'react';
import axios from 'axios';
import i18n from '../../../i18n';
import { withNamespaces } from 'react-i18next';


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[]
    }
    this.getData();
  }

  getData() {
    axios.get('https://case-users.herokuapp.com/getAllDashboardData')
      .then(response => this.setState({ data: response.data }));
  }

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;
    return (
      <section className='admin-dashboard-container'>
        <div className='language-container'><span onClick={() => this.changeLanguage('en')}>EN</span>/<span onClick={() => this.changeLanguage('no')}>NO</span></div>
        <article className='admin-dashboard-stat users-stat'>
          <p>{this.state.data[5]}</p>
          <div>
            <img src='/images/users.png' />
            <h2>{t('Users')}</h2>
          </div>
        </article>
        <article className='admin-dashboard-stat matches-stat'>
          <p>{this.state.data[2]}</p>
          <div>
            <img src='/images/soccer.png' />
            <h2>{t('Matches')}</h2>
          </div>
        </article>
        <article className='admin-dashboard-stat players-stat'>
          <p>{this.state.data[0]}</p>
        <div>
            <img src='/images/player.png' />
            <h2>{t('Players')}</h2>
          </div>
        </article>

        <article className='admin-dashboard-stat teams-stat'>
          <p>{this.state.data[1]}</p>
        <div>
            <img src='/images/team.png' />
            <h2>{t('Teams')}</h2>
          </div>
        </article>
        <article className='admin-dashboard-stat seasons-stat'>
          <p>{this.state.data[3]}</p>
        <div>
            <img src='/images/season.png' />
            <h2>{t('Seasons')}</h2>
          </div>
        </article>
        <article className='admin-dashboard-stat goals-stat'>
          <p>{this.state.data[4]}</p>
        <div>
            <img src='/images/goal.png' />
            <h2>{t('Goals')}</h2>
          </div>
        </article>


        <div className='admin-dashboard-graph'>

          </div>
      </section>
    )
  }
}

export default withNamespaces()(Dashboard);