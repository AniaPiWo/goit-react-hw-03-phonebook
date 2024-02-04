import React, { useState } from 'react';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import styles from './App.module.css';

export const App = () => {
  const [state, setState] = useState({
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filteredContacts: [],
  });

  const handleAddContact = newContact => {
    const isContactExists = state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (!isContactExists) {
      setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
        filteredContacts: [...prevState.filteredContacts, newContact],
      }));
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };

  const handleFilterChange = filter => {
    const filteredContacts = state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    setState(prevState => ({
      ...prevState,
      filteredContacts,
    }));
  };

  const handleDeleteContact = contactId => {
    const updatedContacts = state.contacts.filter(
      contact => contact.id !== contactId
    );
    const updatedFilteredContacts = state.filteredContacts.filter(
      contact => contact.id !== contactId
    );

    setState(prevState => ({
      ...prevState,
      contacts: updatedContacts,
      filteredContacts: updatedFilteredContacts,
    }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Phonebook</h2>
      <Form onAddContact={handleAddContact} />
      <Filter onFilterChange={handleFilterChange} />
      <Contacts
        contacts={
          state.filteredContacts.length
            ? state.filteredContacts
            : state.contacts
        }
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
