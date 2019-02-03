## Tiiejs notifications
Mechanism to display a few kinds of notification at application.

Types of notifications.
- TYPE_NORMAL
- TYPE_INFO
- TYPE_WARNING
- TYPE_DANGER
- TYPE_SUCCESS
- TYPE_ERROR

## Install

### Dependencies

- `tiiejs`
- `tiiejs-frames`
- `tiiejs-styles`

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
            }
        }
    }
};
```

Then plug extension and define component.

```js
import App from "Tiie/App";

// Extensions
import extensionNotifications from "Tiie/Notifications/extension";

let app = window.app = new App(/** ... **/);

app.plugin(extensionNotifications, {
    windowMarginTop : 50,
    windowMarginRight : 25,
    // windowAlign : ["left"],
    // windowMargin : null,
    // windowMarginTop : null,
    // windowMarginLeft : null,
    // windowMarginRight : null,
    // windowMarginBottom : null,
});

app.run();
```

**The documentation is being created ...**
