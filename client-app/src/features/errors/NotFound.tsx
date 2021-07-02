import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound(){
  return(
    <Segment placeholder>
      <Header icon>
        <Icon name='search'></Icon>
        Oops - Content Not Found...
      </Header>
      <Segment.Inline>
        <Button as={Link} to='/activities' primary>Return to activities</Button>
      </Segment.Inline>
    </Segment>
  )
}