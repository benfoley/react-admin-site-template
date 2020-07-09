import React, { Fragment } from 'react'
import {
  ArrayField,
  BooleanField,
  BooleanInput,
  CheckboxGroupInput,
  ChipField,
  Create,
  Datagrid,
  DateInput,
  DateField,
  Edit,
  EditButton,
  EmailField,
  ImageInput,
  ImageField,
  FileInput,
  FileField,
  Filter,
  FormDataConsumer,
  List,
  RichTextField,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TextInput
} from 'react-admin'
import RichTextInput from 'ra-input-rich-text';

const DataFilter = (props) => (
  <Filter {...props}>
    <TextInput source="name" alwaysOn />
  </Filter>
)

export const EntryList = props => (
  <List filters={<DataFilter />} {...props} perPage={25}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
)

const PostTitle = ({ record }) => {
  return <span>{record ? record.name : ''}</span>
}

export const EntryShow = (props) => (
  <Show title={<PostTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" addLabel={false} />
      <TextField className="name" source="name" addLabel={false} />
    </SimpleShowLayout>
  </Show>
)

export const EntryEdit = props => {
  return (
    <Edit {...props} undoable={false}>
      <SimpleForm>
        <TextField source="id" />
        <TextInput source="name" fullWidth />
      </SimpleForm>
    </Edit>
  )
}


export const EntryCreate = props => (
  <Create {...props} undoable={false}>
    <SimpleForm redirect="list">
      <TextInput source="name" fullWidth />
    </SimpleForm>
  </Create>
)
