let a = 1;
let b = 2;
console.log('before',a,b);

// let c=a;
// a=b;
// b=c;
[a,b]=[b,a];
console.log('after',a,b);