// 计算差值 同步 选择列表项 数据
const supplying = (arr1, arr2) => {
    let t = []
    if (arr2.length > arr1.length) {
        t = arr2
        arr2 = arr1
        arr1 = t
    }
    // 计算2个数组的差集
    const diff = (arr1, arr2) => {
        const temp = []
        for (let i = 0; i < arr1.length; i++) {
            const item1 = arr1[i]
            let isExist = true
            for (let j = 0; j < arr2.length; j++) {
                const item2 = arr2[j]
                if (item1.label === item2.label) {
                    isExist = false
                    break
                }
            }
            if (isExist) {
                console.log(item1, '差值')
                temp.push(item1)
            }
        }
        return temp
    }

    const d = diff(arr1, arr2)
    if (t.length) {
        // 选择项列表 做批量删除
        const delItem = (ret, cur) => {
            ret.splice(ret.findIndex(r => r.label === cur.label), 1)
            return ret
        }
        return d.reduce((ret, cur) => {
            return delItem(ret, cur)
        }, [...arr1]) // 注意： 此时arr1已经是选择项列表,因为 t 有值
    } else {
        // 选择项列表 做批量新增
        return [...arr2, ...d]
    }
}
