let A = [2, 1];
let C = A;
(function (){
  console.log(C); // [1, 2]
  C = 3
})()
A.sort();
console.log(C[0]); // [1, 2]
