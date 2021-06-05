

## 博客
- [Frida调试环境搭建](https://bbs.pediy.com/thread-265783.htm)
```sh
npm init -y
tsc --init
# 修改tsconfig.json
# "outDir": "./dist",
# "rootDir": "./src",
```
- [FRIDA 使用经验交流分享](https://bbs.pediy.com/thread-265160.htm)

## frida脚本工具
- [FridaContainer](https://github.com/deathmemory/FridaContainer)


## passionfruit 界面工具
node 版本为 12.x
```sh
brew install node@12
# 如果有其它版本
brew link node@12
node -v
```
下代码运行
```sh
git clone https://github.com/chaitin/passionfruit.git
npm install
npm run dev
```

直接安装运行 推荐
```sh
npm install -g passionfruit
passionfruit
```