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
     *
     * @param {object} [params]
     * @param {string[]} [params.align]
     * @param {number} [params.zIndex]
     * @param {number} [params.fixed]
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
    attach(target, params = {}) {
        let p = this.__private(cn),
            // First attach frames to container.
            frames = p.frames.attach(target, {
                zIndex : params.zIndex,
                fixed : params.fixed,
            })
        ;

        let notifications = new Notifications(frames, {
            align : params.align,
            margin : params.margin,
            marginBottom : params.marginBottom,
            marginLeft : params.marginLeft,
            marginRight : params.marginRight,
            marginTop : params.marginTop,
            animationHideName : params.animationHideName,
            animationShowName : params.animationShowName,
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

