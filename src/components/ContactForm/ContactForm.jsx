import { Formik, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

export default function ContactForm() {
  const contacts = useSelector((state) => state.contacts.items);
  const dispatch = useDispatch();

  const checkingUniqueNames = (name) => {
    return contacts.some((contact) => contact.name === name);
  };

  const setAddContact = (name, number) => {
    if (checkingUniqueNames(name)) {
      alert(`${name} is already in contacts`);
      return;
    } else {
      const newContact = {
        name,
        number,
        id: crypto.randomUUID(),
      };

      dispatch(addContact(newContact));
    }
  };

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

  const handleSubmit = (values, actions) => {
    setAddContact(values.name, values.number);
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
