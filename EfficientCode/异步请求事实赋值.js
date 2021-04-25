let arr2 = [[{ id: 1, msg: "" }],
[
  { id: 2, msg: "" },
  { id: 3, msg: "" },
],
[{ id: 4, msg: "" }],
[{ id: 6, msg: "" }],];
function getMsg(obj) {
// 用promise模拟异步，同等你那边的调用接口
return new Promise((resolve) => {
  setTimeout(() => {
    const msg = `${Math.random()}随机`;
    resolve(msg);
  }, Math.random() * 500 + 200);
});
}
function doProgress() {
let i = 0, j = 0;
async function recursion(i, j) {
  arr2[i][j].msg = await getMsg(arr2[i][j]); // 进度条赋值
  console.log(arr2[i][j].msg, "事实变化的arr2.msg", i);
  if (++j < arr2[i].length) {
    recursion(i, j);
  } else {
    if (++i < arr2.length) {
      j = 0;
      recursion(i, j);
    }
  }
}
recursion(i, j);
}
// function doProgress() {
//     const arr = arr2.flat(2);
//     let index = 0;
//     async function recursion(index) {
//         const id = arr[index].id
//         const item = getItemById(id)
//         item.msg = await getMsg(arr[index]) // 进度条赋值
//         console.log(arr2, '事实变化的arr2');
//         if (++index < arr.length) recursion(index)
//     }
//     recursion(index)
// }
// function getItemById(id) {
//   let obj = null;
//   arr2.forEach((arr1) => {
//     arr1.forEach((item) => {
//       if (item.id === id) {
//         obj = item;
//       }
//     });
//   });
//   return obj;
// }

doProgress()
