import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if(id) loadActivity(id).then(act => setActivity(act!))
    }, [id, loadActivity]);

    // function handleSubmit() {
    //     if(activity.id.length===0){
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         };
    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    //     } else {
    //         updateActivity(activity).then(()=> history.push(`/activities/${activity.id}`));
    //     }
    // }
    
    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const{name, value} = event.target;
    //     setActivity({...activity, [name]: value})
    // }

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return(
        <Segment clearing>
            <Formik enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
                {({handleSubmit}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Field placeholder='Title' name="title"></Field>
                        <Field placeholder='Description' name='description'></Field>
                        <Field placeholder='Category' name='category'></Field>
                        <Field type='date' placeholder='Date' name='date'></Field>
                        <Field placeholder='City' name='city'></Field>
                        <Field placeholder='Venue' name='venue'></Field>
                        <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                        <Button as={Link} to={`/activities`} floated='right' type='button' content='Cancel'/>
                    </Form>
                )}
            </Formik>
            
        </Segment>
    )
})