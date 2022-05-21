A simple tool to listen for changes to the endpoint API!

# Install

```js
yarn add compare-api 
//or
npm i compare-api
```

# Usage

```js
const CompareAPI = require('compare-api');
const APIListener = new CompareAPI({
    apiUrl: 'https://assistantscenter.com/api/test/',
    timeout: 10000,
    successStatus: 200,
    onCheck: () => console.log('Checking!'),
});

APIListener.start();

APIListener.events.on('dataChanged', ({oldData, newData}) =>{
    console.log(oldData, newData);
});

APIListener.events.on('fetchError', ({message, code}) =>{
    console.log(message, code);
});

```

## Screenshot from usage sample

![](https://cdn.discordapp.com/attachments/837991950036238346/977519534196011049/unknown.png)

# License

The project is under MIT licence.
