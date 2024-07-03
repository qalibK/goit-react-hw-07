import { IoPerson, IoCall } from "react-icons/io5";
import css from "./Contact.module.css";

export default function Contact({ contact, deleteContactById }) {
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
      <button
        type="button"
        onClick={() => deleteContactById(contact.id)}
        className={css.btn}
      >
        Delete
      </button>
    </>
  );
}
