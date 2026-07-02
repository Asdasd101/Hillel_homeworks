import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Ім\'я має бути не менше 2 символів')
    .required('Це поле є обов\'язковим'),
  email: Yup.string()
    .email('Некоректний формат email')
    .required('Це поле є обов\'язковим'),
  password: Yup.string()
    .min(6, 'Пароль має бути не менше 6 символів')
    .required('Це поле є обов\'язковим'),
});

const SimpleForm = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log('Дані форми відправлено:', values);
    alert('Форму успішно відправлено!');
    resetForm();
  };

  return (
    <div>
      <h2>Реєстрація</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          
          <div>
            <label htmlFor="name">Ім'я:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="span" />
          </div>

          <div>
            <label htmlFor="email">Електронна пошта:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="span" />
          </div>

          <div>
            <label htmlFor="password">Пароль:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="span" />
          </div>

          <button type="submit">Зареєструватися</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SimpleForm;