import "./App.css";
import { useState } from "react";
import explorer from "./Data/FolderData";
import Folder from "./Components/Folder";
import Usetraversetree from "./Hooks/Use-traverse-tree";

function App() {
  const [ExplorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode } = Usetraversetree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(ExplorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId) => {
    const DeleteTree = deleteNode(ExplorerData, folderId);
    console.log(DeleteTree)
    setExplorerData(DeleteTree);
  };

  return (
    <div>
      <Folder
        handleDeleteNode={handleDeleteNode}
        ExplorerData={ExplorerData}
        handleInsertNode={handleInsertNode}
      />
    </div>
  );
}

export default App;
