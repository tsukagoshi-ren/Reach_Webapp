# Reach社WorkShopで使用するSNS

## フロント
- HTML
- CSS
- JavaScript

## バック
- JAVA
  - Maven
  - SpringBoot

## DB
- PostgreSQL

---

```plaintext
─workshop-webapp
    ├─.settings
    ├─src
    │  └─main
    │     ├─java
    │     │  └─com
    │     │      └─reach
    │     │          ├─login
    │     │          ├─main
    │     │          ├─shared
    │     │          │  ├─config
    │     │          │  ├─models
    │     │          │  ├─repositories
    │     │          │  └─utils
    │     │          └─userRegister
    │     ├─resources
    │     └─webapp // フロント側のソースを画面ごとに分割
    │         ├─images
    │         ├─login
    │         │  ├─css
    │         │  ├─html
    │         │  └─js
    │         ├─main
    │         │  ├─css
    │         │  ├─html
    │         │  └─js
    │         └─userRegister
    │             ├─css
    │             ├─html
    │             └─js
    └─target
        ├─classes
        │  └─com
        │      └─reach
        │          ├─login
        │          ├─main
        │          ├─shared
        │          │  ├─models
        │          │  ├─repositories
        │          │  └─utils
        │          └─userRegister
        ├─generated-sources
        │  └─annotations
        ├─generated-test-sources
        │  └─test-annotations
        ├─maven-archiver
        ├─maven-status
        │  └─maven-compiler-plugin
        │      ├─compile
        │      │  └─default-compile
        │      └─testCompile
        │          └─default-testCompile
        └─test-classes
