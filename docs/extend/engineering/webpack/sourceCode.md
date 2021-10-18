<!--
 * @Descripttion: 
 * @version: 
 * @Author: shenjia
 * @Date: 2021-09-01 17:45:41
 * @LastEditors: shenjia
 * @LastEditTime: 2021-09-04 21:30:12
-->


# webpack4.X 打包原理

## 编译流程
   1. 初始化参数
   2. 开始编译
   3. 确定入口
   4. 编译模块
   5. 完成模块编译
   6. 输出资源
   7. 完成输出


## Tapable
它控制钩子函数的发布与订阅，是 wbepack 插件系统的大管家。

所涵盖的钩子函数如下：
```
const {
    SyncHook,                   // 同步钩子
    SyncBailHook,               // 同步熔断钩子
    SyncWaterfallHook,          // 同步流水钩子
    SyncLoopHook,               // 同步循环钩子
    AsyncParalleHook,           // 异步并发钩子
    AsyncParallelBailHook,      // 异步并发熔断钩子
    AsyncSeriesHook,            // 异步串行钩子
    AsyncSeriesBailHook,        // 异步串行熔断钩子
    AsyncSeriesWaterfallHook     // 异步串行流水钩子
} = require("tapable");
```

Tabpack 提供了同步&异步绑定钩子的方法，方法如下所示：
|---|---|
| Async(异步) | Sync(同步) |
| 绑定：tapAsync/tapPromise/tap | 绑定：tap |
| 执行：callAsync/promise | 执行：call |



## 初始化启动之Webpack的入口文件

查看入口文件：node_modules/webpack/bin/webpack.js ，(按键command+k+0)可以看到这个文件的代码结构，如下所示：
```
// 正常执行返回
process.exitCode = 0;    
// 运行某个命令                               
const runCommand = (command, args) => {...}
// 判断某个包是否安装
const isInstalled = packageName => {...}
// webpack可用的CLI：webpacl-cli和webpack-command
const CLIs = {...}
// 判断是否两个CLI是否安装了
const installedClis = CLIs.filter(cli=>cli.installed);
// 根据安装数量进行处理
if (installedClis.length === 0) {...} else if 
 (installedClis.length === 1) {...} else {...}

```

## webpack-cli
（? 项目中使用的是webpack4.19，但未存在webpack-cli）

工作内容：
- 引入 yargs ，对命令进行定制
  ```
   // node_modules/webpack-cli/bin/config/config-yargs.js
   const {
      CONFIG_GROUP,
      BASIC_GROUP,
      MODULE_GROUP,
      OUTPUT_GROUP,
      ADVANCED_GROUP,
      RESOLVE_GROUP,
      OPTIMIZE_GROUP,
      DISPLAY_GROUP
   } = GROUPS;
  ```

- 分析命令行参数，对各个参数进行转换，组成编译配置项
  ```
   // node_modules/webpack-cli/bin/untils/constants.js
   const NON_COMPILATION_ARGS = [
      "init",                 // 创建一份webpack配置文件
      "migrate",              // 进行webpack版本迁移
      "add",                  // 往webpack配置文件中增加属性
      "remove",               // 往webpack配置文件中删除属性
      "serve",                // 运行webpack-serve
      "generate-loader",      // 生成webpack loader代码
      "generate-plugin",      // 生成webpack plugin代码
      "info"                  // 返回与本地环境相关的一些信息
   ];
  ```
  ```
   // node_modules/webpack-cli/bin/cli.js
   const {NON_COMPILATION_ARGS} = require("./utils/constants");
   const NON_COMPILATION_CMD = process.argv.find(arg => {
      if (arg === "serve") {
         global.process.argv = global.process.argv.filter(a => a !== "serve");
         process.argv = global.process.argv;
      }
      return NON_COMPILATION_ARGS.find(a => a === arg);
   });
   if (NON_COMPILATION_CMD) {
      return require("./utils/prompt-command")(NON_COMPILATION_CMD,...process.argv);
   }
  ```

- 引入 webpack ，根据配置进行编译和构建
   ```
   // node_modules/webpack/lib/webpack.js
   const webpack = (options, callback) => {
      ...
      options = new WebpackOptionsDefaulter().process(options);
      compiler = new Compiler(options.context);
      new NodeEnvironmentPlugin().apply(compiler);
      ...
      compiler.options = new WebpackOptionsApply().process(options, compiler);
      ...
      webpack.WebpackOptionsDefaulter = WebpackOptionsDefaulter;
      webpack.WebpackOptionsApply = WebpackOptionsApply;
      ...
      webpack.NodeEnvironmentPlugin = NodeEnvironmentPlugin;
   }
   ```
   - WebpackOptionsDefaulter包含了一些默认的Options
     (node_modules/webpack/lib/WebpackOptionsDefaulter.js)
   
   - NodeEnvironmentPlugin
   通过监听 beforeRun 钩子，实现清除缓存的作用
   ```
   // node_modules/webpack/lib/node/NodeEnvironmentPlugin.js
   class NodeEnvironmentPlugin {
      apply(compiler) {
            ...		
            compiler.hooks.beforeRun.tap("NodeEnvironmentPlugin", compiler => {
         if (compiler.inputFileSystem === inputFileSystem) inputFileSystem.purge();
            });
      }
   }
   ```

   - WebpackOptionsApply
   将所有的配置 options 转换成webpack内部插件
   ```
   // node_modules/webpack/lib/WebpackOptionsApply.js
   new EntryOptionPlugin().apply(compiler);
   compiler.hooks.entryOption.call(options.context, options.entry);
   ```
   插件最后都会变成 compiler 对象上的实例。

   - EntryOptionPlugin
   ```
   // node_modules/webpack/lib/EntryOptionPlugin.js
   module.exports = class EntryOptionPlugin {
      apply(compiler) {
         compiler.hooks.entryOption.tap("EntryOptionPlugin", (context, entry) => {
         if (typeof entry === "string" || Array.isArray(entry)) {
            itemToPlugin(context, entry, "main").apply(compiler);
         } else if (typeof entry === "object") {
            for (const name of Object.keys(entry)) {
            itemToPlugin(context, entry[name], name).apply(compiler);
            }
         } else if (typeof entry === "function") {
            new DynamicEntryPlugin(context, entry).apply(compiler);
         }
         return true;
      });
      }
   };
   ```

   实例化compiler后，根据options的watch判断是否启动了watch，若启动了watch则调用compiler.watch来监控构建文件。
   ```
   if (options.watch === true || (Array.isArray(options) && options.some(o => o.watch))) {
      const watchOptions = Array.isArray(options)
         ? options.map(o => o.watchOptions || {})
         : options.watchOptions || {};
         return compiler.watch(watchOptions, callback);
   }
   compiler.run(callback);
   ```



