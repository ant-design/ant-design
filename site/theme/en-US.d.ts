interface ENLocale {
  locale: 'en-US';
  messages: {
    [key: PropertyKey]: string;
  };
}

const enLocale: ENLocale;
export default enLocale;
