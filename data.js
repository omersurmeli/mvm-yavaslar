'use strict';
window.MVM_DATA = {
  categories: [
    {name:'Boya & dekorasyon',filter:'Boya',image:'kategori-boya-dekorasyon.webp'},
    {name:'Tesisat & banyo',filter:'Tesisat',image:'kategori-tesisat.webp'},
    {name:'El aletleri',filter:'El aletleri',image:'kategori-el-aletleri.webp'},
    {name:'Elektrik',filter:'Elektrik',image:'kategori-elektrik.webp'},
    {name:'Yapı & yalıtım',filter:'Yapı & yalıtım',image:'kategori-yapi-malzemeleri.webp'},
    {name:'Bahçe & hırdavat',filter:'Bahçe & hırdavat',image:'kategori-bahce-hirdavat.webp'}
  ],
  products: [
    {id:'dyo-tavan',category:'Boya',name:'DYO Tavan Boyası',pack:'17,5 kg',brand:'DYO',image:'dyo-tavan-17-5kg.webp',desc:'İç mekân tavanlarına mat ve homojen bir görünüm.',campaign:true,paint:'dyo-tavan',facts:['Tavan yüzeyleri için mat boya','17,5 kg ambalaj','İki katta yaklaşık 3–5 m²/kg kaplama']},
    {id:'dyoplast',category:'Boya',name:'DYO Dyoplast Plastik',pack:'15 L',brand:'DYO',image:'dyoplast-15lt.webp',desc:'Duvarlarınız için mat görünümlü plastik iç cephe boyası.',campaign:true,paint:'dyoplast-plastik',facts:['İç cephe duvarlarında kullanım','15 litre ambalaj','Tek katta yaklaşık 12–16 m²/L kaplama']},
    {id:'dinamik',category:'Boya',name:'DYO Dinamik İpekmat',pack:'15 L',brand:'DYO',image:'dyo-dinamik-15lt.webp',desc:'Silikon katkılı, silinebilir, ipek mat iç cephe boyası.',campaign:true,paint:'dinamik-ipekmat',facts:['İpek mat görünüm','15 litre ambalaj','Tek katta yaklaşık 14–18 m²/L kaplama']},
    {id:'dyoflex',category:'Yapı & yalıtım',name:'DYO Dyoflex Elyaflı',pack:'20 kg',brand:'DYO',image:'dyoflex-elyafli-20kg.webp',desc:'Çatı yalıtımında elyaf katkılı, elastik çözüm.',campaign:true,facts:['Elyaf katkılı sıvı çatı izolasyonu','20 kg ambalaj','Yüzeye uygun uygulama koşullarını mağazamıza danışın']},
    {id:'isonem-l',category:'Yapı & yalıtım',name:'İSONEM L Şeffaf Güç',pack:'Ambalajı sorun',brand:'İSONEM',image:'isonem-l-seffaf-guc.webp',desc:'Yüzey görünümünü koruyan şeffaf su yalıtım çözümü.',facts:['Şeffaf su yalıtım ürünü','Farklı yüzeyler için seçenek','Ambalaj ve yüzey uygunluğunu mağazamızdan teyit edin']},
    {id:'jelbeton',category:'Yapı & yalıtım',name:'İSONEM Jelbeton',pack:'20 kg',brand:'İSONEM',image:'isonem-jelbeton.webp',desc:'İç ve dış mekânlar için dekoratif zemin kaplaması.',facts:['Dekoratif zemin uygulamaları','20 kg ambalaj','Renk ve uygulama seçeneğini mağazamıza danışın']},
    {id:'batarya',category:'Tesisat',name:'Musluk & batarya',pack:'Ürün grubu',brand:'CMS · Kale · Artema',image:'kategori-tesisat.webp',desc:'Mutfak ve banyolara uygun batarya ve bağlantı ürünleri.',group:true,facts:['Mutfak ve banyo seçenekleri','Ölçü ve model bilgisiyle fiyat sorun','Ürün ve marka stokları mağazadan teyit edilir']},
    {id:'el-aletleri',category:'El aletleri',name:'El aletleri & ölçüm',pack:'Ürün grubu',brand:'Mağaza seçkisi',image:'kategori-el-aletleri.webp',desc:'Pense, tornavida, çekiç ve ölçüm ekipmanları.',group:true,facts:['Tamir ve montaj ihtiyaçları','İhtiyacınıza uygun ürün seçimi','Marka, ölçü ve stok için iletişime geçin']},
    {id:'elektrik',category:'Elektrik',name:'Priz, anahtar & kablo',pack:'Ürün grubu',brand:'Mağaza seçkisi',image:'kategori-elektrik.webp',desc:'Ev ve iş yerleri için elektrik tesisatı malzemeleri.',group:true,facts:['Priz, anahtar ve kablo çeşitleri','Model ve teknik bilgilerinizi iletin','Uygun ürün için mağazamıza danışın']},
    {id:'boya-yardimci',category:'Boya',name:'Boya yardımcıları',pack:'Ürün grubu',brand:'Mağaza seçkisi',image:'kategori-boya-dekorasyon.webp',desc:'Fırça, rulo, maskeleme bandı ve boya ekipmanları.',group:true,facts:['Yüzeye uygun fırça ve rulo seçimi','Maskeleme ve uygulama yardımcıları','İşinize uygun seçenekleri birlikte belirleyelim']},
    {id:'boru',category:'Tesisat',name:'Boru & bağlantı parçaları',pack:'Ürün grubu',brand:'Kalde',image:'kategori-tesisat.webp',desc:'Tesisat işleri için boru, dirsek, te ve vana çeşitleri.',group:true,facts:['Boru ve bağlantı elemanları','Çap, ölçü ve adet belirterek fiyat sorun','Stok ve teknik uygunluk teyidi gerekir']},
    {id:'kimyasal',category:'Yapı & yalıtım',name:'Yapı kimyasalları',pack:'Ürün grubu',brand:'Henkel · SIBAX',image:'kategori-yapi-malzemeleri.webp',desc:'Silikon, mastik, yapıştırıcı ve montaj çözümleri.',group:true,facts:['Yapıştırma ve derz uygulamaları','İç ve dış mekân ihtiyaçları','Yüzeyinize uygun ürünü mağazamıza danışın']},
    {id:'sarjli',category:'El aletleri',name:'Elektrikli el aletleri',pack:'Ürün grubu',brand:'Mağaza seçkisi',image:'store-products-v2.webp',desc:'Delme, vidalama ve atölye işleri için ekipmanlar.',group:true,facts:['Elektrikli ve şarjlı alet seçenekleri','İşinize uygun kapasite ve model','Güncel marka ve stok bilgisini sorun']},
    {id:'bahce',category:'Bahçe & hırdavat',name:'Bahçe & sulama',pack:'Ürün grubu',brand:'Mağaza seçkisi',image:'kategori-bahce-hirdavat.webp',desc:'Bahçe bakımı ve sulama işleri için pratik yardımcılar.',group:true,facts:['Sulama ve bakım ekipmanları','Günlük bahçe işleri için yardımcılar','Hortum ölçüsü ve ihtiyacınızı iletin']}
  ],
  brands: [
    ['DYO','Boya ürünleri','https://www.dyo.com.tr/','dyo'],
    ['Bianca','Boya ürünleri','https://www.bianca.com.tr/','bianca'],
    ['İSONEM','Yalıtım çözümleri','https://isonem.com.tr/','isonem'],
    ['Kalde','Boru sistemleri','https://kalde.com/','kalde'],
    ['CMS','Batarya grubu','https://www.curkuslar.com.tr/','cms'],
    ['Kale','Batarya ve vitrifiye','https://www.kale.com.tr/','kale'],
    ['VitrA','Banyo ürünleri','https://www.vitra.com.tr/','vitra'],
    ['Artema','Armatür ve batarya','https://www.artema.com.tr/','artema'],
    ['SIBAX','Yapı ürünleri','https://www.sibakimya.com.tr/','sibax'],
    ['Henkel','Yapıştırıcı ve kimyasallar','https://www.henkel-adhesives.com/tr/tr.html','henkel']
  ]
};
window.MVM_PAINTS = [
  {id:'dinamik-mat',category:'İç cephe',name:'DYO Dinamik Mat',unit:'L',packs:[2.5,7.5,15],coverage:[14,18],slug:'ic-cephe-urunler/dinamik-mat'},
  {id:'dinamik-ipekmat',category:'İç cephe',name:'DYO Dinamik İpekmat',unit:'L',packs:[2.5,7.5,15],coverage:[14,18],slug:'ic-cephe-urunler/dinamik'},
  {id:'dinamik-soft-mat',category:'İç cephe',name:'DYO Dinamik Soft Mat',unit:'L',packs:[2.5,7.5,15],coverage:[12,16],slug:'ic-cephe-urunler/dinamik-soft-mat'},
  {id:'dyojen',category:'İç cephe',name:'DYO Dyojen',unit:'L',packs:[2.5,15],coverage:[14,18],slug:'ic-cephe-urunler/dyojen'},
  {id:'oxymax',category:'İç cephe',name:'DYO Oxymax',unit:'L',packs:[2.5,15],coverage:[14,18],slug:'ic-cephe-urunler/oxymax'},
  {id:'nanoipekmat',category:'İç cephe',name:'DYO Nanoipekmat',unit:'L',packs:[2.5,7.5,15],coverage:[14,18],slug:'ic-cephe-urunler/nano-ipekmat'},
  {id:'teknoplast',category:'İç cephe',name:'DYO Teknoplast',unit:'L',packs:[2.5,7.5,15],coverage:[14,18],slug:'ic-cephe-urunler/teknoplast-yeni'},
  {id:'dyoplast-silikonlu',category:'İç cephe',name:'DYO Dyoplast Silikonlu',unit:'L',packs:[2.5,7.5,15],coverage:[13,17],slug:'ic-cephe-urunler/dyoplast-silikonlu'},
  {id:'dyoplast-plastik',category:'İç cephe',name:'DYO Dyoplast Plastik',unit:'L',packs:[2.5,7.5,15],coverage:[12,16],slug:'ic-cephe-urunler/dyoplast-plastik'},
  {id:'dyo-tavan',category:'Tavan',name:'DYO Tavan',unit:'kg',packs:[3.5,10,17.5,20],coverage:[3,5],baseCoats:2,slug:'ic-cephe-urunler/dyo-tavan-boyasi'},
  {id:'akromax-suprema-ipek',category:'Dış cephe',name:'DYO Akromax Suprema İpek Mat',unit:'L',packs:[2.5,13.5,15],coverage:[8,13],alternate:[8,11],primers:['filler','binder','alkali'],slug:'dis-cephe-urunler/akromax-suprema'},
  {id:'akromax-suprema-mat',category:'Dış cephe',name:'DYO Akromax Suprema Mat',unit:'L',packs:[2.5,13.5,15],coverage:[8,13],slug:'dis-cephe-urunler/akromax-suprema-mat'},
  {id:'akromax',category:'Dış cephe',name:'DYO Akromax',unit:'L',packs:[2.5,15],coverage:[8,13],alternate:[8,11],primers:['filler','binder'],slug:'dis-cephe-urunler/akromax'},
  {id:'teknotex',category:'Dış cephe',name:'DYO Teknotex',unit:'L',packs:[2.5,7.5,15],coverage:[8.5,10],alternate:[7,8.5],primers:['filler','binder'],slug:'dis-cephe-urunler/teknotex'},
  {id:'dinamik-dis',category:'Dış cephe',name:'DYO Dinamik Dış Cephe',unit:'L',packs:[2.5,7.5,15],coverage:[7,10],alternate:[8,8],primers:['filler','binder'],slug:'dis-cephe-urunler/dinamik-dis-cephe'}
];