## 编译构造

## compile
先实例化 NormalModuleFactory 和 ContextModuleFactory 。然后进入到run方法。
```
// node_modules/webpack/lib/Compiler.js
run(callback) { 
   ...
   // beforeRun 如上文NodeEnvironmentPlugin插件清除缓存
   this.hooks.beforeRun.callAsync(this, err => {
      if (err) return finalCallback(err);
      // 执行run Hook开始编译
      this.hooks.run.callAsync(this, err => {
         if (err) return finalCallback(err);
         this.readRecords(err => {
            if (err) return finalCallback(err);
            // 执行compile
            this.compile(onCompiled);
         });
      });
   });
}
```

beforeCompile - compile - afterCompile
```
compile(callback) {
   const params = this.newCompilationParams();
   this.hooks.beforeCompile.callAsync(params, err => {
      if (err) return callback(err);

      // 进入 compile 阶段
      this.hooks.compile.call(params);

      const compilation = this.newCompilation(params);

      // 进入 make 阶段
      this.hooks.make.callAsync(compilation, err => {
         if (err) return callback(err);

         compilation.finish();

         // 进入 seal 阶段
         compilation.seal(err => {
            if (err) return callback(err);

            this.hooks.afterCompile.callAsync(compilation, err => {
               if (err) return callback(err);

               return callback(null, compilation);
            });
         });
      });
   });
}
```

## make
主要是为了把模块添加到依赖列表中，同时进行模块构建。

```
// node_modules/webpack/lib/SingleEntryPlugin.js
compiler.hooks.make.tapAsync(
    "SingleEntryPlugin",
    (compilation, callback) => {
	const { entry, name, context } = this;
	cosnt dep = SingleEntryPlugin.createDependency(entry, name);
	// addEntry是make构建阶段开始标志 
	compilation.addEntry(context, dep, name, callback);
    }
)

// node_modules/webpack/lib/Compilation.js
// addEntry -> addModuleChain
_addModuleChain(context, dependency, onModule, callback) {
   ...
   this.buildModule(module, false, null, null, err => {
      ...
   })
   ...
}
```

模块构建完成后，会触发 finishModules 。
```
// node_modules/webpack/lib/Compilation.js
finish() {
   const modules = this.modules;
   this.hooks.finishModules.call(modules);

   for (let index = 0; index < modules.length; index++) {
      const module = modules[index];
      this.reportDependencyErrorsAndWarnings(module, [module]);
   }
}
```

## Module

compilation构建流程：
- 使用 loader-runner 运行 loaders
- Loader 转换完成后，使用 acorn 解析生成 AST
- 使用 ParsePlugins 添加依赖

### loader-runner
doBuild 根据传入的资源路径和插件资源来调用 loader-runner 插件的runLoaders 加载和执行 loader 。
```
// node_modules/webpack/lib/NormalModule.js
doBuild(options, compilation, resolver, fs, callback) {
   const loaderContext = this.createLoaderContext(
      resolver,
      options,
      compilation,
      fs
   );

   runLoaders(
      {
         resource: this.resource,
         loaders: this.loaders,
         context: loaderContext,
         readResource: fs.readFile.bind(fs)
      },
      (err, result) => {
         ...
      }
   );
}
```

### acorn 
根据 acorn 解析转换后的内容，输出对应的抽象语法树。

```
// node_modules/webpack/lib/Compilation.js
this.hooks.buildModule.call(module);
...
if (error) {
    this.hooks.failedModule.call(module, error);
    return callback(error);
}
this.hooks.succeedModule.call(module);
return callback();
```
若成功则触发 succeedModule ， 若失败则触发 failedModule 。
最终将上述阶段生成的产物存放到Compilation.js的this.modules = [];上。
### Chunk生成算法
首先将entry中的module都生成一个新的chunk；
遍历module的依赖列表，将依赖项也加入至chunk；
如果是动态引入的module模块，则根据这个module创建一个新的chunk，继续遍历依赖项；
不断重复以上操作，直到得到所有的chunk。

### seal

### emit

# webpack热更新原理


[webpack源码](https://zhuanlan.zhihu.com/p/363928061)
[「搞点硬货」从源码窥探Webpack4.x原理](https://juejin.cn/post/6844904046294204429)
- 学会透过现象看本质
- 学会调试源码
- 区分webpack4.X与webpack5.X的区别是什么？
- 培养自己的实际解决问题的能力
- 学会自己去探索源码的世界