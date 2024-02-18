import { useState, useEffect } from 'react';
import { ContactList } from './components/ContactList/ContactList';
import {ContactForm} from './components/Form/ContactForm';
import { SearchBox } from './components/SearchBox/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from './redux/contacsSlice';
import { deleteContact } from './redux/contacsSlice';  

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts)
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContactOld = (newContact) => {
    dispatch(addContact(newContact))
  };

  const deleteContactOld = (contactId) => {
    dispatch(deleteContact(contactId))
  }

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContactOld} />
      <SearchBox value={filter} onChange={changeFilter} />
      <ContactList contacts={getVisibleContacts()} onDeleteContact={deleteContactOld} />
    </div>
  );
}

export default App;
