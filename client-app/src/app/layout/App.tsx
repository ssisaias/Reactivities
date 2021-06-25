import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivitiyForm from '../../features/activities/form/ActivitiyForm';
import activityDashboard from '../../features/activities/dashboard/activityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  
  return (
    <>
      <NavBar></NavBar>
      <Container style={{marginTop: '7em'}}>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/activities' component={activityDashboard} />
        <Route path='/activities/:id' component={ActivityDetails} />
        <Route path='/createActivity' component={ActivitiyForm} />
      </Container>
    </>
  );
}

export default observer(App);
