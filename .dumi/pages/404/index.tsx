import React, { type FC } from 'react';

const NotFoundPage: FC = () => {
  // TODO: implement 404 page
  // from: https://github.com/ant-design/ant-design/blob/0067b923b998eb8e68748a7c5b6f9414fb819052/site/theme/template/NotFound.tsx
  return (
    <section
      style={{
        borderBottom: '1px solid #eee',
        padding: 22,
      }}
    >
      404 page
    </section>
  );
};

export default NotFoundPage;
