const fs = require('fs');
const glob = require('glob');

let main = glob.sync('./index.*.js');

const getRand = (min, max) => {
  let range = max - min + 1;
  return Math.floor(Math.random() * range + min);
}


export const writeFile = (store) => {
  if (main[0] > 1) {
    fs.writeFile(main[0], store, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("编辑成功");
    });
    fs.rename(main[0], `index.${getRand(50000, 60000)}.js`, (err) => {
      if (err) {
        throw err;
      }
      console.log('重命名');
    })
  } else {
    fs.writeFile(`./index.${getRand(50000, 60000)}.js`, "hello world!", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("创建完成");
    });
  }
}
