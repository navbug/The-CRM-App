import React from "react";
import ClientNotesModal from "./ClientNotesModal";
import QuickResponseModal from "./QuickResponseModal";
import AddActivityModal from "./AddActivityModal";
import AddEditClientModal from "./AddEditClientModel";
import GroupSelectionModal from "./GroupSelectionModal";

const ClientModals = ({ modalStates, toggleModal, clientInfo, onUpdateClient, onAddActivity }) => {
  return (
    <>
      <ClientNotesModal
        isOpen={modalStates.notes}
        onClose={() => toggleModal("notes")}
        onSave={(notes) => onUpdateClient({ notes })}
        initialNotes={clientInfo?.notes}
      />

      <AddEditClientModal
        isOpen={modalStates.edit}
        onClose={() => toggleModal("edit")}
        editClient={onUpdateClient}
        clientToEdit={clientInfo}
      />

      <QuickResponseModal
        isOpen={modalStates.response}
        onClose={() => toggleModal("response")}
        clientInfo={clientInfo}
      />

      <AddActivityModal
        isOpen={modalStates.activity}
        onClose={() => toggleModal("activity")}
        onAdd={onAddActivity}
        clientName={clientInfo?.clientName}
      />

      <GroupSelectionModal
        isOpen={modalStates.group}
        onClose={() => toggleModal("group")}
        onSave={(groups) => onUpdateClient({ groups })}
        selectedGroups={clientInfo?.groups || []}
      />
    </>
  );
};

export default ClientModals;