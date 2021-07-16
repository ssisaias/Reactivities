import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import {Activity} from "../../../app/models/activity";
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

export default observer (function ActivityDetailedHeader({activity}: Props) {
    const {activityStore: {updateAttendace, loading, cancelActivityToggle}} = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {activity.isCancelled &&
                    <Label style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}} ribbon color='red' content='Cancelled'></Label>
                }
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle}/>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(activity.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ? (
                    <>
                    <Button color={activity.isCancelled? 'green': 'red'}
                        floated='left'
                        basic
                        content={activity.isCancelled?'Re-activity Activity': 'Cancel activity'}
                        loading={loading}
                        onClick={cancelActivityToggle}
                    />
                    <Button as={Link} to={`/manage/${activity.id}`} color='orange' floated='right' disabled={activity.isCancelled}>
                        Manage Event
                    </Button>
                    </>
                ) :  activity.isGoing ? (
                    <Button onClick={updateAttendace} loading={loading}>Cancel attendance</Button>
                ) : (
                    <Button onClick={updateAttendace} loading={loading} color='teal' disabled={activity.isCancelled}>Join Activity</Button>
                )}
                
            </Segment>
        </Segment.Group>
    )
})