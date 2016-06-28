"use strict";
const react_1 = require('react');
const splitObject_1 = require('../_util/splitObject');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = props => {
    const [{ type, className = '' }, others] = splitObject_1.default(props, ['type', 'className']);
    let className2 = `${className} anticon anticon-${type}`.trim();
    return <i className={className2} {...others}/>;
};
