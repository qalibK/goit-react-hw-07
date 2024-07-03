import { IoPerson, IoCall } from "react-icons/io5";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <>
      <div className={css.left}>
        <div className={css.info}>
          <IoPerson />
          <p>{contact.name}</p>
        </div>
        <div className={css.info}>
          <IoCall />
          <p>{contact.number}</p>
        </div>
      </div>
      <button type="button" onClick={handleDelete} className={css.btn}>
        Delete
      </button>
    </>
  );
}
