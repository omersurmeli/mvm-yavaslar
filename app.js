'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const {products, categories, brands} = window.MVM_DATA;
  const paints = window.MVM_PAINTS;
  const format = (value, digits = 1) => new Intl.NumberFormat('tr-TR', {maximumFractionDigits:digits}).format(value);
  const money = value => new Intl.NumberFormat('tr-TR', {style:'currency',currency:'TRY',maximumFractionDigits:2}).format(value);
  const wa = text => 'https://wa.me/905389705265?text=' + encodeURIComponent(text);
  const normalize = value => String(value).toLocaleLowerCase('tr-TR').replace(/ı/g,'i').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  $('year').textContent = new Date().getFullYear();

  const menu = $('menu-button'), nav = $('main-nav');
  const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); };
  menu.addEventListener('click', () => {const open = nav.classList.toggle('open');menu.setAttribute('aria-expanded', String(open));});
  nav.addEventListener('click', event => {if(event.target.closest('a')) closeMenu();});
  document.addEventListener('keydown', event => {if(event.key === 'Escape' && nav.classList.contains('open')) {closeMenu();menu.focus();}});

  let toastTimer;
  function toast(message) {clearTimeout(toastTimer);$('toast').textContent=message;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,3200);}
  const storageKey='mvm-request-list-v2';
  function readList() {try {const saved=JSON.parse(localStorage.getItem(storageKey)||'[]');return Array.isArray(saved)?saved.filter(row=>row&&products.some(p=>p.id===row.id)&&Number.isInteger(row.quantity)&&row.quantity>0&&row.quantity<=999):[];}catch{return [];}}
  let list=readList();
  function saveList(){try{localStorage.setItem(storageKey,JSON.stringify(list));}catch{}updateCount();updateList();}
  function updateCount(){const count=list.reduce((sum,row)=>sum+row.quantity,0);$('list-count').textContent=count;$('mobile-count').textContent=count;$('list-trigger').setAttribute('aria-label',`Talep listem, ${count} adet ürün`);}
  function addProduct(id, amount=1){const p=products.find(item=>item.id===id);if(!p)return;const row=list.find(item=>item.id===id);if(row)row.quantity=Math.min(999,row.quantity+amount);else list.push({id,quantity:amount});saveList();toast(`${p.name} talep listenize eklendi.`);}
  function updateListLink(){const rows=list.map(row=>{const p=products.find(item=>item.id===row.id);return `• ${p.name} (${p.pack}) — ${row.quantity} adet`;});const note=$('list-note').value.trim();$('list-whatsapp').href=wa('Merhaba MVM Yavaşlar, aşağıdaki ürünler için güncel fiyat ve stok bilgisi almak istiyorum:\n\n'+rows.join('\n')+(note?'\n\nNot: '+note:'')+'\n\nMağazadan teslim için bilgi rica ederim.');}
  function updateList(){const root=$('list-items');if(!list.length){root.innerHTML='<div class="list-empty"><h3>Listeniz henüz boş.</h3><p>Ürünlerdeki + düğmesiyle ihtiyacınız olanları ekleyin.</p><button type="button" class="button primary" id="list-explore">Ürünleri keşfet →</button></div>';$('list-footer').hidden=true;$('list-explore').addEventListener('click',()=>{$('list-dialog').close();$('urunler').scrollIntoView();});return;}
    $('list-footer').hidden=false;
    root.innerHTML=list.map(row=>{const p=products.find(item=>item.id===row.id);return `<article class="list-item"><img src="assets/${p.image}" alt="" width="55" height="65"><div><h3>${p.name}</h3><small>${p.pack}</small><div class="list-item-controls"><div class="quantity"><button type="button" data-quantity="${p.id}" data-delta="-1" aria-label="${p.name} miktarını azalt">−</button><input type="number" min="1" max="999" value="${row.quantity}" data-list-input="${p.id}" aria-label="${p.name} adet"><button type="button" data-quantity="${p.id}" data-delta="1" aria-label="${p.name} miktarını artır">+</button></div><button class="remove-item" type="button" data-remove="${p.id}">Kaldır ×</button></div></div></article>`;}).join('');
    updateListLink();
  }
  $('list-note').addEventListener('input',updateListLink);
  $('list-items').addEventListener('click',event=>{const remove=event.target.closest('[data-remove]');const qty=event.target.closest('[data-quantity]');if(remove){list=list.filter(row=>row.id!==remove.dataset.remove);saveList();}else if(qty){const id=qty.dataset.quantity;const row=list.find(item=>item.id===id);if(row){row.quantity=Math.max(1,Math.min(999,row.quantity+Number(qty.dataset.delta)));saveList();const replacement=$('list-items').querySelector(`[data-quantity="${id}"][data-delta="${qty.dataset.delta}"]`);replacement?.focus();}}});
  $('list-items').addEventListener('change',event=>{if(!event.target.matches('[data-list-input]'))return;const row=list.find(item=>item.id===event.target.dataset.listInput);if(row){row.quantity=Math.max(1,Math.min(999,Math.round(Number(event.target.value)||1)));saveList();}});
  $('clear-list').addEventListener('click',()=>{list=[];$('list-note').value='';saveList();});
  const openList=()=>{updateList();$('list-dialog').showModal();};
  ['list-trigger','catalog-list-button','mobile-list'].forEach(id=>$(id).addEventListener('click',openList));
  document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});});
  window.addEventListener('storage',event=>{if(event.key===storageKey){list=readList();updateCount();updateList();}});

  function card(p,campaign=false){return `<article class="product-card" data-product-id="${p.id}"><button type="button" class="product-image ${p.group?'group-img':''}" data-detail="${p.id}" aria-label="${p.name} ürününü incele"><img src="assets/${p.image}" width="480" height="360" alt="${p.name}" loading="lazy">${campaign?'<span class="badge campaign">Kampanya bilgisi</span>':p.group?'<span class="badge">Ürün grubu</span>':''}</button><div class="product-body"><div class="product-brand"><span>${p.brand}</span><span>${p.pack}</span></div><h3><button type="button" data-detail="${p.id}">${p.name}</button></h3><p class="product-desc">${p.desc}</p><div class="product-price">${campaign?'Kampanyalı fiyatı sorun':'Güncel fiyatı sorun'}<small>Stok ve fiyat teyidi mağazamızdan</small></div><div class="product-buttons"><a class="button outline" href="${wa('Merhaba, '+p.name+' ('+p.pack+') için '+(campaign?'kampanya koşulları, fiyat ve stok':'fiyat ve stok')+' bilgisi alabilir miyim?')}" target="_blank" rel="noopener">Fiyat & stok sor ↗</a><button class="add-button" type="button" data-add="${p.id}" aria-label="${p.name} talep listesine ekle">+</button></div></div></article>`;}
  $('campaign-grid').innerHTML=products.filter(p=>p.campaign).map(p=>card(p,true)).join('');
  $('category-grid').innerHTML=categories.map(c=>`<button type="button" class="category-card" data-category="${c.filter}"><div class="category-image"><img src="assets/${c.image}" width="300" height="220" alt="" loading="lazy"></div><span>${c.name}<i>↗</i></span></button>`).join('');
  $('brand-grid').innerHTML=brands.map(([name,type,url,cls])=>`<a class="brand-card" href="${url}" target="_blank" rel="noopener" aria-label="${name} resmî web sitesi"><span class="brand-name brand-${cls}">${name}</span><small>${type} ↗</small></a>`).join('');
  let activeCategory='Tümü',query='',expanded=false;
  const groups=['Tümü',...categories.map(c=>c.filter)];
  $('filters').innerHTML=groups.map((g,i)=>`<button type="button" data-filter="${g}" aria-pressed="${!i}" class="${i?'':'active'}">${g}</button>`).join('');
  function drawProducts(){let visible=products.filter(p=>(activeCategory==='Tümü'||p.category===activeCategory)&&normalize([p.name,p.brand,p.desc,p.pack,p.category].join(' ')).includes(normalize(query.trim())));const sort=$('sort').value;if(sort==='az')visible.sort((a,b)=>a.name.localeCompare(b.name,'tr'));if(sort==='za')visible.sort((a,b)=>b.name.localeCompare(a.name,'tr'));const shouldLimit=!expanded&&!query&&activeCategory==='Tümü';$('product-grid').innerHTML=(shouldLimit?visible.slice(0,8):visible).map(p=>card(p)).join('');$('show-more').hidden=!shouldLimit||visible.length<=8;$('empty-results').hidden=visible.length!==0;$('result-count').textContent=query?`“${query}” için ${visible.length} sonuç`:`${visible.length} ürün ve ürün grubu${shouldLimit?' · İlk 8 ürün gösteriliyor':''}`;$('reset-filters').hidden=!query&&activeCategory==='Tümü';$('empty-whatsapp').href=wa('Merhaba, '+query+' ürününü arıyorum. Yardımcı olabilir misiniz?');document.querySelectorAll('[data-filter]').forEach(button=>{const active=button.dataset.filter===activeCategory;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});}
  $('filters').addEventListener('click',event=>{const button=event.target.closest('[data-filter]');if(button){activeCategory=button.dataset.filter;expanded=true;drawProducts();}});
  $('category-grid').addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(button){activeCategory=button.dataset.category;query='';$('search-input').value='';expanded=true;drawProducts();$('urunler').scrollIntoView();}});
  $('search-form').addEventListener('submit',event=>{event.preventDefault();query=$('search-input').value.slice(0,150);activeCategory='Tümü';expanded=true;drawProducts();$('urunler').scrollIntoView();});
  $('search-input').addEventListener('input',()=>{query=$('search-input').value.slice(0,150);activeCategory='Tümü';drawProducts();});
  $('reset-filters').addEventListener('click',()=>{query='';activeCategory='Tümü';expanded=false;$('search-input').value='';drawProducts();});
  $('sort').addEventListener('change',drawProducts);
  $('show-more').addEventListener('click',()=>{expanded=true;drawProducts();});
  function openDetail(id){const p=products.find(item=>item.id===id);if(!p)return;$('product-detail').innerHTML=`<div class="detail-layout"><div class="detail-image"><img src="assets/${p.image}" alt="${p.name}" width="350" height="350"></div><div class="detail-copy"><p class="eyebrow">${p.brand} · ${p.category}</p><h2 id="product-dialog-title">${p.name}</h2><p>${p.desc}</p><div class="detail-meta"><span>${p.pack}</span><span>Mağazadan teslim</span></div><ul>${p.facts.map(f=>`<li>${f}</li>`).join('')}</ul><p>Renk, model, uygunluk, kampanya koşulları ve güncel stok için mağazamıza danışın.</p><div class="detail-actions"><button type="button" class="button primary" data-add="${p.id}">Talep listeme ekle +</button><a class="button outline" href="${wa('Merhaba, '+p.name+' ('+p.pack+') için fiyat ve stok bilgisi almak istiyorum.')}" target="_blank" rel="noopener">Fiyat sor ↗</a></div>${p.paint?`<button class="detail-calc" data-paint="${p.paint}" type="button">Bu ürünle boya miktarını hesapla →</button>`:''}</div></div>`;$('product-dialog').showModal();}
  document.addEventListener('click',event=>{const add=event.target.closest('[data-add]');if(add){addProduct(add.dataset.add);return;}const detail=event.target.closest('[data-detail]');if(detail){openDetail(detail.dataset.detail);return;}const paint=event.target.closest('[data-paint]');if(paint){$('paint-product').value=paint.dataset.paint;selectPaint();$('product-dialog').close();$('boya-hesaplayici').scrollIntoView();}});
  drawProducts();updateCount();updateList();

  const calculatePaint=window.MVM_CALCULATOR.calculate;
  const optGroups=[...new Set(paints.map(p=>p.category))];
  $('paint-product').innerHTML=optGroups.map(g=>`<optgroup label="${g}">${paints.filter(p=>p.category===g).map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</optgroup>`).join('')+'<option value="custom">Diğer ürün — kendi bilgimle hesapla</option>';
  const readNumber=id=>{const v=$(id).value.trim();if(v==='')return null;const n=Number(v.replace(',','.'));return Number.isFinite(n)?n:null;};
  let areaMode='direct',lastPaintResult=null;
  const currentPaint=()=>paints.find(p=>p.id===$('paint-product').value);
  function selectPaint(){const p=currentPaint(),custom=!p;$('custom-product-fields').hidden=!custom;$('custom-pack').hidden=!custom;$('paint-pack').hidden=custom;$('paint-surface').disabled=custom;$('paint-coats').disabled=Boolean(p?.baseCoats===2);$('paint-coats').value='2';$('paint-price').value='';$('primer-field').hidden=!p?.primers;
    if(p){$('paint-pack').innerHTML=p.packs.map(pack=>`<option value="${pack}" ${pack===(p.unit==='kg'?17.5:15)?'selected':''}>${format(pack)} ${p.unit}</option>`).join('');$('paint-source').href='https://dekoratif.dyo.com.tr/urunler/'+p.slug;$('paint-source').hidden=false;if(p.primers){const names={filler:'Teknotex Dolgulu Astar',binder:'Dyobinder',alkali:'Alkali Dayanımlı Astar'};$('paint-primer').innerHTML=p.primers.map(id=>`<option value="${id}">${names[id]}</option>`).join('');}}else{$('paint-source').hidden=true;}updatePaint();
  }
  function getArea(){if(areaMode==='direct'){const area=readNumber('paint-area');if(area===null||area<=0||area>100000)return{error:'Boyanacak alanı 0’dan büyük ve en fazla 100.000 m² olarak girin.'};return{area};}
    const width=readNumber('room-width'),length=readNumber('room-length'),height=readNumber('room-height'),scope=$('room-scope').value;
    if(width===null||length===null||width<=0||length<=0||width>1000||length>1000||(scope!=='ceiling'&&(height===null||height<=0||height>100)))return{error:'Geçerli oda ölçülerini girin. En ve boy 0–1.000 m, yükseklik 0–100 m aralığında olmalıdır.'};
    $('room-height').disabled=scope==='ceiling';$('room-openings').disabled=scope==='ceiling';
    const gross=2*(width+length)*(height||0),openings=scope==='ceiling'?0:readNumber('room-openings');
    if(openings===null||openings<0||openings>gross)return{error:'Kapı ve pencere alanı, 0 ile toplam duvar alanı arasında olmalıdır.'};
    const area=(scope!=='ceiling'?gross-openings:0)+(scope!=='walls'?width*length:0);
    if(area<=0||area>100000)return{error:'Net yüzey alanı 0’dan büyük ve en fazla 100.000 m² olmalıdır.'};
    $('room-area-summary').textContent=`Net boyanacak alan: ${format(area,2)} m²${scope!=='ceiling'?' · Kapı ve pencereler düşüldü.':''}`;return{area};
  }
  function updatePaint(){const p=currentPaint(),unit=p?.unit||$('custom-unit').value;const areaResult=getArea();const pack=readNumber(p?'paint-pack':'custom-pack');let range=p?.coverage||[readNumber('custom-coverage'),readNumber('custom-coverage')];if(p?.alternate&&$('paint-primer').value!=='filler')range=p.alternate;const coverage=$('paint-surface').value==='min'?range[0]:$('paint-surface').value==='max'?range[1]:(range[0]+range[1])/2;
    const price=readNumber('paint-price'),priceRaw=$('paint-price').value.trim(),coats=Number($('paint-coats').value),waste=Number($('paint-waste').value);let error=areaResult.error;
    if(!pack||pack<=0||pack>1000)error='Geçerli bir ambalaj miktarı girin (0–1.000).';
    if(!coverage||coverage<=0||coverage>1000)error='Ambalaj üzerindeki tek kat kaplama değerini girin (m² / birim).';
    if(priceRaw!==''&&(price===null||price<0||price>10000000))error='Kova fiyatını 0 ile 10.000.000 TL arasında girin.';
    const info=p?`DYO sarfiyatı: ${p.baseCoats===2?'iki katta':'tek katta'} ${format(range[0])}${range[1]!==range[0]?'–'+format(range[1]):''} m² / ${unit}. Seçilen: ${format(coverage)} m² / ${unit}.`:`Kullanıcı tanımlı tek kat kaplama değeri: ${coverage?format(coverage):'—'} m² / ${unit}.`;
    $('coverage-info').textContent=info;$('paint-error').hidden=!error;$('paint-error').textContent=error||'';
    const result=error?null:calculatePaint({area:areaResult.area,coats,coverage,baseCoats:p?.baseCoats||1,waste,pack,price});
    lastPaintResult=result;
    if(!result){['result-buckets','result-need','result-buy','result-leftover','result-total'].forEach(id=>$(id).textContent='—');$('result-area').textContent='Geçerli bilgileri girin.';$('result-unit-cost').textContent='Hesap için alan ve ürün bilgilerini kontrol edin.';$('paint-whatsapp').removeAttribute('href');$('paint-whatsapp').setAttribute('aria-disabled','true');return;}
    const name=p?.name||'Kullanıcı tanımlı boya';$('result-buckets').textContent=format(result.buckets,0);$('result-product').textContent=`${name} · ${format(pack)} ${unit}`;$('result-area').textContent=`${format(areaResult.area,2)} m² yüzey · ${coats} kat · %${waste} fire`;$('result-need').textContent=format(result.needed,2)+' '+unit;$('result-buy').textContent=format(result.purchased,2)+' '+unit;$('result-leftover').textContent=format(result.leftover,2)+' '+unit;$('result-total').textContent=result.total===null?'Fiyat girin':money(result.total);$('result-unit-cost').textContent=result.total===null?'Maliyeti görmek için kova fiyatını yazın.':`Yüzey m² başına ${money(result.total/areaResult.area)} · Girilen kova fiyatıyla`;
    const details=`${name}\nNet alan: ${format(areaResult.area,2)} m²\nUygulama: ${coats} kat, %${waste} fire\nKaplama: ${format(coverage)} m²/${unit} (${p?.baseCoats===2?'iki kat':'tek kat'})\nGereken boya: ${format(result.needed,2)} ${unit}\nAmbalaj: ${format(pack)} ${unit}\nAlınacak: ${result.buckets} kova (${format(result.purchased)} ${unit})`+(result.total===null?'':`\nGirdiğim kova fiyatı: ${money(price)}\nTahmini boya maliyeti: ${money(result.total)}`);
    $('paint-whatsapp').href=wa('Merhaba MVM Yavaşlar, boya hesabım için fiyat ve uygunluk bilgisi alabilir miyim?\n\n'+details);$('paint-whatsapp').removeAttribute('aria-disabled');
  }
  $('paint-whatsapp').addEventListener('click',event=>{if(!lastPaintResult)event.preventDefault();});
  $('paint-product').addEventListener('change',selectPaint);
  $('paint-pack').addEventListener('change',()=>{$('paint-price').value='';updatePaint();});
  $('paint-form').addEventListener('submit',event=>event.preventDefault());
  $('paint-form').addEventListener('input',updatePaint);
  $('paint-form').addEventListener('change',updatePaint);
  document.querySelectorAll('[data-area-mode]').forEach(button=>button.addEventListener('click',()=>{areaMode=button.dataset.areaMode;document.querySelectorAll('[data-area-mode]').forEach(b=>{const active=b.dataset.areaMode===areaMode;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});$('direct-area').hidden=areaMode!=='direct';$('room-area').hidden=areaMode!=='room';updatePaint();}));
  $('paint-reset').addEventListener('click',()=>{$('paint-form').reset();$('paint-product').value='dinamik-mat';document.querySelector('[data-area-mode="direct"]').click();selectPaint();});
  selectPaint();
})();
