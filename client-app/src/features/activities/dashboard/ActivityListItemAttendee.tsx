import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';

interface Props {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({attendees}: Props) {
  return (
      <List horizontal>
          {attendees.map( att => (
            <List.Item key={att.username} as={Link} to={`/profiles/${att.username}`}>
                <Image size='mini' circular src={att.image || '/assets/user.png'} />
            </List.Item>
          ))}
      </List>
  )  
});