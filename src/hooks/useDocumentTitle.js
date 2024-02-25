import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Iot Projetos- aplicativo React de projetos IOT';
    }
  }, [title]);
};

export default useDocumentTitle;
