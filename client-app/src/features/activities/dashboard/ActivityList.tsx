import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';



export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivitiesByDate } = activityStore;

    return (
        <>
            {groupedActivitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>

                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity}></ActivityListItem>
                    ))}

                </Fragment>
            ))}
        </>

    )
})