# zawoke.ts

[Invite Link](https://discord.com/api/oauth2/authorize?client_id=887331924434104411&permissions=8&scope=applications.commands%2bot)

[![Open Source](https://img.shields.io/badge/open%20source-%E2%9D%A4-%23f44663.svg?style=flat-square)](https://opensource.org/)
[![License](https://img.shields.io/badge/license-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)


[Protondb-data](https://github.com/bdefore/protondb-data) is added to as a submodule, because the files needed are from there.

Copy the currently newest one out into the root directory of the Discord bot.
Untar the file and move the file within to proton.json.

```sh
cp protondb-data/reports/reports_<date>_<year>.tar.gz
tar xzf reports*.tar.gz
mv reports_piiremoved.json proton.json
```
