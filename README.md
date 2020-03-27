## If you use this application, You can get banned from YoStar. ( Recently YoStar warns not to use third-party app in CN Server.) - 03/27/20


![Image](https://github.com/devflow/frost-nova/blob/master/public/icon.png)

# FrostNOVA
a info helper for Arknights.kr on Windows and MacOS

![Image](https://github.com/devflow/frost-nova/blob/master/gh-images/img1.jpg)

![Image](https://github.com/devflow/frost-nova/blob/master/gh-images/img2.png)

## How to use it
1. Turn on the frostnova proxy server.
2. On your game deivce(also can AppPlayers), setting up proxy(`default: http://127.0.0.1:8080/`) and add certificate with the CA Key(`ca.pem`)
3. start the game. *AND Keep your proxy sever alive for avoiding data corruption.*

## How to install certificate
1. [Android](https://support.google.com/pixelphone/answer/2844832)
2. [iOS1](https://help.clouduss.com/ws-knowledge-base/installing-an-ssl-certificate-on-i-os-13) ,[iOS 2](https://support.apple.com/en-us/HT204477)

## Features

### Recruitment
Quickly see what Operators are available from their pool of five tags(or less tags on recruiting) in Recruitment slots.

### Operators
Manage your operators morale, notificate to you when operator are restored or tired.

### Inventory
You can easily export data to [ark planner](https://penguin-stats.io/planner) from GAME DATA `Yes, frost-nova :)`!

data example :
```
[{"name":"","have":5,"need":0,"id":"2001"},{"name":"","have":8,"need":0,"id":"2002"},{"name":"","have":7,"need":0,"id":"2003"},{"name":"","have":13,"need":0,"id":"2004"},{"name":"","have":1,"need":0,"id":"3003"},{"name":"","have":1,"need":0,"id":"3105"},{"name":"","have":38,"need":0,"id":"3112"}, .... ]
```

Yes. there are includes some useless data. but no problem.
Thanks again [penguin-statistics](https://github.com/penguin-statistics)


## FAQ
### Who is your best waifu in arknights?
- Jessica The CRYING CAT

## Contribute
open a github issue or Just fork repo and send me a request. (`not master branch.`)

## TODO
- [ ] Support Global(EN), JP and CN Server, and other languages.
- [ ] Without desktop, Stand-alone mobile application.
- [ ] report crash

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```

### Lints and fixes files
```
npm run lint
```

## Images and data form
1. [AN-EN-Tags](https://github.com/Aceship/AN-EN-Tags)
2. Hypergryph Network Technology Co. Ltd

## LICENSE
```
MIT License

Copyright (c) 2020 devflow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
