const Usetraversetree = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.item.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        item: [],
      });
      return tree;
    }

    let latestNode = [];
    latestNode = tree.item.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, item: latestNode };
  };
  //
  //
  const updateNode = function (tree, fileId, editValue) {
    if (tree.id === fileId) {
      tree.name = editValue;
      return tree;
    }
    let latestNode = [];
    latestNode = tree.item.map((ob) => {
      return updateNode(ob, fileId, editValue);
    });

    return { ...tree, item: latestNode };
  };
  //
  //
  const deleteNode = function (tree, fileId) {
    for (let i = 0; i < tree.item.length; i++) {
      if (tree.item[i].id === fileId) {
        tree.item.splice(i, 1);
      }
    }
    let latestNode = [];
    latestNode = tree.item.map((ob) => {
      return deleteNode(ob, fileId);
    });

    return { ...tree, item: latestNode };
  };

  return { insertNode, deleteNode, updateNode };
};

export default Usetraversetree;
