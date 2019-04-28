import TiieObject from "Tiie/Object";
import jQuery from "jquery";

import icons from "./resources/icons.js";
import View from "Tiie/View";

const cn = 'Notification';
class Notification extends View {
    constructor(params = {}) {
        super(`<div class="em-notifications__notification"></div>`);

        let p = this.__private(cn, {
            type : Notification.TYPE_NORMAL,
            buttons : [],
        });

        this.set("-type", params.type ? params.type : Notification.TYPE_NORMAL);
        this.set("-title", params.title ? params.title : null);
        this.set("-message", params.message ? params.message : null);
        this.set("-buttons", params.buttons ? params.buttons : []);

        this.set("@visible", 1);

        this.element().addClass(`--${this.get("type")}`);

        if (!this.get("&buttons").some(b => b.id == "close")) {
            this.get("&buttons").push({
                id : "close",
                event : "close",
                icon : "close",
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

        this.on("events.close", (event) => {
            this.destroy();
        });
    }

    render() {
        let p = this.__private(cn),
            buttons = this.get("&buttons"),
            icons = this.__component("@icons")
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
            ${buttons.some(b => b.event == "close") ? `
                <div class="em-notifications__notification-actions">
                    ${buttons.filter(b => b.event == "close").map((button) => {
                        return `
                            <div class="em-notifications__notification-action" event-click="${button.event}">
                                ${icons.get(button.icon)}
                            </div>
                        `;
                    }).join("")}
                </div>
            ` : ``}
        `;

        this.element().html(html);
    }
}

Notification.TYPE_NORMAL = "normal";
Notification.TYPE_INFO = "info";
Notification.TYPE_WARNING = "warning";
Notification.TYPE_DANGER = "danger";
Notification.TYPE_SUCCESS = "success";
Notification.TYPE_ERROR = "error";

export default Notification;
