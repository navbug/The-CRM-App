import { useState } from "react";
import { groupOptions } from "../constants";

const GroupSelectionModal = ({ isOpen, onClose, onSave, selectedGroups }) => {
  const [groups, setGroups] = useState(selectedGroups);

  const toggleGroup = (groupName) => {
    if (groups.includes(groupName)) {
      setGroups(groups.filter(g => g !== groupName));
    } else {
      setGroups([...groups, groupName]);
    }
  };

  const handleSave = () => {
    onSave(groups);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Select Groups</h2>
        <div className="space-y-2">
          {groupOptions.map((group) => (
            <div key={group.id} className="flex items-center">
              <input
                type="checkbox"
                id={`group-${group.id}`}
                checked={groups.includes(group.name)}
                onChange={() => toggleGroup(group.name)}
                className="mr-2"
              />
              <label htmlFor={`group-${group.id}`} className={`${group.color} px-2 py-1 rounded-full text-sm`}>
                {group.name}
              </label>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-teal-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default GroupSelectionModal;