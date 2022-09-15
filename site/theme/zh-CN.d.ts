interface CNLocale {
  locale: 'zh-CN';
  messages: {
    [key: PropertyKey]: string;
  };
}

const cnLocale: CNLocale;
export default cnLocale;
