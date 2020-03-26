import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import { PropAnalzye } from '../../../lib/Props/core';

function Stories() {
  const [doms, setDoms] = useState<ReactNode>();
  useEffect(() => {
    fetch('api').then(e => e.json()).then(e => {
      setDoms(e.map(renderTr));
    });
  }, []);
  return (
  <table>
    <thead>
      <tr>
        <td>属性名</td>
        <td>类型</td>
        <td>描述</td>
      </tr>
    </thead>
    <tbody>
      {doms}
    </tbody>
  </table>);
}

function renderTr(tr: PropAnalzye, index: number) {
  return (
  <tr key={index}>
    <td>{tr.name}</td>
    <td>{tr.typeName}</td>
    <td>{tr.comment}</td>
  </tr>);
}

export default Stories;
