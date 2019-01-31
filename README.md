## Tiiejs notifications
Extension to display notifications.

## Install

Extensions need `tiiejs-frames`.

### Webpack

First we need to define alias for Webpack.

```js
// webpack.config.js

const path = require('path');

module.exports = (environment) => {
    return {
        // ...
        resolve : {
            alias : {
                // ...
                "Tiie/Notifications" : "tiiejs-notifications/src",
                "Tiie" : "tiiejs/src",
            }
        }
    }
};
```

Then plug extension and define component.

```js
import App from "Tiie/App";
import extensionNotifications from "Tiie/Notifications/extension"

// ...
let app = new App(jQuery("body"));

app.plugin(extensionNotifications);
app.run();
```

**The documentation is being created ...**
