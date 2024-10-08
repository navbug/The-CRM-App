import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaDownload, FaUpload, FaFileCsv } from "react-icons/fa6";
import { addClient, fetchClients, fetchUsers, updateUser } from "../../api";
import { formatDateWithYear } from "../../utils";
import toast from "react-hot-toast";

const ImportExportClients = () => {
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [importedClients, setImportedClients] = useState([]);
  const fileInputRef = useRef(null);

  const fetchAllClients = useCallback(async () => {
    try {
      const fetchedClients = await fetchClients();
      setClients(fetchedClients);
    } catch (error) {
      toast.error("Failed to fetch clients");
    }
  }, []);

  const getAllUsers = useCallback(async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  }, []);

  const distributeImportedClients = useCallback(async () => {
    const assignableUsers = users.filter((user) => user.assignLeads);
    if (assignableUsers.length === 0) {
      toast.error("No assignable users found");
      return;
    }

    const updatedClients = importedClients.map((client, index) => ({
      ...client,
      user: assignableUsers[index % assignableUsers.length]._id,
    }));

    const addClientAndUpdateUser = async (clientInfo) => {
      const { user: userId, ...clientData } = clientInfo;
      await addClient(clientData);
      const mappedUser = assignableUsers.find((user) => user._id === userId);
      const modifiedUser = {
        ...mappedUser,
        lastLeadReceived: formatDateWithYear(new Date()),
      };
      await updateUser(modifiedUser._id, modifiedUser);
    };

    const results = await Promise.allSettled(
      updatedClients.map((clientInfo) => addClientAndUpdateUser(clientInfo))
    );

    const successfulAdds = results.filter((result) => result.status === "fulfilled");
    const failedAdds = results.filter((result) => result.status === "rejected");

    if (successfulAdds.length > 0) {
      toast.success(`Successfully added ${successfulAdds.length} clients`);
    }
    if (failedAdds.length > 0) {
      toast.error(`Failed to add ${failedAdds.length} clients`);
    }

    fetchAllClients();
  }, [importedClients, users, fetchAllClients]);

  useEffect(() => {
    if (importedClients.length > 0) {
      distributeImportedClients();
    }
  }, [importedClients, distributeImportedClients]);

  useEffect(() => {
    fetchAllClients();
    getAllUsers();
  }, [fetchAllClients, getAllUsers]);

  const convertToCSV = useCallback((clients) => {
    const headers = [
      "Client Name", "Display Name", "Date Added", "Contacted", "Phone Number",
      "Whatsapp Number", "Groups", "Email", "Notes", "Last Activity", "User"
    ];

    const rows = clients.map((client) => [
      client.clientName,
      client.displayName,
      client.dateAdded,
      client.contacted,
      client.phoneNumber,
      client.whatsappNumber,
      client.groups.join(";"),
      client.email,
      client.notes,
      client.lastActivity,
      client.user,
    ]);

    const escapeCsvValue = (value) => 
      value == null ? "" : `"${value.toString().replace(/"/g, '""')}"`;

    return [
      headers.join(","),
      ...rows.map((row) => row.map(escapeCsvValue).join(","))
    ].join("\n");
  }, []);

  const handleCSVDownload = useCallback(() => {
    const csvContent = convertToCSV(clients);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "clients.csv";
    link.click();
    URL.revokeObjectURL(url);
  }, [clients, convertToCSV]);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target.result;
        const importedClients = parseCSV(csv);
        setImportedClients(importedClients);
      };
      reader.readAsText(file);
    }
  }, []);

  const parseCSV = useCallback((csv) => {
    const lines = csv.split(/\r\n|\n/);
    const headers = parseCSVLine(lines[0]).map((header) =>
      header.trim().toLowerCase()
    );

    return lines.slice(1).map((line) => {
      const values = parseCSVLine(line);
      return headers.reduce((client, header, index) => {
        const camelCaseKey = toCamelCase(header);
        if (camelCaseKey === "groups") {
          client[camelCaseKey] = values[index] ? values[index].split(";") : [];
        } else if (camelCaseKey === "contacted") {
          client[camelCaseKey] = values[index].toLowerCase() === "true";
        } else {
          client[camelCaseKey] = values[index];
        }
        return client;
      }, {});
    });
  }, []);

  const parseCSVLine = useCallback((line) => {
    const result = [];
    let startValueIndex = 0;
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
      } else if (line[i] === "," && !inQuotes) {
        result.push(
          line
            .slice(startValueIndex, i)
            .trim()
            .replace(/^"|"$/g, "")
            .replace(/""/g, '"')
        );
        startValueIndex = i + 1;
      }
    }

    result.push(
      line
        .slice(startValueIndex)
        .trim()
        .replace(/^"|"$/g, "")
        .replace(/""/g, '"')
    );
    return result;
  }, []);

  const toCamelCase = useCallback((str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }, []);

  const handleImport = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex items-center mb-4">
            <FaFileCsv className="w-10 h-10 mr-4 text-gray-500" />
            <h3 className="text-xl font-semibold">Export Client List</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Download list of clients in CSV format.
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleCSVDownload}
              className="text-blue-600 font-semibold hover:underline flex items-center gap-2"
              disabled={clients.length === 0}
            >
              <FaDownload /> Download
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex items-center mb-4">
            <FaFileCsv className="w-10 h-10 mr-4 text-gray-500" />
            <h3 className="text-xl font-semibold">Import Client List</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Import list of clients from a CSV file.
          </p>
          <div className="flex justify-end">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv"
              className="hidden"
            />
            <button
              onClick={handleImport}
              className="text-blue-600 font-semibold hover:underline flex items-center gap-2"
            >
              <FaUpload /> Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExportClients;