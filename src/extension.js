/** @module Tiie/Notifications */
import NotificationsService from "Tiie/Notifications/Service";
import jQuery from "jquery";

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
    app.components().set("@notifications.window", service.attach(app.target(), 1, {
        align : params.windowAlign,
        animationHideName : params.windowAnimationHideName,
        animationShowName : params.windowAnimationShowName,
        margin : params.windowMargin,
        marginBottom : params.windowMarginBottom,
        marginLeft : params.windowMarginLeft,
        marginRight : params.windowMarginRight,
        marginTop : params.windowMarginTop,
    }));

    return 1;
}
