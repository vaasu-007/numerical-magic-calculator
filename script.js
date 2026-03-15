function startCalculation(){

let method = document.getElementById("method").value;
let html = "";

if(method=="simpson"){

html = `
<h2>Simpson's Magic</h2>

<input id="func" placeholder="Enter f(x) example: x*x">
<input id="a" placeholder="Lower limit a">
<input id="b" placeholder="Upper limit b">
<input id="n" placeholder="Number of intervals (even)">

<br><br>

<button onclick="solveSimpson()">Solve</button>
`;

}

else if(method=="rk"){

html = `
<h2>Runge-Kutta Magic</h2>

<input id="func" placeholder="Enter dy/dx = f(x,y) example: x+y">
<input id="x0" placeholder="Initial x">
<input id="y0" placeholder="Initial y">
<input id="h" placeholder="Step size">

<br><br>

<button onclick="solveRK()">Solve</button>
`;

}

else if(method=="power"){

html = `
<h2>Power Method Magic</h2>

<label>Choose Matrix Size</label><br><br>

<select id="matrixSize" onchange="createMatrixInputs()">
<option value="">Select Size</option>
<option value="2">2 × 2 Matrix</option>
<option value="3">3 × 3 Matrix</option>
</select>

<br><br>

<div id="matrixInputs"></div>
`;

}

document.getElementById("inputs").innerHTML = html;

}


function createMatrixInputs(){

let size = document.getElementById("matrixSize").value;
let html = "";

if(size==2){

html = `
<input id="a11" placeholder="A11">
<input id="a12" placeholder="A12"><br><br>

<input id="a21" placeholder="A21">
<input id="a22" placeholder="A22"><br><br>

<button onclick="solvePower2()">Solve</button>
`;

}

if(size==3){

html = `
<input id="a11" placeholder="A11">
<input id="a12" placeholder="A12">
<input id="a13" placeholder="A13"><br><br>

<input id="a21" placeholder="A21">
<input id="a22" placeholder="A22">
<input id="a23" placeholder="A23"><br><br>

<input id="a31" placeholder="A31">
<input id="a32" placeholder="A32">
<input id="a33" placeholder="A33"><br><br>

<button onclick="solvePower3()">Solve</button>
`;

}

document.getElementById("matrixInputs").innerHTML = html;

}


function evaluateFunction(expr,x,y){

expr = expr.replace(/\^/g,"**");
return Function("x","y","return "+expr)(x,y);

}


function solveSimpson(){

let f = document.getElementById("func").value;
let a = parseFloat(document.getElementById("a").value);
let b = parseFloat(document.getElementById("b").value);
let n = parseInt(document.getElementById("n").value);

if(n%2!=0){
alert("n must be even for Simpson Rule");
return;
}

let h=(b-a)/n;
let sum=0;

let steps="";
let xValues=[];
let yValues=[];

for(let i=0;i<=n;i++){

let x=a+i*h;
let fx=evaluateFunction(f,x,0);

xValues.push(x);
yValues.push(fx);

steps += `x${i} = ${x.toFixed(3)} , f(x${i}) = ${fx.toFixed(3)} <br>`;

if(i==0 || i==n)
sum+=fx;
else if(i%2==0)
sum+=2*fx;
else
sum+=4*fx;

}

let result=(h/3)*sum;

openResult("Simpson Rule",steps,result,xValues,yValues);

}


function solveRK(){

let f=document.getElementById("func").value;

let x=parseFloat(document.getElementById("x0").value);
let y=parseFloat(document.getElementById("y0").value);
let h=parseFloat(document.getElementById("h").value);

let k1=h*evaluateFunction(f,x,y);
let k2=h*evaluateFunction(f,x+h/2,y+k1/2);
let k3=h*evaluateFunction(f,x+h/2,y+k2/2);
let k4=h*evaluateFunction(f,x+h,y+k3);

let y1=y+(k1+2*k2+2*k3+k4)/6;

let steps=`
k1 = ${k1}<br>
k2 = ${k2}<br>
k3 = ${k3}<br>
k4 = ${k4}<br><br>
y1 = ${y1}
`;

openResult("Runge Kutta Method",steps,y1,[x,x+h],[y,y1]);

}


