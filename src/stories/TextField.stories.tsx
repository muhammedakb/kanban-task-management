import { Formik } from 'formik';
import * as Yup from 'yup';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '../components/Button';
import TextField from '../components/TextField';

export default {
  title: 'Text Field',
  component: TextField,
} as ComponentMeta<typeof TextField>;

const validationSchema = Yup.object({
  firstName: Yup.string().required("Firstname can't be empty"),
  lastName: Yup.string().required("Lastname can't be empty"),
  description: Yup.string().min(10, 'Must be more than 10'),
});

const Template: ComponentStory<typeof TextField> = () => (
  <Formik
    initialValues={{ firstName: '', lastName: '', description: '' }}
    onSubmit={(values) => console.log(values)}
    validationSchema={validationSchema}
  >
    {({
      handleSubmit,
      handleChange,
      values,
      errors,
      isSubmitting,
      resetForm,
    }) => (
      <>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            errorMessage={errors.firstName}
            label="Name"
            name="firstName"
            onChange={handleChange}
            placeholder="Name"
            value={values.firstName}
          />
          <TextField
            errorMessage={errors.lastName}
            label="Lastname"
            name="lastName"
            onChange={handleChange}
            placeholder="Lastname"
            value={values.lastName}
          />
          <TextField
            textarea
            errorMessage={errors.description}
            label="Description"
            name="description"
            onChange={handleChange}
            placeholder="Enter your description..."
            value={values.description}
          />
          <div style={{ marginTop: '1rem' }}>
            <Button text="Login" type="submit" />
          </div>
        </form>
        {isSubmitting && (
          <>
            <div>VALUES : {JSON.stringify(values)}</div>
            <Button onClick={resetForm} text="Clear" variant="destructive" />
          </>
        )}
      </>
    )}
  </Formik>
);

export const TextFieldInput = Template.bind({});
