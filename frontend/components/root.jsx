import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SessionFormContainer from './session/session_form_container';
import ExpenseContainer from './expenses/expense_container';
import WeeklyReportContainer from './weekly_report/weekly_report_container';
import CustomReportContainer from './custom_report/custom_report_container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const Root = ({ store }) => {
  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace('login');
    }
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('expenses');
    }
  };

  return (
    <Provider store={ store }>
      <MuiThemeProvider>
        <Router history={ hashHistory } >
          <Route path="/" component={ App } >
            <IndexRoute component={ SessionFormContainer } onEnter={ _redirectIfLoggedIn } />
            <Route path="login" component={ SessionFormContainer } onEnter={ _redirectIfLoggedIn } />
            <Route path="signup" component={ SessionFormContainer } onEnter={ _redirectIfLoggedIn } />
            <Route path="expenses" component={ ExpenseContainer } onEnter={ _ensureLoggedIn } />
            <Route path="weekly_report" component={ WeeklyReportContainer } onEnter={ _ensureLoggedIn } />
            <Route path="custom_report" component={ CustomReportContainer } onEnter={ _ensureLoggedIn } />
          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};

export default Root;