function solvePower2(){

let a11=parseFloat(document.getElementById("a11").value);
let a12=parseFloat(document.getElementById("a12").value);
let a21=parseFloat(document.getElementById("a21").value);
let a22=parseFloat(document.getElementById("a22").value);

let x=[1,1];
let lambda=0;
let steps="";

for(let i=0;i<10;i++){

let y1=a11*x[0]+a12*x[1];
let y2=a21*x[0]+a22*x[1];

lambda=Math.max(Math.abs(y1),Math.abs(y2));

x=[y1/lambda,y2/lambda];

steps += `Iteration ${i+1} : λ ≈ ${lambda}<br>`;

}

steps += `<br><b>Eigenvector ≈ [ ${x[0].toFixed(4)} , ${x[1].toFixed(4)} ]</b>`;

openResult("Power Method 2x2",steps,lambda);

}


function solvePower3(){

let a11=parseFloat(document.getElementById("a11").value);
let a12=parseFloat(document.getElementById("a12").value);
let a13=parseFloat(document.getElementById("a13").value);

let a21=parseFloat(document.getElementById("a21").value);
let a22=parseFloat(document.getElementById("a22").value);
let a23=parseFloat(document.getElementById("a23").value);

let a31=parseFloat(document.getElementById("a31").value);
let a32=parseFloat(document.getElementById("a32").value);
let a33=parseFloat(document.getElementById("a33").value);

let x=[1,1,1];
let lambda=0;
let steps="";

for(let i=0;i<10;i++){

let y1=a11*x[0]+a12*x[1]+a13*x[2];
let y2=a21*x[0]+a22*x[1]+a23*x[2];
let y3=a31*x[0]+a32*x[1]+a33*x[2];

lambda=Math.max(Math.abs(y1),Math.abs(y2),Math.abs(y3));

x=[y1/lambda,y2/lambda,y3/lambda];

steps += `Iteration ${i+1} : λ ≈ ${lambda}<br>`;

}

steps += `<br><b>Eigenvector ≈ [ ${x[0].toFixed(4)} , ${x[1].toFixed(4)} , ${x[2].toFixed(4)} ]</b>`;

openResult("Power Method 3x3",steps,lambda);

}



