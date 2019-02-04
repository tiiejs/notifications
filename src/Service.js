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
     * @param {jQuery}   target
     * @param {boolean}  fixed
     *
     * @param {object} [params]
     * @param {string[]} [params.align]
     * @param {string} [params.animationHideName]
     * @param {string} [params.animationShowName]
     * @param {number} [params.margin]
     * @param {number} [params.marginBottom]
     * @param {number} [params.marginLeft]
     * @param {number} [params.marginRight]
     * @param {number} [params.marginTop]
     *
     * @return {Tiie.Notifications.Notifications}
     */
    attach(target, fixed = 0, params = {}) {
        let p = this.__private(cn),
            // First get frames.
            frames = p.frames.attach(target, fixed)
        ;

        let notifications = new Notifications(frames, {
            align : params.align,
            animationHideName : params.animationHideName,
            animationShowName : params.animationShowName,
            margin : params.margin,
            marginBottom : params.marginBottom,
            marginLeft : params.marginLeft,
            marginRight : params.marginRight,
            marginTop : params.marginTop,
        });

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

