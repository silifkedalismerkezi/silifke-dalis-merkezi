
fetch('/site.json').then(r=>r.json()).then(data=>{
  const phoneDigits = (data.phone||'').replace(/\D/g,'');
  const centerWa = phoneDigits ? `https://wa.me/90${phoneDigits.startsWith('0')?phoneDigits.slice(1):phoneDigits}` : '#';
  document.querySelectorAll('#sitePhoneLink').forEach(a=>{a.textContent=data.phone||'—'; a.href=centerWa});
  document.querySelectorAll('#siteEmailLink').forEach(a=>{a.textContent=data.email||'—'; a.href=data.email?`mailto:${data.email}`:'#'});
  const addr=document.getElementById('siteAddress'); if(addr) addr.textContent=data.address||'—';
  const ig=document.getElementById('smInstagram'); if(ig && data.social?.instagram) ig.href=data.social.instagram;
  const fb=document.getElementById('smFacebook'); if(fb && data.social?.facebook) fb.href=data.social.facebook;
  const yt=document.getElementById('smYouTube'); if(yt && data.social?.youtube) yt.href=data.social.youtube;
});

const form=document.getElementById('waForm');
if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name=document.getElementById('name').value.trim();
    const phone=document.getElementById('phone').value.trim();
    const msg=document.getElementById('message').value.trim()||'Merhaba, dalış eğitimi/tur hakkında bilgi almak istiyorum.';
    const conf=await (await fetch('/site.json')).json();
    const digits=(conf.phone||'').replace(/\D/g,'');
    const wa=digits?`https://wa.me/90${digits.startsWith('0')?digits.slice(1):digits}`:'#';
    const text=`Merhaba, ben ${name}.\nTelefonum: ${phone}\n\n${msg}`;
    window.open(`${wa}?text=${encodeURIComponent(text)}`,'_blank');
  });
}
