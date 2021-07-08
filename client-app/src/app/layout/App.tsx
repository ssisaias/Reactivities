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
import ServerError from '../../features/errors/ServerError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import { Switch } from 'react-router-dom';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(()=> {
    if(commonStore.token){
      userStore.getUser().finally(()=> commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>

  return (
    <>
      <ToastContainer position='bottom-right'></ToastContainer>
      <Route exact path='/' component={HomePage} />
      <Route path={`/(.+)`} render={()=>(
        <>
          <NavBar></NavBar>
          <Container style={{marginTop: '7em'}}>
            <Switch>
              <Route exact path='/activities' component={activityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route path={['/createActivity', '/manage/:id']} key={location.key} component={ActivitiyForm} />
              <Route path='/errors' component={TestErrors}></Route>
              <Route path='/server-error' component={ServerError}></Route>
              <Route path='/login' component={LoginForm}></Route>
              <Route component={NotFound} />
            </Switch>
          </Container>
        </>
      )}/>
    </>
  );
}

export default observer(App);
