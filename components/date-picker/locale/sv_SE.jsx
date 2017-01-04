"use strict";
const sv_SE_1 = require("rc-calendar/lib/locale/sv_SE");
const sv_SE_2 = require("../../time-picker/locale/sv_SE");
const object_assign_1 = require("object-assign");
const locale = {
    lang: object_assign_1.default({
        placeholder: 'Välj datum',
        rangePlaceholder: ['Startdatum', 'Slutdatum'],
    }, sv_SE_1.default),
    timePickerLocale: object_assign_1.default({}, sv_SE_2.default),
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = locale;
