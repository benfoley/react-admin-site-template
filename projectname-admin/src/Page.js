import React, { Fragment } from 'react'
import {
  ArrayField,
  ArrayInput,
  AutocompleteArrayInput,
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
  SimpleFormIterator,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TextInput,
  UrlField,
  required
} from 'react-admin'
import RichTextInput from 'ra-input-rich-text';
import validator from 'validator'
import { parse } from "uri-js"

const DataFilter = (props) => (
  <Filter {...props}>
    <TextInput source="name" alwaysOn />
  </Filter>
)

export const PageList = props => (
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

export const PageShow = (props) => (
  <Show title={<PostTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" addLabel={false} />
      <TextField source="name" addLabel={false} className="name" />
      <RichTextField source="info" addLabel={false} className="info" />
      <ArrayField source="links">
        <Datagrid>
          <TextField source="title" label="" />
          <UrlField source="url" label="" />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
)

const validSchemes = ["https"]
const urlValidation = (value) => {
  const scheme = (value && parse(value).scheme) ? parse(value).scheme : undefined
  if (value && !validSchemes.includes(scheme)) {
    return 'Please use https:// for your URL'
  }
  if (value && !validator.isURL(value)) {
    return 'Not a valid URL'
  }
  return undefined
}
const validateUrl = [urlValidation]

export const PageEdit = props => {
  return (
    <Edit {...props} undoable={false}>
      <SimpleForm>
        <TextField source="id" />
        <TextInput source="name" fullWidth validate={required()} />
        <RichTextInput source="info" fullWidth validate={required()} />
        <ArrayInput source="links" label="Links" className="links">
          <SimpleFormIterator>
            <TextInput source="title" label="Link title" fullWidth />
            <TextInput source="url" label="Link URL" fullWidth validate={validateUrl} />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  )
}

export const PageCreate = props => (
  <Create {...props} undoable={false}>
    <SimpleForm redirect="list">
      <TextInput source="name" fullWidth validate={required()} />
      <RichTextInput source="info" fullWidth validate={required()} />
      <ArrayInput source="links" label="Links" className="links">
        <SimpleFormIterator>
          <TextInput source="title" label="Link title" fullWidth />
          <TextInput source="url" label="Link URL" fullWidth validate={validateUrl} />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
)
