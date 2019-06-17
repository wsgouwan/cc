### Vaiee账号系统
---
**1\. 用户注册**
###### 接口功能
> 通过手机号注册

###### 请求方式与地址
> POST -> [account/signup.do?chan=test&dev=macos&mac=a0:99:9b:08:ca:db](account/signup.do?chan=test&dev=macos&mac=a0:99:9b:08:ca:db)

###### 参数格式
> JSON

###### 请求header
> 无

###### 请求参数(JSON)
|参数|必选|类型|说明|
|:-----|:-----|:-----|:-----|
|username|true|string|用户手机号|
|password|true|string|8-16位至少包含一个英文或特殊字符串密码|
|client|true|string|登录的端(pc/web)|
|captcha|true|string|短信验证码|

###### 请求参数(GET)
|参数|必选|类型|说明|
|:-----|:-----|:-----|:-----|
|chan|true|string|渠道|
|dev|true|string|设备号|
|mac|true|string|MAC地址|

###### 应答header
|返回字段|字段说明|
|:-----|:-----|
|json-web-token|身份令牌|

###### 应答字段
|返回字段|字段类型|字段说明|
|:-----|:-----|:-----|
|interim|string|临时密码|
|uuid|string|用户ID|

###### 应答示例
>
```javascript
{
    "code": 200,
    "data": {
        "interim": "df549e684f512349313c988d861d522f",
        "uuid": "e95e9d36-1ef1-495c-9195-42cff110689a"
    },
    "info": "恭喜您已注册成功"
}
```

**2\. 用户登录**
###### 接口功能
> 通过账号与密码换取身份令牌(json-web-token)/用户ID(uuid)/临时密码(interim)

###### 请求方式与地址
> POST -> [account/signin.do?chan=test&dev=macos&mac=a0:99:9b:08:ca:db](account/signin.do?chan=test&dev=macos&mac=a0:99:9b:08:ca:db)

###### 参数格式
> JSON

###### 请求header
> 无

###### 请求参数(JSON)
|参数|必选|类型|说明|
|:-----|:-----|:-----|:-----|
|username|true|string|用户手机号|
|password|true|string|8-16位至少包含一个英文或特殊字符串密码|
|client|true|string|登录的端(pc/web)|
|captcha|false|string|验证码(短时间内多次登录错误触发)|

###### 请求参数(GET)
|参数|必选|类型|说明|
|:-----|:-----|:-----|:-----|
|chan|true|string|渠道|
|dev|true|string|设备号|
|mac|true|string|MAC地址|

###### 应答header
|返回字段|字段说明|
|:-----|:-----|
|json-web-token|身份令牌|

###### 应答字段
|返回字段|字段类型|字段说明|
|:-----|:-----|:-----|
|interim|string|临时密码|
|uuid|string|用户ID|
|suspicious|int|可疑操作 0-正常 1-异常,此时需要短信验证码|

###### 应答示例
>
```javascript
{
    "code": 200,
    "data": {
        "interim": "a9aa58b0dc402c8f20f1cdfeeaa3c26c",
        "uuid": "41adfb1b-5d38-49ea-b43c-2faa074464df",
        "suspicious": 0
    },
    "info": "恭喜您已登录成功"
}
```

**3\. 用户登录(快捷方式)**
###### 接口功能
> 通过账号与短信验证码换取身份令牌(json-web-token)/用户ID(uuid)/临时密码(interim)

> **注: 5分钟内最多尝试3次**

###### 请求方式与地址
> POST -> [account/shortcut.do?chan=test&dev=macos&mac=a0:99:9b:08:ca:db](account/shortcut.do?chan=test&dev=macos&mac=a0:99:9b:08:ca:db)

###### 参数格式
> JSON

###### 请求header
> 无

###### 请求参数(JSON)
|参数|必选|类型|说明|
|:-----|:-----|:-----|:-----|
|username|true|string|用户手机号|
|client|true|string|登录的端(pc/web)|
|captcha|false|string|短信验证码|

###### 请求参数(GET)
|参数|必选|类型|说明|
|:-----|:-----|:-----|:-----|
|chan|true|string|渠道|
|dev|true|string|设备号|
|mac|true|string|MAC地址|

###### 应答header
|返回字段|字段说明|
|:-----|:-----|
|json-web-token|身份令牌|

###### 应答字段
|返回字段|字段类型|字段说明|
|:-----|:-----|:-----|
|interim|string|临时密码|
|uuid|string|用户ID|

