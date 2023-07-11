let bool1 = true;
let bool2 = new Boolean(false);

let num1 = 1;
let num2 = new Number(2);

let bignum1 = 123456789n;
let bignum2 = BigInt(123412341234);

let str1 = 'abc';
let str2 = new String('123abc');

let undef = undefined;

//----------------------------------------------------------------

console.log(`${bool1} ${typeof bool1}`);
console.log(`${bool2} ${typeof bool2}`);

console.log(`${num1} ${typeof num1}`);
console.log(`${num2} ${typeof num2}`);

console.log(`${bignum1} ${typeof bignum1}`);
console.log(`${bignum2} ${typeof bignum2}`);

console.log(`${str1} ${typeof str1}`);
console.log(`${str2} ${typeof str2}`);

console.log(`${undef} ${typeof undef}`);

//------------------------------------------------------------------

let data = '1234';
console.log(new Boolean(BigInt(new Number(data))));

//------------------------------------------------------------------
bool1 = true;
bool2 = new Boolean(false);

num1 = 1;
num2 = new Number(2);

bignum1 = 123456789n;
bignum2 = BigInt(123412341234);

str1 = 'abc';
str2 = new String('123abc');

console.log(typeof(bool1 + bool2));
console.log(typeof(num1 + num2));
console.log(typeof(bignum1 + bignum2));
console.log(typeof(str1 + str2));
console.log(typeof(Symbol('simbolo1') + Symbol('simbolo2')));

//----------------------------------------------------------------
bool1 = true;
bool2 = new Boolean(false);

num1 = 1;
num2 = new Number(2);

bignum1 = 123456789n;
bignum2 = BigInt(123412341234);

str1 = 'abc';
str2 = new String('123abc');

console.log(bool1 + num1);
console.log(bool1 + str1);
console.log(num1 + str1);

console.log(num1 + bignum1);
console.log(bool1 + bignum1);
console.log(bignum1 + str1);

//-----------------------------------------------------------------
{
    const str1 = 42 + Number('1');
    console.log(str1);

}
{

    const str1 = 42 + parseInt('1');
    console.log(str1);

}
