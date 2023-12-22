## 这是关于TS的学习流程

在 Visual Studio Code 中运行 TypeScript 代码需要以下步骤：

1. 安装 Node.js：TypeScript 需要 Node.js 运行环境，你可以从 Node.js 官网下载并安装。
2. 安装 TypeScript：在命令行中运行 `npm install -g typescript` 命令，全局安装 TypeScript。
3. 安装 VS Code 的 TypeScript 插件：在 VS Code 的插件市场中搜索 TypeScript，安装官方的 TypeScript 插件。
4. 创建 tsconfig.json 文件：在你的项目根目录下创建一个 tsconfig.json 文件，这个文件用于配置 TypeScript 编译器。

一个基本的 tsconfig.json 文件内容如下：
```
{

 "compilerOptions": {

  "target": "es5",

  "module": "commonjs",

  "strict": true

 }

}
```

1. 编译 TypeScript：在 VS Code 的终端中运行 `tsc` 命令，编译你的 TypeScript 代码。
2. 运行 JavaScript：使用 Node.js 运行编译后的 JavaScript 代码，例如 `node yourfile.js`。