###### 应答示例
>
```javascript
{
    "code": 200,
    "data": {
        "interim": "a9aa58b0dc402c8f20f1cdfeeaa3c26c",
        "uuid": "41adfb1b-5d38-49ea-b43c-2faa074464df"
    },
    "info": "恭喜您已登录成功"
}
```

**4\. 发送短信验证码**
###### 接口功能
> 给用户发送短信验证码

###### 请求方式与地址
> POST -> [captcha/phone.do](captcha/phone.do)
 
###### 参数格式
> JSON

###### 请求header
> 无

###### 请求参数
|参数|必选|类型|说明|
|:-----|:-----|:-----|:-----|
|username|true|string|用户手机号|

###### 应答header
> 无

###### 应答字段
> 无

###### 应答示例
>
```javascript
{
    "code": 200,
    "data": null,
    "info": "成功发送验证码, 请注意查收"
}
```

**5\. 查询临时密码**
###### 接口功能
> 通过身份令牌(json-web-token)换取用户ID(uuid)/临时密码(interim)供加速通道认证使用

###### 请求方式与地址
> POST -> [account/interim.do](account/interim.do)
 
###### 参数格式
> 无

###### 请求header
|参数|说明|
|:-----|:-----|
|json-web-token|身份令牌|

###### 请求参数
> 无

###### 应答header
> 无

###### 应答字段
|返回字段|字段类型|字段说明|
|:-----|:-----|:-----|
|uuid|string|用户ID|
|interim|string|临时密码|

###### 应答示例
>
```javascript
{
    "code": 200,
    "data": {
        "interim": "89c0730e6043ffeddd78db892cd55611",
        "uuid": "41adfb1b-5d38-49ea-b43c-2faa074464df"
    },
    "info": "获取uuid成功"
}
```

**6\. 获取公钥**
###### 接口功能
> 获取公钥用于对用户注册/登录时的密码等较为敏感信息加密传输
>
>**注: 采用RSA PKCS#1 v1.5加密 然后对加密串做url安全的base64encode**

###### 请求方式与地址
> GET -> [certificate/publickey.do](certificate/publickey.do)
 
###### 参数格式
> 无

###### 请求header
> 无

###### 请求参数
> 无

###### 应答header
> 无

###### 应答字段
|返回字段|字段类型|字段说明|
|:-----|:-----|:-----|
|content|string|公钥|

###### 应答示例
>
```javascript
{
    "code": 200,
    "data": {
        "content": "-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAO1UwJt3M3nf77cL1oGaxCnwTnQ41nYODt4XhyKEZJWsxXQbzkAlHMiV\nkCJfaGfI2jpKKyYcPXwMLWswC0nkCdQHDBN73GvMI5PrsXc7zO+APsC9cTfRMsI3\nsXTkm2xSiuD0e4PnhXHAsb/Kay73ZPmohCUSwvItmqX9bFaQMIkJAgMBAAE=\n-----END RSA PUBLIC KEY-----\n"
    },
    "info": "成功获取公钥"
}
```

**7\. 重置密码**
###### 接口功能
> 通过手机号重置密码

###### 请求方式与地址
> POST -> [retrieve/cellphone.do?chan=test&dev=macos&mac=a0:99:9b:08:ca:db](retrieve/cellphone.do?chan=test&dev=macos&mac=a0:99:9b:08:ca:db)

###### 参数格式
> JSON

###### 请求header
> 无

###### 请求参数(JSON)
|参数|必选|类型|说明|
|:-----|:-----|:-----|:-----|
|username|true|string|用户手机号|
|password|true|string|8-16位至少包含一个英文或特殊字符串密码|
|client|true|string|登录的端(pc/web)|
|captcha|true|string|短信验证码|

###### 请求参数(GET)
|参数|必选|类型|说明|
|:-----|:-----|:-----|:-----|
|chan|true|string|渠道|
|dev|true|string|设备号|
|mac|true|string|MAC地址|

###### 应答header
|返回字段|字段说明|
|:-----|:-----|
|json-web-token|身份令牌|

###### 应答字段
|返回字段|字段类型|字段说明|
|:-----|:-----|:-----|
|interim|string|临时密码|
|uuid|string|用户ID|

###### 应答示例
>
```javascript
{
    "code": 200,
    "data": {
        "interim": "df549e684f512349313c988d861d522f",
        "uuid": "e95e9d36-1ef1-495c-9195-42cff110689a"
    },
    "info": "恭喜您已成功重置密码"
}
```