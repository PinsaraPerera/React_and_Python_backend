import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
    console.log(data.contacts);
  };

  const closeModel = () => {
    setIsModelOpen(false);
    setCurrentContact({});
  };

  const openCreateModel = () => {
    if (!isModelOpen) setIsModelOpen(true);
  };

  const openEditModal = (contact) => {
    if(isModelOpen) return
    setCurrentContact(contact);
    setIsModelOpen(true);
  };

  const onUpdate = () => {
    closeModel();
    fetchContacts();
  }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModel} className="btn-2">Create New Contact</button>
      {isModelOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModel}>
              &times;
            </span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
