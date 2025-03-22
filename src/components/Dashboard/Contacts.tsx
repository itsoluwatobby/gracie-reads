import { useState } from "react";
import { Mail, X } from 'lucide-react';

const mockContacts = [
  { id: 1, name: "John Doe", email: "john@example.com", message: "I love your audiobooks! Keep up the great work.", date: "2024-03-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Would you consider adding more sci-fi titles?", date: "2024-03-14" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", message: "The audio quality is exceptional!", date: "2024-03-13" }
];

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function Contacts() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="flex gap-6">
      {/* Contacts List */}
      <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <Mail className="text-sky-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Contact Messages</h2>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {mockContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleContactClick(contact)}
              className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedContact?.id === contact.id ? 'bg-sky-50' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                <span className="text-sm text-gray-500">{contact.date}</span>
              </div>
              <p className="text-sm text-gray-600">{contact.email}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{contact.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Details */}
      {selectedContact && (
        <div className="w-96 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Contact Details</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1 text-gray-800">{selectedContact.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-gray-800">{selectedContact.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="mt-1 text-gray-800">{selectedContact.date}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Message</h3>
                <p className="mt-1 text-gray-600 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}