function openResult(title,steps,result,xValues=[],yValues=[]){

let w = window.open("","_blank");

w.document.write(`

<html>

<head>

<title>Magical Result</title>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>

body{
margin:0;
font-family:Segoe UI;
color:white;
text-align:center;
overflow:hidden;
background:black;
}

/* GALAXY */

.stars{
position:fixed;
width:100%;
height:100%;
background:transparent;
box-shadow:
20px 30px white,
200px 120px white,
400px 300px white,
600px 200px white,
800px 400px white,
1000px 150px white,
1200px 350px white;
animation:moveStars 60s linear infinite;
}

@keyframes moveStars{
from{transform:translateY(0);}
to{transform:translateY(-2000px);}
}

/* CARD */

.card{
margin:80px auto;
width:70%;
background:rgba(255,255,255,0.08);
padding:40px;
border-radius:20px;
box-shadow:0 0 40px purple;

opacity:0;
transform:scale(0.7);
transition:all 1.2s ease;
}

/* WAND */

.wand{
font-size:70px;
animation:wandMove 1.5s infinite alternate;
}

@keyframes wandMove{
from{transform:rotate(-20deg);}
to{transform:rotate(20deg);}
}

/* SMOKE */

.smoke{
position:absolute;
width:15px;
height:15px;
background:rgba(255,255,255,0.5);
border-radius:50%;
animation:smokeRise 4s infinite;
}

@keyframes smokeRise{
0%{transform:translateY(0) scale(1);opacity:1;}
100%{transform:translateY(-300px) scale(3);opacity:0;}
}

</style>

</head>

<body>

<div class="stars"></div>

<div class="wand">🪄</div>

<div id="smokeContainer"></div>

<div class="card" id="resultCard">

<h1>🔮 ${title}</h1>

<h2>Step by Step</h2>

${steps}

<h2>✨ Final Answer = ${result}</h2>

<br>

<canvas id="graph"></canvas>

</div>

<script>

let smokeContainer=document.getElementById("smokeContainer");

for(let i=0;i<20;i++){

let s=document.createElement("div");
s.className="smoke";

s.style.left=Math.random()*window.innerWidth+"px";
s.style.bottom="0px";

s.style.animationDelay=(Math.random()*3)+"s";

smokeContainer.appendChild(s);

}

setTimeout(()=>{

document.getElementById("resultCard").style.opacity=1;
document.getElementById("resultCard").style.transform="scale(1)";

},2000);

let ctx=document.getElementById("graph");

if(ctx && ${JSON.stringify(xValues)}.length>0){

new Chart(ctx,{
type:"line",
data:{
labels:${JSON.stringify(xValues)},
datasets:[{
label:"Graph",
data:${JSON.stringify(yValues)},
borderWidth:3
}]
}
});

}

</script>

</body>

</html>

`);

}
function openResult(title,steps,result,xValues=[],yValues=[]){

let w = window.open("","_blank");

w.document.write(`

<html>

<head>

<title>Magical Result</title>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>

body{
margin:0;
font-family:Segoe UI;
color:white;
text-align:center;
background:radial-gradient(circle at center,#0b0033,#000);
overflow:hidden;
}

/* GALAXY BACKGROUND */

.stars{
position:fixed;
width:100%;
height:100%;
background-image: radial-gradient(white 1px, transparent 1px);
background-size:3px 3px;
animation:moveStars 120s linear infinite;
opacity:0.4;
}

@keyframes moveStars{
from{transform:translateY(0);}
to{transform:translateY(-2000px);}
}

/* RESULT CARD */

.card{
position:relative;
margin:100px auto;
width:70%;
background:rgba(255,255,255,0.08);
padding:40px;
border-radius:20px;
box-shadow:0 0 50px rgba(140,0,255,0.6);

opacity:0;
transform:translateY(60px) scale(0.9);
transition:all 1.5s ease;
}

/* WAND */

.wand{
position:absolute;
top:30px;
right:50px;
font-size:60px;
animation:wandCast 2s ease-in-out infinite alternate;
}

@keyframes wandCast{
0%{transform:rotate(-20deg);}
100%{transform:rotate(10deg);}
}

/* SMOKE */

.smoke{
position:fixed;
bottom:0;
width:20px;
height:20px;
background:rgba(255,255,255,0.5);
border-radius:50%;
filter:blur(3px);
animation:smokeRise 6s linear infinite;
}

@keyframes smokeRise{
0%{
transform:translateY(0) scale(1);
opacity:0.9;
}
100%{
transform:translateY(-600px) scale(4);
opacity:0;
}
}

/* SPARKLES */

.sparkle{
position:fixed;
width:4px;
height:4px;
background:white;
border-radius:50%;
animation:spark 2s infinite;
}

@keyframes spark{
0%{opacity:0}
50%{opacity:1}
100%{opacity:0}
}

</style>

</head>

<body>

<div class="stars"></div>

<div id="smokeContainer"></div>
<div id="sparkContainer"></div>

<div class="card" id="resultCard">

<div class="wand">🪄</div>

<h1>🔮 ${title}</h1>

<h2>Step by Step</h2>

${steps}

<h2>✨ Final Answer = ${result}</h2>

<br>

<canvas id="graph"></canvas>

</div>

<script>

/* SMOKE PARTICLES */

let smokeContainer=document.getElementById("smokeContainer");

for(let i=0;i<40;i++){

let s=document.createElement("div");
s.className="smoke";

s.style.left=Math.random()*window.innerWidth+"px";
s.style.animationDelay=(Math.random()*5)+"s";

smokeContainer.appendChild(s);

}

/* SPARKLES */

let sparkContainer=document.getElementById("sparkContainer");

for(let i=0;i<50;i++){

let sp=document.createElement("div");
sp.className="sparkle";

sp.style.left=Math.random()*window.innerWidth+"px";
sp.style.top=Math.random()*window.innerHeight+"px";
sp.style.animationDelay=(Math.random()*2)+"s";

sparkContainer.appendChild(sp);

}

/* CARD REVEAL */

setTimeout(()=>{

let card=document.getElementById("resultCard");
card.style.opacity=1;
card.style.transform="translateY(0) scale(1)";

},1500);

/* GRAPH */

let ctx=document.getElementById("graph");

if(ctx && ${JSON.stringify(xValues)}.length>0){

new Chart(ctx,{
type:"line",
data:{
labels:${JSON.stringify(xValues)},
datasets:[{
label:"Graph",
data:${JSON.stringify(yValues)},
borderWidth:3
}]
}
});

}

</script>

</body>

</html>

`);

}