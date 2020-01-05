/* eslint-disable array-callback-return */
import React from 'react';
import { connect } from 'react-redux';
import {
  Field, FieldArray, reduxForm, change, getFormValues,
} from 'redux-form';
import Data from './data';
import Tree from './func';
import renderCheckBoxField from '../../shared/components/form/CheckBox';

window.Data = Data;
window.Tree = Tree;

const renderMembers = ({ fields, checkOneSelect }) => (
  <ul>
    {fields.map(member => (
      <li key={member.name}>
        <Field
          name={`permissions[${member.name}]`}
          defaultChecked={member.isGranted}
          component={renderCheckBoxField}
          label={member.displayName}
          onChange={checkOneSelect}
          className="colored"
        />
      </li>
    ))}
  </ul>
);

class FieldArraysForm extends React.Component {
  constructor() {
    super();

    this.selectTab = false;
  }

  check = () => {
    const selector = getFormValues('MyfieldArrays');
    console.log('click', selector('AbpIdentity.Roles.Update'));
    // eslint-disable-next-line react/destructuring-assignment
    this.props.change('MyfieldArrays', 'AbpIdentity-Roles', false);
  }

  checkOneSelect = () => {
    console.log('checkOneSelect');
  }

  render() {
    const {
      handleSubmit, pristine, reset, submitting,
    } = this.props;
    const permissions = Data.reduce((acc, val) => [...acc, ...val.permissions], []);
    const isTrue = permissions.every(c => c.isGranted);
    this.selectTab = isTrue;
    return (
      <form onSubmit={handleSubmit}>
        <ul>
          <Field
            name="selectTab"
            component={renderCheckBoxField}
            defaultChecked={this.selectTab}
            label="Select all tab"
            onChange={this.allSelect}
            className="colored"
          />
          {
            Data.map(res => (
              <li key={res.name}>
                {res.displayName}
                <ul>
                  {
                    Tree(res.permissions).map(result => (
                      <li key={result.name}>
                        <Field
                          name={`permissions[${result.name}]`}
                          component={renderCheckBoxField}
                          onChange={this.check}
                          defaultChecked={result.isGranted}
                          label={result.displayName}
                          className="colored"
                        />
                        <FieldArray
                          fields={result.fields}
                          component={renderMembers}
                          checkOneSelect={this.checkOneSelect}
                        />
                      </li>
                    ))
                  }
                </ul>
              </li>
            ))
          }
        </ul>
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = {
  change,
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'MyfieldArrays',
})(FieldArraysForm));



/* eslint-disable */

import React, { Component } from 'react';
import { Modal, Button, ModalBody } from 'reactstrap';
import Form from './form';

function flattenObject(ob) {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) === 'object' && ob[i] !== null) {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[`${i}.${x}`] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

export default class Test extends Component {
  handleSubmit = (e) => {
    const flatObject = flattenObject(e.permissions);
    let newArray = []
    Object.entries(flatObject).map(res => {
      const [name, value] = res;
      const obj = {};
      obj.name = name;
      obj.isGranted = value;
      newArray.push(obj);
    })
    console.log(newArray)
  };

  render() {
    return (
      <div>
        <div>
          <Button>aç</Button>
        </div>
        <Modal size="lg" isOpen>
          <ModalBody>
            <Form onSubmit={this.handleSubmit} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
