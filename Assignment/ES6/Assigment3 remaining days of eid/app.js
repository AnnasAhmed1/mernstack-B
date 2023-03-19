toDate=new Date()
fisrtEid=new Date("07/10/2022")
sisrtEid=new Date("07/11/2022")
tisrtEid=new Date("07/12/2022")

console.log(toDate)
console.log(fisrtEid)
console.log(fisrtEid-toDate)
console.log(fisrtEid.getDay()-toDate.getDay())
console.log(fisrtEid.getTime()-toDate.getTime())
console.log((fisrtEid-toDate)/1000+` seconds`)
console.log((fisrtEid-toDate)/(1000*60)+` minutes`)
console.log((fisrtEid-toDate)/(1000*60*60)+` hours`)
console.log((fisrtEid-toDate)/(1000*60*60*24)+` days`)


main=document.getElementById('main')

document.write(`


<h1> Remaining Days in Eid Ul Azha 2022</h1>
<h2> Time to First Eid</h2>
<p> ${fisrtEid.getTime()-toDate.getTime()} milliseconds</p>
<p> ${(fisrtEid-toDate)/(1000)} seconds</p>
<p> ${(fisrtEid-toDate)/(1000*60)} minutes</p>
<p> ${(fisrtEid-toDate)/(1000*60*60)} hours</p>
<p> ${(fisrtEid-toDate)/(1000*60*60*24)} days</p>
`)
document.write(`
<h2> Time to Second Eid</h2>

<p> ${sisrtEid.getTime()-toDate.getTime()} milliseconds</p>
<p> ${(sisrtEid-toDate)/(1000)} seconds</p>
<p> ${(sisrtEid-toDate)/(1000*60)} minutes</p>
<p> ${(sisrtEid-toDate)/(1000*60*60)} hours</p>
<p> ${(sisrtEid-toDate)/(1000*60*60*24)} days</p>
`)
document.write(`
<h2> Time to Third Eid</h2>
<p> ${tisrtEid.getTime()-toDate.getTime()} milliseconds</p>
<p> ${(tisrtEid-toDate)/(1000)} seconds</p>
<p> ${(tisrtEid-toDate)/(1000*60)} minutes</p>
<p> ${(tisrtEid-toDate)/(1000*60*60)} hours</p>
<p> ${(tisrtEid-toDate)/(1000*60*60*24)} days</p>
`)