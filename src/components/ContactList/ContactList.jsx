import css from "./ContactList.module.css";
import { deleteContact } from "../../redux/contactsSlice";
import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);

  const deleteContactById = (id) => {
    dispatch(deleteContact(id));
  };

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={css.list}>
      {visibleContacts.map((contact) => (
        <li key={contact.id} className={css.contact}>
          <Contact contact={contact} deleteContactById={deleteContactById} />
        </li>
      ))}
    </ul>
  );
}
