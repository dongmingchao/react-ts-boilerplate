import React from 'react';
import css from './CssPane.css';
import les from './testLess.less';

const CssPane: React.FC = () => {
  return (
    <>
    <h1 className={css.header}>Red Header</h1>
    <h1 className={css["header-with-componse"]}>Red Header With Blue BG use Composition</h1>
    <h1 className={css["header-with-import"]}>Header With Import</h1>
    <h1 className={css["header-use-var"]}>Header use <em className={css["nest"]}>variable Color</em></h1>
    <h1 className={les["header-use-less"]}>Header use <em className={les["nest"]}>less</em></h1>
    <h1 className={css["test-new"]}>Test new</h1>
    </>
  )
}

export default CssPane;