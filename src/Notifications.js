/** @module Tiie/Notifications */
import TiieObject from "Tiie/Object";

import Notification from "Tiie/Notifications/Notification";

import FramesLayout from "Tiie/Frames/Layouts/Layout";
import FramesLayer from "Tiie/Frames/Layer";

const cn = 'Notifications';

/**
 * @class
 */
class Notifications extends TiieObject {

    /**
     * Prepare notifications for given target.
     */
    constructor(frames, target, params = {}) {
        super();

        let p = this.__private(cn, {
            // Target to attach notifications.
            target,

            // Frames for target.
            frames : null,

            // Layer with notifications.
            framesLayer : null,

            // Name of loader
            framesLayerName : `notifications${this.id()}`,

            // List of notifications.
            notifications : [],
        });

        // Attach frames for target. Generally Notifications uses Frames.
        p.frames = frames.attach(target, {
            fixed : params.fixed,
        });

        // Create default layer.
        p.framesLayer = p.frames.createLayer(p.framesLayerName, {
            layout : FramesLayout.TYPE_STACK,
            // fixed : params.fixed,
            align : ["right"],
            margin : 20,
        });
    }

    /**
     * Create notification and display it.
     *
     * @param {object} params
     *
     * @return {Tiie.Notifications.Notification}
     */
    create(params = {}) {
        let p = this.__private(cn),
            object = new Notification(params),
            frame = p.frames.create(p.framesLayerName, {
                width : 500,
                height : "auto",
            })
        ;

        let notification = {
            object,
            frame,
            destroyed : 0,
            hover : 0,
        };

        object.render();

        p.notifications.push(notification);

        if (params.duration) {
            setTimeout(function() {
                notification.destroyed = 1;
            }, params.duration);
        } else {
            setTimeout(function() {
            }, 3000);
        }

        frame.element().append(object.element());

        return object;
    }

    reload() {
        let p = this.__private(cn),
            destroyed = 0
        ;

        if (p.notifications.some(notification => notification.frame.is("@hover"))) {
            return;
        }

        p.notifications.forEach((notification) => {
            if (notification.destroyed) {
                notification.frame.destroy();

                destroyed = 1;
                return;
            }

            if (notification.object.is("@destroyed")) {
                notification.frame.destroy();

                destroyed = 1;
                return;
            }

            if (!notification.object.is("@visible")) {
                notification.frame.hide();
            } else {
                notification.frame.show();
            }
        });

        if (destroyed) {
            p.notifications = p.notifications.filter(notification => !notification.object.is("@destroyed"));
        }
    }
}

export default Notifications;
