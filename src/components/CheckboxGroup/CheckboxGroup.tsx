import React, { useMemo, useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckMeta } from './interface';
import propTypes from './properties';

class CheckArea implements CheckMeta {
  title: string;
  content: React.ReactNode;
  checked: boolean;
  constructor(option: CheckMeta) {
    this.title = option.title;
    this.content = option.content;
    this.checked = option.checked ?? false;
  }

  static init(options: CheckMeta[]): CheckArea[] {
    return options.map(e => new CheckArea(e));
  }
}

function CheckboxGroup({ options, onChange }: propTypes) {
  const [innerValue, setInnerValue] = useState(CheckArea.init(options));
  const optionsDom = useMemo(() => {
    return innerValue.map(genOptions(setInnerValue, onChange));
  }, [innerValue, onChange]);

  useEffect(() => {
    setInnerValue(CheckArea.init(options));
  }, [options]);

  return <>{optionsDom}</>;
}

function genOptions(
  setInnerValue: React.Dispatch<React.SetStateAction<CheckArea[]>>,
  onChange: ((index: number, e: CheckboxChangeEvent) => void) | undefined,
) {
  return function (option: CheckArea, index: number) {
    return (
      <div key={index}>
        <Checkbox onChange={handleCheck(setInnerValue, index, onChange)} checked={option.checked}>
          {option.title}
        </Checkbox>
        {option.checked && option.content}
      </div>
    );
  };
}

function handleCheck(
  setInnerValue: React.Dispatch<React.SetStateAction<CheckArea[]>>,
  index: number,
  onChange: ((index: number, e: CheckboxChangeEvent) => void) | undefined,
) {
  return function (e: CheckboxChangeEvent) {
    setInnerValue(inner => {
      const values = inner.slice();
      values[index].checked = e.target.checked;
      return values;
    });
    onChange && onChange(index, e);
  };
}

export default CheckboxGroup;
