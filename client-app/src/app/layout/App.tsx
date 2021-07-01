import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivitiyForm from '../../features/activities/form/ActivitiyForm';
import activityDashboard from '../../features/activities/dashboard/activityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right'></ToastContainer>
      <Route exact path='/' component={HomePage} />
      <Route path={`/(.+)`} render={()=>(
        <>
          <NavBar></NavBar>
          <Container style={{marginTop: '7em'}}>
            <Route exact path='/activities' component={activityDashboard} />
            <Route path='/activities/:id' component={ActivityDetails} />
            <Route path={['/createActivity', '/manage/:id']} key={location.key} component={ActivitiyForm} />
            <Route path='/errors' component={TestErrors}></Route>
          </Container>
        </>
      )}/>
    </>
  );
}

export default observer(App);
