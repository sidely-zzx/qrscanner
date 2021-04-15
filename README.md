# qrscanner
qrsacnner是一个用web commponent写的二维码扫面组件，可以在原生，vue，react，svelte等框架上面使用的二维码识别扫描组件。
本组件使用mediaDevices.getUserMedia API获取摄像头，所以只能在https网站上运行，无法在http网站上运行，优先使用后置摄像头，如果需要在本地调试可以在loacalhost或者127.0.0.1上调试。二维码解码代码较大（300k），建议使用模块分包加载的方式构建您的程序。
***
demo: https://sidely-zzx.github.io/qrscanner-example/
***
首先需要安装
```
npm i component-qrscanner
```
## 使用函数创建qrscanner
#### 使用构造函数创建简单的二维码扫描器，这个不能灵活的修改样式和添加属性和方法。但是写法简单，对于简单需求可以使用构造函数创建qrscanner，会自动创建一个全屏的二维码扫描组件。

```
import CreateQRScanner from  'component-qrscanner';
const fn = function (e) {
  if (e.text){
    alert('text:' + e.text)
  } else {
    alert('error:' + e.error)
  }
}
//  创建后自动开启摄像头
cosnt scanner = new CreateQRScanner(fn);
```
构造函数CreateQRScanner接受一个回调函数作为参数，这个回调函数有一个参数。如果解码成功该参数上有一个属性text，如果解码失败则会带一个属性error里面包含错误信息
***
对象上的一些方法
```
cosnt scanner = new CreateQRScanner(fn);

//  开启摄像头
scanner.start()
//  显示qrsacnner并开启摄像头
sacnner.show()
//  隐藏qrscanner并关闭摄像头
scanner.hidder()
//  关闭摄像头
scanner.stop()
```
***
## 使用组件的方式创建qrscanner
#### 使用组件的方式更灵活，更加方便自定义样式和属性。强烈建议使用组件的方式创建qrscanner
#### 使用方式
```
html
<body>
    <qr-scanner style="width: 100%;height: 50%;position: relative;" >
        <div>this is a slot text,and this is create by web component</div>
    </qr-scanner>
</body>
<script src="./qrsanner.js" type="module">
```
```
qrsanner.js
import  'component-qrscanner';
const scanner = document.querySelector('qr-scanner');
//  可能组件还没有创建完毕所以用whenDefined
customElements.whenDefined('qr-scanner')
  .then(() => void scanner.scannerStart());
scanner.addEventListener('qrscan',e => {
  const str = e.detail.text ? 'text is :' + e.detail.text : 'error:' + e.detail.error.messsage;
  alert(str);
}, false)
```
在您的js文件中导入qrscanner就可以创建名称为`<qr-sanner></qr-sanner>`的组件了；
***
### 事件
组件上的事件,您可以像监听click事件一样监听这些事件：
1. qrsacn: 成功扫描并解析成一个字符串时间detail里面有text属性，或者捕获到错误里面事件属性中有error,error.message中有错误的描述；
2. stop: 点击了左上角的x按钮，并且会关闭摄像头停止扫描二维码
### 属性
style: 创建的时候传入style属性可以设置最组件整体的大小和布局，默认布局为fixed，宽度为100vw,高度为100vh。
### 方法
```
const scanner = document.querySelector('qr-scanner');
scanner.sacnnerStart();
scanner.stop();
```
1. sacnnerStart(): 该方法会开启摄像头并捕获二维码，创建组件默认是不会开启摄像头的，所以需要调用该方法开启摄像头

2. stop(): 该方法会关闭摄像头，并发出stop事件
### slot
qrscanner预留有一个默认的slot，可以插入自定义元素
```
 <qr-scanner>
    <div>this is a slot text</div>
 </qr-scanner>
```
***
### vue中的使用
在vue中使用web component 组件qrscanner,完整示例
```
//  in app.js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);
app.config.isCustomElement = tag => tag === 'qr-scanner';

//  in Scanner.vue
<template>
  <qr-scanner 
    ref="scanner"
    style="position:relative;"
    @qrscan="onScan"
    @stop="onClose"
  />
</template>
<script>
import { onMounted, ref } from 'vue';
import 'component-qrscanner';
export default {
  name:'Scanner',
  setup() {
    const scanner = ref(null)
    const onClose = e => {
      console.log('close', e)
    }
    const onScan = (e) => {
      const str = e.detail.text ? 'text is :' + e.detail.text : 'error:' + e.detail.error;
      alert(str);
    }
    onMounted(() => {
      scanner.value.shadowRoot.querySelector('.outer').style.cssText = 'top: 46px;';
      scanner.value.scannerStart();
    })
    return {
      onScan,
      onClose,  
      scanner
    }
  }
}
</script>
```
***
### 在 React 中使用 
```
import 'react';
import 'component-qrscanner';
function Scanner() {
  return (
    <qr-scanner>
    </qr-scanner>
  );
}
```
