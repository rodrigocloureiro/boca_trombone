import { useState, useLayoutEffect } from 'react';
import style from './Faq.module.css';

export default function Faq() {
  const [ faq, setFaq ] = useState([]);
  const [ itemActive, setItemActive ] = useState(null);

  const handleAccordion = (index) => {
    itemActive === index ? setItemActive(null) : setItemActive(index);
  };

  useLayoutEffect(() => {
    fetch('src/assets/data/faq.json')
    .then(response => response.json())
    .then(data => setFaq(data.faq));
  }, []);

  return (
    <main>
      <article className='container'>
        <div className={style.faq_area}>
          <h2>Perguntas Frequentes (FAQ)</h2>
          <div className={style.accordion_area}>
            {faq.map((question, index) => (
              <div className={style.group} key={index}>
                <p
                  className={`${style.accordion} ${itemActive === index && `${style.active}`}`}
                  onClick={() => handleAccordion(index)}
                >{question.question}</p>
                <div className={`${style.panel} ${itemActive === index ? style.show_panel : style.hide_panel}`}>
                  {question.answer.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
