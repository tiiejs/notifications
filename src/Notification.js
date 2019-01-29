import TiieObject from "Tiie/Object";
import jQuery from "jquery";

import icons from "./resources/icons.js";

const cn = 'Notification';
class Notification extends TiieObject {
    constructor(params = {}) {
        super();

        let p = this.__private(cn, {
            type : Notification.TYPE_NORMAL,
            buttons : [],
        });

        this.set("-type", params.type ? params.type : Notification.TYPE_NORMAL);
        this.set("-title", params.title ? params.title : null);
        this.set("-message", params.message ? params.message : null);
        this.set("-buttons", params.buttons ? params.buttons : []);
        // this.set("-duration", params.duration ? params.duration : null);

        this.set("@visible", 1);

        p.element = jQuery(`<div class="em-notifications__notification --${this.get("type")}"></div>`);

        if (!this.get("&buttons").some(b => b.id == "close")) {
            this.get("&buttons").push({
                id : "actionClose",
                action : "close",
            });
        }

        this.on([
            "type:change",
            "title:change",
            "messsage:change",
            "buttons:change",
        ], () => {
            this.render();
        });

        this.on("action.close:run", (event, params) => {
            // this.emit("action.close:stop")
            // this.emit("action.close:pouse")
            // this.emit("action.close:error")
            this.emit("action.close:finish")

            this.destroy();
        });

        p.element.on("click", ".em-notifications__notification-action", (event) => {
            let target = jQuery(event.currentTarget),
                action = target.data("action")
            ;

            this.emit(`action.${action}:run`);

            event.stopPropagation();
        });
    }

    render() {
        let p = this.__private(cn),
            buttons = this.get("&buttons")
        ;

        let html = `
            ${icons[p.type] ? `
            <div class="em-notifications__notification-icon">
                ${icons[p.type]}
            </div>
            ` : ``}
            <div class="em-notifications__notification-messsage">
                ${this.get("title") ? `
                <div class="em-notifications__notification-messsage-title">
                    ${this.get("title")}
                </div>
                ` : ``}
                ${this.get("message") ? `
                <div class="em-notifications__notification-messsage-message">
                    ${this.get("message")}
                </div>
                ` : ``}
            </div>
            ${buttons.some(b => b.action == "close") ? `
            <div class="em-notifications__notification-actions">
            ${buttons.filter(b => b.action == "close").map((button) => {
                return `
                <div class="em-notifications__notification-action" data-action="${button.action}">
                    ${icons.close}
                </div>
                `;
            }).join("")}
            </div>
            ` : ``}
        `;

        p.element.html(html);

        return this;
    }

    element() {
        let p = this.__private(cn);

        return p.element;
    }
}

Notification.TYPE_NORMAL = "normal";
Notification.TYPE_INFO = "info";
Notification.TYPE_WARNING = "warning";
Notification.TYPE_DANGER = "danger";
Notification.TYPE_SUCCESS = "success";
Notification.TYPE_ERROR = "error";

export default Notification;
