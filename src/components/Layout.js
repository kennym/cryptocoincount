import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {LocaleProvider, Layout as AntLayout, Menu, Modal, Icon} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { StyleSheet, css } from 'aphrodite';
import {
   Router,
  Route,
  Link
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import GitHubButton from 'react-github-button';


import CurrencyPicker from './CurrencyPicker';
import ListPage from '../pages/List';
import SyncPage from '../pages/Sync';
import WatchListPage from '../pages/Watchlist';
import AboutPage from '../pages/About';
import ChartsPage from '../pages/Charts';
import Changelog from '../pages/Changelog';

import {fetchData} from '../actions';

import '../css/github.css';

const {Header, Content, Footer} = AntLayout;


const styles = StyleSheet.create({
  header: {
    background: '#404040',
    padding: '0 50px',
    height: '64px',
    lineHeight: '64px',
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 600px)': {
      padding: '0 10px'
    }
  },
  content: {
    padding: '50px',
    minHeight: '80vh',
    '@media (max-width: 600px)': {
      padding: '10px'
    }
  },
  logo: {
    display: 'flex',
  },
  logoImage: {
    maxHeight: '54px',
    marginRight: '10px'
  },
  h1: {
    color: 'white',
    fontSize: '24px',
    '@media (max-width: 1000px)': {
      display: 'none'
    },
    display: 'flex',
    alignItems: 'center'
  },
  menuLink: {
    color: 'white',
    textDecoration: 'none'
  },
  menu: {
    lineHeight: '64px',
    marginLeft: '20px',
    '@media (max-width: 600px)': {
      marginLeft: '0px'
    }
  },
  menuLabel: {
    '@media (max-width: 600px)': {
      display: 'none'
    }
  },
  menuItem: {
    fontSize: '14px',
    '@media (max-width: 600px)': {
      padding: '0px 10px',
    }
  },
  footer: {
    textAlign: 'center'
  },
  social: {
    margin: '0 auto',
    maxWidth: '320px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  noLine: {
    lineHeight: 0,
    marginBottom: '10px'
  }
})

const history = createHistory()
history.listen((location, action) => {
  if(window.ga) {
    setTimeout(() => {
      window.ga('gtm1.set', 'location', window.location.href);
      window.ga('gtm1.set', 'page', location.pathname);
      window.ga("gtm1.send", "pageview", location.pathname);
    }, 500)
  }
});


class Layout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      changelogVisible: false
    }
  }

  componentDidMount() {
    const {fetchData, currency} = this.props;
    fetchData(currency);

    if(window.FB) {
      window.FB.XFBML.parse();
    }

    if(window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }

  render() {
    const {navigation} = this.props;

    return   <Router history={history} >
    <LocaleProvider locale={enUS}>
      <AntLayout>
        <Header className={css(styles.header)}>
          <div className={css(styles.logo)}>
            <h1 className={css(styles.h1)}>
              <img src={require('../images/coin.png')} alt="Coin" className={css(styles.logoImage)} />
              <Link to="/" className={css(styles.menuLink)}>CryptocoinCount</Link>
            </h1>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[`nav-${navigation}`]}
                className={css(styles.menu)}
              >
                <Menu.Item key="nav-home" className={css(styles.menuItem)}><Link to="/"><Icon type="home" className={css(styles.menuIcon)} /> <span className={css(styles.menuLabel)}>Home</span></Link></Menu.Item>
                <Menu.Item key="nav-watchlist" className={css(styles.menuItem)}><Link to="/watch"><Icon type="eye-o" className={css(styles.menuIcon)}  /> <span className={css(styles.menuLabel)}>Watchlist</span></Link></Menu.Item>
                <Menu.Item key="nav-chart" className={css(styles.menuItem)}><Link to="/charts"><Icon type="area-chart" className={css(styles.menuIcon)}  /> <span className={css(styles.menuLabel)}>Charts</span></Link></Menu.Item>

                <Menu.Item key="nav-sync" className={css(styles.menuItem)}><Link to="/sync"><Icon type="sync" className={css(styles.menuIcon)}  /> <span className={css(styles.menuLabel)}>Import/Export</span></Link></Menu.Item>

                <Menu.Item key="nav-about" className={css(styles.menuItem)}><Link to="/about"><Icon type="question-circle-o" className={css(styles.menuIcon)}  /> <span className={css(styles.menuLabel)}>About</span></Link></Menu.Item>
              </Menu>
          </div>
          <div>
            <CurrencyPicker/>
          </div>
        </Header>
        <Content>
          <div className={css(styles.content)}>
            <Route exact path="/" component={ListPage}/>
            <Route path="/sync" history={history} component={SyncPage}/>
            <Route path="/watch" component={WatchListPage}/>
            <Route path="/charts" component={ChartsPage}/>

            <Route path="/about" component={AboutPage}/>
          </div>
        </Content>


        <Footer className={css(styles.footer)}>


          <div className={css(styles.social)}>
            <div className={css(styles.noLine)}>
              <iframe title="Reddit" src={`//www.redditstatic.com/button/button2.html?url=${encodeURIComponent('https://cryptocoincount.com')}`} height="69" width="51" scrolling="no" frameBorder="0"></iframe>
            </div>
            <div className={css(styles.noLine)}>
              <div className="fb-like" data-href="https://cryptocoincount.com" data-layout="box_count" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>
            </div>
            <div className={css(styles.noLine)}>
              <a className="twitter-share-button" data-size="large" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://cryptocoincount.com')}&text=${encodeURIComponent('Keep track of your cryptocoins with CryptocoinCount:')}`}>Tweet</a>
            </div>
            <div className={css(styles.noLine)}>
              <GitHubButton type="stargazers" size="large" namespace="timbroddin" repo="cryptocoincount" />
            </div>
          </div>

          <p><a href="#changelog" onClick={(e) => { e.preventDefault(); this.setState({ changelogVisible: true }) }}>version 1.2</a> &mdash; &copy; 2017 Tim Broddin</p>
        </Footer>

        <Modal
                  title="Changelog"
                  visible={this.state.changelogVisible}
                  onOk={() => this.setState({ changelogVisible: false })}
                  onCancel={() => this.setState({ changelogVisible: false })}
                  footer={null}
                >
                  <Changelog />
                </Modal>

      </AntLayout>
    </LocaleProvider>
    </Router>
  }
}

const mapStateToProps = (state) => {
  return {currency: state.currency, navigation: state.navigation}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (currency) => {
      dispatch(fetchData(currency));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
