/** @module Tiie/Notifications */
import NotificationsService from "Tiie/Notifications/Service";

import style from "./resources/style.scss";

export default function(app, params = {}) {
    if(!app.components().exists("@frames")) {
        console.warn("I can not init notifications extension because there is no '@frames' service.");

        return 0;
    }

    // Init notifications service. Notifications need Frames service to work
    // properly.
    let service = new NotificationsService(app.components().get("@frames"));

    app.components().set("@notifications", service);
    // Attach notifications to whole window.
    app.components().set("@notifications.window", service.attach(app.target(), {
        fixed : 1
    }));

    return 1;
}
