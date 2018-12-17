# 命令行命令

这是这本书中用到的命令行命令。包括安装和其他的shell命令。你可以试试或者手动运行脚本。


## 第3,4章: issue tracker of react

### 安装nvm

```
https://github.com/creationix/nvm

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

### 安装node
```
nvm install --lts   #安装最新长期支持版

```

### 项目设置
```
npm init
npm [un]install [--save[-dev]] express babel-cli babel-preset-react babel-preset-es2015
```

### Express
```
npm start
```

### Jsx编译
```
node_modules/.bin/babel src --presets react --out-dir static
package.json
...
	"scripts":{
		"compile":"babel src --presets react,es2015 --out-dir static"
		"watch":"babel src --presets react,es2015 --out-dir static --watch"
		"test":"echo \"Error: no test specified\" && exit 1"
	}

...
index.html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.13.0/polyfill.js"></script>

npm run watch
```
