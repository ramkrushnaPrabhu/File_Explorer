import React, { useState } from "react";

import Usetraversetree from "../Hooks/Use-traverse-tree";

const Folder = ({ ExplorerData, handleInsertNode, handleDeleteNode }) => {
  const { updateNode } = Usetraversetree();
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const [showInputEdit, setShowInputEdit] = useState({
    visible: false,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleEditFolder = (e) => {
    e.stopPropagation();
    setExpand(true);
    setShowInputEdit({
      visible: true,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(ExplorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onEditFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      updateNode(ExplorerData, ExplorerData.id, e.target.value);
      setShowInputEdit({ ...showInputEdit, visible: false });
    }
  };

  const OnDelete = (e) => {
    e.stopPropagation();
    handleDeleteNode(ExplorerData.id);
  };

  if (ExplorerData.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁{ExplorerData.name}</span>
          <div className="operation__Icons">
            <i
              class="fa-solid fa-folder-plus"
              onClick={(e) => handleNewFolder(e, true)}
            ></i>
            <i
              class="fa-solid fa-file-circle-plus"
              onClick={(e) => handleNewFolder(e, false)}
            ></i>
            <i
              class="fa-regular fa-pen-to-square"
              onClick={(e) => handleEditFolder(e)}
            ></i>
          

            {ExplorerData.id === "1" ? (
              ""
            ) : (
              <i class="fa-solid fa-trash" onClick={OnDelete}></i>
            )}
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type={"text"}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="inputContainer_input"
                autoFocus
                onKeyDown={onAddFolder}
              />
            </div>
          )}
          {showInputEdit.visible && (
            <div className="inputContainer">
              <input
                type={"text"}
                onBlur={() =>
                  setShowInputEdit({ ...showInputEdit, visible: false })
                }
                className="inputContainer_input"
                autoFocus
                onKeyDown={onEditFolder}
                defaultValue={ExplorerData.name}
                onChange={(e) => e.target.value}
              />
            </div>
          )}

          {ExplorerData.item.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                ExplorerData={exp}
                key={exp.id}
                handleDeleteNode={handleDeleteNode}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="fileM">
          <span className="file">📄{ExplorerData.name}</span>
          <div className="operation__Icons--file">
            <i
              class="fa-regular fa-pen-to-square"
              onClick={(e) => handleEditFolder(e)}
            ></i>
            <i class="fa-solid fa-trash" onClick={OnDelete}></i>
            {/* <button onClick={(e) => handleEditFolder(e)}>Edit</button>
            <button onClick={OnDelete}>Delete</button> */}
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInputEdit.visible && (
            <div className="inputContainer">
              <input
                type={"text"}
                onBlur={() =>
                  setShowInputEdit({ ...showInputEdit, visible: false })
                }
                className="inputContainer_input"
                autoFocus
                onKeyDown={onEditFolder}
                defaultValue={ExplorerData.name}
                onChange={(e) => e.target.value}
              />
            </div>
          )}
        </div>
      </>
    );
  }
};

export default Folder;
