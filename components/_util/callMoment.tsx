// https://github.com/moment/moment/issues/3650
export default function callMoment(moment: any, ...args: any[]) {
  return (moment.default || moment)(...args);
}
