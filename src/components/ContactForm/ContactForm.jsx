import { Formik, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.info}>
            <label htmlFor="name"> Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="span" className={css.error} />

            <label htmlFor="number">Number</label>
            <Field type="tel" name="number" />
            <ErrorMessage
              name="number"
              component="span"
              className={css.error}
            />
          </div>

          <button className={css.add_button} type="submit">
            Add contact
          </button>
        </form>
      )}
    </Formik>
  );
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters")
    .required("Name is required"),
  number: Yup.string()
    .min(3, "Number must be at least 3 characters")
    .max(20, "Number must be at most 20 characters")
    .required("Number is required"),
});
