import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function ActivityFilters() {
    return (
        <>
            <Menu vertical size='large' style={{width: '100%', marginTop: 27}}>
                <Header icon='filter' attached color='teal' content='filters'></Header>
                <Menu.Item content='All activites'></Menu.Item>
                <Menu.Item content="I'm going"></Menu.Item>
                <Menu.Item content="I'm hosting"></Menu.Item>
            </Menu>
            <Header/>
            <Calendar />
        </>
    )
}