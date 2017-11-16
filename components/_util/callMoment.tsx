// https://github.com/moment/moment/issues/3650

export default function callMoment(moment, ...args) {
  return (moment.default || moment)(...args);
}
