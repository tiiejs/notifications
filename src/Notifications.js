/** @module Tiie/Notifications */
import TiieObject from "Tiie/Object";

import Notification from "Tiie/Notifications/Notification";

import FramesLayout from "Tiie/Frames/Layouts/Layout";
import FramesLayer from "Tiie/Frames/Layer";
import FramesAnimation from "Tiie/Frames/Animation";

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
            zIndex : params.zIndex,
        });

        // Create default layer.
        p.framesLayer = p.frames.createLayer(p.framesLayerName, {
            layout : FramesLayout.TYPE_STACK,
            align : params.align ? params.align : ["right"],
            animationShow : {
                name : FramesAnimation.ANIMATION_SLIDE_IN_FROM_TOP,
                params : {},
            },
            animationHide : {
                name : FramesAnimation.ANIMATION_ZOOM_OUT,
                params : {},
            },

            margin : params.margin,
            marginTop : params.marginTop,
            marginLeft : params.marginLeft,
            marginRight : params.marginRight,
            marginBottom : params.marginBottom,
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
                notification.destroyed = 1;
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

    testGenerateNotifications() {
        let p = this.__private(cn);

        this.create({
            type : Notification.TYPE_NORMAL,
            title : `Title ${Notification.TYPE_NORMAL}`,
            message : `Message ${Notification.TYPE_NORMAL}`,
        });

        this.create({
            type : Notification.TYPE_INFO,
            title : `Title ${Notification.TYPE_INFO}`,
            message : `Message ${Notification.TYPE_INFO}`,
        });

        this.create({
            type : Notification.TYPE_WARNING,
            title : `Title ${Notification.TYPE_WARNING}`,
            message : `Message ${Notification.TYPE_WARNING}`,
        });

        this.create({
            type : Notification.TYPE_DANGER,
            title : `Title ${Notification.TYPE_DANGER}`,
            message : `Message ${Notification.TYPE_DANGER}`,
        });

        this.create({
            type : Notification.TYPE_SUCCESS,
            title : `Title ${Notification.TYPE_SUCCESS}`,
            message : `Message ${Notification.TYPE_SUCCESS}`,
        });

        this.create({
            type : Notification.TYPE_ERROR,
            title : `Title ${Notification.TYPE_ERROR}`,
            message : `Message ${Notification.TYPE_ERROR}`,
        });
    }
}

export default Notifications;
