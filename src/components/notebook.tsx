import React, { ReactNode, ReactElement } from "react";

export interface notebookProps {
  title?: string;
}

function AddBtn(props: { onClick: () => void }) {
  return <button onClick={props.onClick}>添加</button>;
}

const NoteBook: React.FC<notebookProps> = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 10];
  const listItems: ReactElement[] = [];
  for (let index = 0; index < arr.length; index++) {
    const each = arr[index];
    listItems.push(<li key={index}>{each}</li>);
  }
  const sList = React.useState(listItems);
  const sCount = React.useState(0);
  const [list] = sList;
  const [count] = sCount;

  return (
    <div>
      <ul>{list}</ul>
      <label>click times {count}</label>
      <AddBtn onClick={add.bind(null,sList,sCount)} />
    </div>
  );
}

function add([list, setList]:any,[count, setCount]:any) {
  const wii = list[0];
  const random = Math.random().toString();
  const beAdd = <wii.type {...wii.props} key={random}>{random}</wii.type>;
  list.push(beAdd);
  setList(list);
  setCount(count+1);
}

export default NoteBook;