import React from "react";
import NewPersonForm from "../people/NewPersonForm";
import { connect } from 'react-redux';
import { addPerson } from '../../ducks/people';

const PersonPage = (props) => {
  const { addPerson } = props;
  return (
    <div>
      <NewPersonForm onSubmit={addPerson} />
    </div>
  );
};

export default connect(null, { addPerson })(PersonPage);