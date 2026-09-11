//1)Check whether a number is even or odd.
//A(normal)
function oRe(a){
  if(a%2==0)console.log("Even")
  else console.log("Odd")
}
let a=Number(prompt())
oRe(a)
//B(ternary)
console.log(((Number(prompt()))%2==0)? "Even":"Odd")


//2)Find the largest of 3 numbers.
//A(integer)
function lar(a,b,c){
  if(a>b && a>c)console.log(a);
  else if(b>a && b>c)console.log(b);
  else console.log(a);
}
let a=Number(prompt())
let b=Number(prompt())
let c=Number(prompt())
lar(a,b,c)
//B(array)
function lar(a){
  let temp=-Infinity;
  for(let i of a)if(temp<i)temp=i;
  console.log(temp);
}
lar([2,3,5])


//3)Reverse a string.
//A(normal)
function rev(a){
  let b=""
  for(let i=a.length-1;i>-1;i--)b+=a[i]
  console.log(b)
}
rev("King")
//B(built in)
let a=prompt().split('');
console.log(a.reverse().join(''))


//4)Find factorial of a number.
//A(normal)
function fact(a){
  if(a<0)return 0
  let b=1
  for(let i=1;i<a+1;i++)b*=i
  return b
}
let res=fact(Number(prompt()))
console.log(res)
//B(recursion)
function fact(a){
  if(a<2)return 1
  return a*fact(a-1)
}
let res=fact(Number(prompt()))
console.log(res)


//5)Check whether a number is prime.
//A(single number)
function prime(a){
  if(a<2){
    console.log("False")
    return 
  }
  else{
    for(let i=2;i*i<a+1;i++){
      if(a%i==0){
        console.log("false")
        return 
      }
    }
    console.log("true")
  }
}
prime(Number(prompt()))
//B(within a range)
function prime(a,b){
  let arr=[]
  for(let i=a;i<b+1;i++){
    if(i<2)continue
    let bol=true
    for(let j=2;j*j<i+1;j++){
      if(i%j==0){
        bol=false
        break
      }
    }
    if(bol)arr.push(i)
  }
  console.log(arr)
}
prime(Number(prompt()),Number(prompt()))



//6)Print Fibonacci series.
function fib(a){
  if(a<1)return
  let arr=[]
  let b=0
  let c=1
  for(let i=1;i<a+1;i++){
    arr.push(b)
    let temp=b+c
    b=c
    c=temp
  }
  console.log(arr)
}
fib(Number(prompt()))


//7)Find the largest and smallest number in an array.
//A(normal)
function maxmin(a){
  let max=-Infinity
  let min=Infinity
  for(let i of a){
    if(i>max)max=i
    if(i<min)min=i
  }
  console.log("Max : "+max+"  Min : "+min)
}
maxmin([6,4,8,3,9])
//B(built in)
function maxmin(a){
  let max=Math.max(...a)
  let min=Math.min(...a)
  console.log("Max : "+max+"   Min : "+min)
}
maxmin([6,4,8,3,9])


//8)Remove duplicate values from an array.
function rdup(a){
  let arr=[]
  for(let i of a){
    if(!arr.includes(i))arr.push(i)
  }
  console.log(arr)
}
rdup([23,3,5,7,4,3,4,5,4,1])


//9)Count vowels in a string.
function cvow(a){
  let b="aeiou"
  a=a.toLowerCase()
  let count=0
  for(let i of a){
    if(b.includes(i))count++
  }
  console.log(count)
}
cvow(prompt())


//10)Find the sum of all numbers in an array.
function sum(a){
  let s=0
  for(let i of a)s+=i
  console.log(s)
}
sum([1,2,4,5,3,5,4])



/* mini task
Create a simple Student Result Program using JavaScript.
It should take student name and marks for 5 subjects and calculate:
Total
Percentage
Grade
Pass/Fail
*/
function pf(a){
  return (a>=45)?"Pass":"Fail"
}
function per(a){
  let m=0
  for(let i of a)m+=i
  return m/5
}
function gr(a){
  if(a>90)return "O"
  else if(a>80)return "A+"
  else if(a>70)return "A"
  else if(a>60)return "B+"
  else if(a>50)return "B"
  else if(a>45)return "C"
  else return "Arrear"
}
function gen(a,b,c,d){
  console.log(`Name : ${a}\nPercentage : ${b}\nResult : ${c}\nGrade : ${d}`)
}
name=prompt()
mark=[]
for(let i=0;i<5;i++)mark.push(Number(prompt()))
let percentage=per(mark)
let res=pf(percentage)
let grade=gr(percentage)
gen(name,percentage,res,grade)
