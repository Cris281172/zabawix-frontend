const buildCategoryTree = (categories) => {
    let map = {}, node, roots = [], i;

    for (i = 0; i < categories.length; i += 1) {
        map[categories[i]._id] = i;
        categories[i].subcategories = [];
    }

    for (i = 0; i < categories.length; i += 1) {
        node = categories[i];
        if (node.parentID !== '0' && map[node.parentID] !== undefined) {
            categories[map[node.parentID]].subcategories.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
}

export default buildCategoryTree;