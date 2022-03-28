// 是最后一级且id匹配
const tree = [{ id: 1 }, {
    id: 2,
    children: [{
        id: 4,
        children: [{
            id: 5
        }]
    }]
}, { id: 3 }]
//
// const setTree = (tree, id) => {
//     const digui = (tree, id) => {
//         if (!tree || !tree.length) return
//         for (let i = 0; i < tree.length; i++) {
//             if (tree[i].children && tree[i].children.length) {
//                 digui(tree[i].children, id)
//             } else {
//                 if (tree[i].id === id) {
//                     tree[i].p = '接口'
//                 }
//             }
//         }
//     }
//     digui(tree, id)
// }
//
// setTree(tree, 4)
// console.log('newtree', tree)

// 获取匹配项的完整路径
function getParentPath(tree, key) {
    let jihe = []
    const digui = (tree, parentKeys = []) => {
        if (!tree.length) return []
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].id === key) {
                jihe = parentKeys.concat([tree[i].id])
            }
            if (tree[i].children) {
                digui(tree[i].children, parentKeys.concat([tree[i].id]))
            }
        }
    }
    digui(tree)
    return jihe
}

console.log(getParentPath(tree, 3), 'path');
