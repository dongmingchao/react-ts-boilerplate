import React, { useState, ReactElement } from "react";
import _ from 'lodash/fp';

class Car {
  name: string
  horsepower: number
  dollar_value: number
  in_stock: boolean
}

const logShow = _.curry(function (setLog: React.Dispatch<React.SetStateAction<string>>, msg: any){
  setLog(String(msg));
});

export default function CarsProducts() {
  const [car, setCar] = useState([
    {
      name: "Ferrari FF",
      horsepower: 660,
      dollar_value: 700000,
      in_stock: true
    },
    {
      name: "Spyker C12 Zagato",
      horsepower: 650,
      dollar_value: 648000,
      in_stock: false
    },
    {
      name: "Jaguar XKR-S",
      horsepower: 550,
      dollar_value: 132000,
      in_stock: false
    },
    { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
    {
      name: "Aston Martin One-77",
      horsepower: 750,
      dollar_value: 1850000,
      in_stock: true
    },
    {
      name: "Pagani Huayra",
      horsepower: 700,
      dollar_value: 1300000,
      in_stock: false
    }
  ]);
  const carsList: ReactElement[] = [];
  car.forEach(each => {
    carsList.push(<li key={each.name}>{each.name}</li>);
  });
  const [logArea, setLogArea] = useState('');
  const log = logShow(setLogArea);
  return (
    <div>
      <ul>{carsList}</ul>
      <button onClick={() => log(isLastInStock(car))}>
        最后一个是不是在库中
      </button>
      <button onClick={() => log(firstCarName(car))}>
        第一个车的名字
      </button>
      <button onClick={() => log(averageDollarValue(car))}>
        平均价格
      </button>
      <div>{logArea}</div>
    </div>
  );
}

// const trace = _.curry(function(...a) {
//   console.log(a);
//   return a;
// });

const isLastInStock = _.compose(
  _.pathOr('', 'in_stock'),
  _.last,
)

const firstCarName = _.compose(
  _.pathOr('', 'name'),
  _.head,
)

const _average = (xs: any[]) => {
  return _.reduce(_.add, 0, xs) / xs.length
}

const averageDollarValue = _.compose(
  _average,
  _.map(_.path('dollar_value')),
)