import React from 'react';
import styles from './Contacts.module.css';

const Contacts = ({ contacts, onDeleteContact }) => {
  return (
    <div className={styles.contacts}>
      <ul className={styles.list}>
        {contacts.map(contact => (
          <li key={contact.id} className={styles.item}>
            <div className={styles.data}>
              <p>{contact.name}</p>
              <p>{contact.number}</p>
            </div>

            <div
              className={styles.delete}
              onClick={() => onDeleteContact(contact.id)}
            >
              ✖️
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
