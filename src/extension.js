import NotificationsService from "Tiie/Notifications/Service";

import style from "./resources/style.scss";

export default function(app, params = {}) {
    let service = new NotificationsService(app.components().get("@frames"));

    app.components().set("@notifications", service);
    app.components().set("@notifications.window", service.attach(app.target(), {
        fixed : 1
    }));

    return 1;
}
