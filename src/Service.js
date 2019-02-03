import TiieObject from "Tiie/Object";
import Notifications from "Tiie/Notifications/Notifications";

const cn = 'Service';
class Service extends TiieObject {
    constructor(frames) {
        super();

        let p = this.__private(cn, {
            frames,
            notifications : [],
        });

        setInterval(() => {
            this._reload();
        }, 1000);
    }

    /**
     * Attach notifications mechanism to specific document element.
     *
     * @param {jQuery} target
     * @param {object} params
     *
     * @return {Tiie.Notifications.Notifications}
     */
    attach(target, params = {}) {
        let p = this.__private(cn),
            notifications = new Notifications(p.frames, target, params)
        ;

        p.notifications.push(notifications);

        return notifications;
    }

    _reload() {
        let p = this.__private(cn),
            destroyed = 0
        ;

        p.notifications.forEach((notification) => {
            if (notification.is("@destroyed")) {
                destroyed = 1;
                return;
            }

            notification.reload();
        });

        if (destroyed) {
            p.notifications = p.notifications.filter(notification => notification.is("@destroyed"));
        }
    }
}

export default Service;

