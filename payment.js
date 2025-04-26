// Method Toggle
const cardBtn=document.getElementById('card-btn'), upiBtn=document.getElementById('upi-btn');
const cardPreview=document.getElementById('card-preview'), cardInner=document.getElementById('card-inner');
cardBtn.addEventListener('click',()=>{cardBtn.classList.add('active');upiBtn.classList.remove('active');cardPreview.classList.add('active');});
upiBtn.addEventListener('click',()=>{upiBtn.classList.add('active');cardBtn.classList.remove('active');cardPreview.classList.remove('active');});
// 3D tilt
cardPreview.addEventListener('mousemove',e=>{const r=cardPreview.getBoundingClientRect(),dx=(e.clientX-r.left-r.width/2)/(r.width/2),dy=(e.clientY-r.top-r.height/2)/(r.height/2);cardInner.style.transform=`rotateY(${dx*12}deg) rotateX(${-dy*12}deg)`;});
cardPreview.addEventListener('mouseleave',()=>cardInner.style.transform='rotateY(0) rotateX(0)');
// Flip CVV
const cvv=document.getElementById('cvv');cvv.addEventListener('focus',()=>cardInner.style.transform='rotateY(180deg)');cvv.addEventListener('blur',()=>cardInner.style.transform='rotateY(0)');
// Live updates
const preview={num:document.getElementById('preview-card-number'),exp:document.getElementById('preview-expiry'),nm:document.getElementById('preview-name'),cvv:document.getElementById('preview-cvv')};
document.getElementById('card-number').addEventListener('input',e=>{let v=e.target.value.replace(/\D/g,'').match(/.{1,4}/g)?.join(' ')||'';e.target.value=v;preview.num.innerText=v||'XXXX XXXX XXXX XXXX';});
document.getElementById('expiry-date').addEventListener('input',e=>{let v=e.target.value.replace(/\D/g,'');if(v.length>2)v=v.slice(0,2)+'/'+v.slice(2,4);e.target.value=v;preview.exp.innerText=v||'MM/YY';});
document.getElementById('name').addEventListener('input',e=>preview.nm.innerText=e.target.value||'Name');
cvv.addEventListener('input',e=>preview.cvv.innerText=e.target.value||'***');
// Submit & spinner
const form=document.getElementById('payment-form'),overlay=document.getElementById('overlay'),success=document.getElementById('success-popup'),spin=document.getElementById('spinner'),btnText=document.getElementById('button-text'),payBtn=document.getElementById('pay-button');
form.addEventListener('submit',e=>{e.preventDefault();spin.style.display='inline-block';btnText.innerText='Processing';payBtn.disabled=true;setTimeout(()=>{spin.style.display='none';btnText.innerText='Pay Now';payBtn.disabled=false;overlay.style.display='block';success.style.display='block';setTimeout(()=>{overlay.style.display='none';success.style.display='none';form.reset();['num','exp','nm','cvv'].forEach(k=>preview[k].innerText={'num':'XXXX XXXX XXXX XXXX','exp':'MM/YY','nm':'Name','cvv':'***'}[k]);cardInner.style.transform='rotateY(0) rotateX(0)';},3000);},5000);});