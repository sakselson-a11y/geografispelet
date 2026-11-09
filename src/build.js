const d3=require("d3-geo"), topo=require("topojson-client"), fs=require("fs");
const t=require("world-atlas/countries-50m.json");
const G=t.objects.countries.geometries;
const merges={"Cyprus":["N. Cyprus"],"Somalia":["Somaliland"],"Finland":["Åland"],"India":["Siachen Glacier"]};
const drop=new Set(Object.values(merges).flat().concat(["Antarctica"]));
const feats=[];
for(const g of G){const n=g.properties.name; if(drop.has(n))continue;
  const geom=merges[n]?topo.merge(t,G.filter(x=>x.properties.name===n||merges[n].includes(x.properties.name))):topo.feature(t,g).geometry;
  feats.push({type:"Feature",id:g.id,properties:{name:n},geometry:geom});}
const C={
 europa:{name:"Europa",rot:[-14,0],par:[40,64],pts:[[-24,63],[-10,35.5],[34,34.5],[50,62],[30,71.2],[45,40]],fix:{"Russia":[40,57],"Norway":[9.5,61.5]},
 c:{"Albania":"Albanien","Andorra":"Andorra","Austria":"Österrike","Belarus":"Belarus","Belgium":"Belgien","Bosnia and Herz.":"Bosnien och Hercegovina","Bulgaria":"Bulgarien","Croatia":"Kroatien","Cyprus":"Cypern","Czechia":"Tjeckien","Denmark":"Danmark","Estonia":"Estland","Finland":"Finland","France":"Frankrike","Germany":"Tyskland","Greece":"Grekland","Hungary":"Ungern","Iceland":"Island","Ireland":"Irland","Italy":"Italien","Kosovo":"Kosovo","Latvia":"Lettland","Liechtenstein":"Liechtenstein","Lithuania":"Litauen","Luxembourg":"Luxemburg","Malta":"Malta","Moldova":"Moldavien","Monaco":"Monaco","Montenegro":"Montenegro","Netherlands":"Nederländerna","Macedonia":"Nordmakedonien","Norway":"Norge","Poland":"Polen","Portugal":"Portugal","Romania":"Rumänien","Russia":"Ryssland","San Marino":"San Marino","Serbia":"Serbien","Slovakia":"Slovakien","Slovenia":"Slovenien","Spain":"Spanien","Sweden":"Sverige","Switzerland":"Schweiz","Ukraine":"Ukraina","United Kingdom":"Storbritannien","Vatican":"Vatikanstaten"}},
 afrika:{name:"Afrika",rot:[-18,0],par:[-20,20],pts:[[-25.5,17],[-18,28],[11,37.5],[34,31.5],[43,12],[58,-20.5],[51.5,11.5],[20,-35],[55.5,-4.5]],fix:{},
 c:{"Algeria":"Algeriet","Angola":"Angola","Benin":"Benin","Botswana":"Botswana","Burkina Faso":"Burkina Faso","Burundi":"Burundi","Cabo Verde":"Kap Verde","Cameroon":"Kamerun","Central African Rep.":"Centralafrikanska republiken","Chad":"Tchad","Comoros":"Komorerna","Congo":"Kongo-Brazzaville","Dem. Rep. Congo":"Kongo-Kinshasa","Côte d'Ivoire":"Elfenbenskusten","Djibouti":"Djibouti","Egypt":"Egypten","Eq. Guinea":"Ekvatorialguinea","Eritrea":"Eritrea","eSwatini":"Eswatini","Ethiopia":"Etiopien","Gabon":"Gabon","Gambia":"Gambia","Ghana":"Ghana","Guinea":"Guinea","Guinea-Bissau":"Guinea-Bissau","Kenya":"Kenya","Lesotho":"Lesotho","Liberia":"Liberia","Libya":"Libyen","Madagascar":"Madagaskar","Malawi":"Malawi","Mali":"Mali","Mauritania":"Mauretanien","Mauritius":"Mauritius","Morocco":"Marocko","Mozambique":"Moçambique","Namibia":"Namibia","Niger":"Niger","Nigeria":"Nigeria","Rwanda":"Rwanda","São Tomé and Principe":"São Tomé och Príncipe","Senegal":"Senegal","Seychelles":"Seychellerna","Sierra Leone":"Sierra Leone","Somalia":"Somalia","South Africa":"Sydafrika","S. Sudan":"Sydsudan","Sudan":"Sudan","Tanzania":"Tanzania","Togo":"Togo","Tunisia":"Tunisien","Uganda":"Uganda","Zambia":"Zambia","Zimbabwe":"Zimbabwe"}},
 asien:{name:"Asien",rot:[-88,0],par:[10,45],pts:[[26,41],[35,30],[43,12.5],[60,22],[73,-1],[95,-11],[141,-9],[146,44],[130,52],[80,55],[50,52]],fix:{"Malaysia":[102,4],"Indonesia":[114,-1],"Japan":[138.5,36.5],"Philippines":[122,12.5]},
 c:{"Afghanistan":"Afghanistan","Armenia":"Armenien","Azerbaijan":"Azerbajdzjan","Bahrain":"Bahrain","Bangladesh":"Bangladesh","Bhutan":"Bhutan","Brunei":"Brunei","Cambodia":"Kambodja","China":"Kina","Georgia":"Georgien","India":"Indien","Indonesia":"Indonesien","Iran":"Iran","Iraq":"Irak","Israel":"Israel","Japan":"Japan","Jordan":"Jordanien","Kazakhstan":"Kazakstan","Kuwait":"Kuwait","Kyrgyzstan":"Kirgizistan","Laos":"Laos","Lebanon":"Libanon","Malaysia":"Malaysia","Maldives":"Maldiverna","Mongolia":"Mongoliet","Myanmar":"Myanmar","Nepal":"Nepal","North Korea":"Nordkorea","Oman":"Oman","Pakistan":"Pakistan","Palestine":"Palestina","Philippines":"Filippinerna","Qatar":"Qatar","Saudi Arabia":"Saudiarabien","Singapore":"Singapore","South Korea":"Sydkorea","Sri Lanka":"Sri Lanka","Syria":"Syrien","Taiwan":"Taiwan","Tajikistan":"Tadzjikistan","Thailand":"Thailand","Timor-Leste":"Östtimor","Turkey":"Turkiet","Turkmenistan":"Turkmenistan","United Arab Emirates":"Förenade Arabemiraten","Uzbekistan":"Uzbekistan","Vietnam":"Vietnam","Yemen":"Jemen"}},
 nordamerika:{name:"Nordamerika",rot:[96,0],par:[20,60],pts:[[-168,66],[-125,49],[-117,32],[-92,14],[-77,7.5],[-60,10.5],[-59.5,13],[-61,17],[-53,47],[-60,60],[-80,70],[-140,70]],fix:{"United States of America":[-98,39.5],"Canada":[-100,57]},
 c:{"Antigua and Barb.":"Antigua och Barbuda","Bahamas":"Bahamas","Barbados":"Barbados","Belize":"Belize","Canada":"Kanada","Costa Rica":"Costa Rica","Cuba":"Kuba","Dominica":"Dominica","Dominican Rep.":"Dominikanska republiken","El Salvador":"El Salvador","Grenada":"Grenada","Guatemala":"Guatemala","Haiti":"Haiti","Honduras":"Honduras","Jamaica":"Jamaica","Mexico":"Mexiko","Nicaragua":"Nicaragua","Panama":"Panama","Saint Lucia":"Saint Lucia","St. Kitts and Nevis":"Saint Kitts och Nevis","St. Vin. and Gren.":"Saint Vincent och Grenadinerna","Trinidad and Tobago":"Trinidad och Tobago","United States of America":"USA"}},
 sydamerika:{name:"Sydamerika",rot:[60,0],par:[-35,5],pts:[[-82,0],[-77,9],[-62,12.5],[-50,5],[-34.5,-7.5],[-55,-35],[-68,-56],[-76,-45]],fix:{"Chile":[-70.5,-30]},
 c:{"Argentina":"Argentina","Bolivia":"Bolivia","Brazil":"Brasilien","Chile":"Chile","Colombia":"Colombia","Ecuador":"Ecuador","Guyana":"Guyana","Paraguay":"Paraguay","Peru":"Peru","Suriname":"Surinam","Uruguay":"Uruguay","Venezuela":"Venezuela"}},
 oceanien:{name:"Oceanien",rot:[-160,0],par:[-35,0],pts:[[112,-22],[114,-35],[147,-44],[168,-47.5],[-172,-21],[-171,-14],[-157,2],[173,12],[134,8],[140,-2]],fix:{"Kiribati":[173,1.5],"Micronesia":[158.2,6.9],"Marshall Is.":[171.2,7.1],"Fiji":[178,-17.8],"Solomon Is.":[160,-9.5],"Vanuatu":[167,-15.5],"Tonga":[-175.2,-21.2],"Samoa":[-172,-13.7],"Papua New Guinea":[144,-6.5],"New Zealand":[172.5,-41.5]},
 c:{"Australia":"Australien","Fiji":"Fiji","Kiribati":"Kiribati","Marshall Is.":"Marshallöarna","Micronesia":"Mikronesien","Nauru":"Nauru","New Zealand":"Nya Zeeland","Palau":"Palau","Papua New Guinea":"Papua Nya Guinea","Samoa":"Samoa","Solomon Is.":"Salomonöarna","Tonga":"Tonga","Vanuatu":"Vanuatu"}},
};
const EXCLUDE=new Set(["Vatican","Monaco","San Marino","Malta",
 "Cabo Verde","Comoros","Mauritius","Seychelles","São Tomé and Principe",
 "Bahrain","Singapore","Maldives","Palestine",
 "Antigua and Barb.","Barbados","Dominica","Grenada","Saint Lucia","St. Kitts and Nevis","St. Vin. and Gren.","Trinidad and Tobago","Bahamas",
 "Nauru","Palau","Marshall Is.","Micronesia","Kiribati","Tonga","Samoa","Vanuatu"]);
for(const cfg of Object.values(C)) for(const k of Object.keys(cfg.c)) if(EXCLUDE.has(k)) delete cfg.c[k];
const CAP={"Albania":"Tirana","Andorra":"Andorra la Vella","Austria":"Wien","Belarus":"Minsk","Belgium":"Bryssel","Bosnia and Herz.":"Sarajevo","Bulgaria":"Sofia","Croatia":"Zagreb","Cyprus":"Nicosia","Czechia":"Prag","Denmark":"Köpenhamn","Estonia":"Tallinn","Finland":"Helsingfors","France":"Paris","Germany":"Berlin","Greece":"Aten","Hungary":"Budapest","Iceland":"Reykjavik","Ireland":"Dublin","Italy":"Rom","Kosovo":"Pristina","Latvia":"Riga","Liechtenstein":"Vaduz","Lithuania":"Vilnius","Luxembourg":"Luxemburg","Moldova":"Chișinău","Montenegro":"Podgorica","Netherlands":"Amsterdam","Macedonia":"Skopje","Norway":"Oslo","Poland":"Warszawa","Portugal":"Lissabon","Romania":"Bukarest","Russia":"Moskva","Serbia":"Belgrad","Slovakia":"Bratislava","Slovenia":"Ljubljana","Spain":"Madrid","Sweden":"Stockholm","Switzerland":"Bern","Ukraine":"Kyiv","United Kingdom":"London",
"Algeria":"Alger","Angola":"Luanda","Benin":"Porto-Novo","Botswana":"Gaborone","Burkina Faso":"Ouagadougou","Burundi":"Gitega","Cameroon":"Yaoundé","Central African Rep.":"Bangui","Chad":"N'Djamena","Congo":"Brazzaville","Dem. Rep. Congo":"Kinshasa","Côte d'Ivoire":"Yamoussoukro","Djibouti":"Djibouti","Egypt":"Kairo","Eq. Guinea":"Malabo","Eritrea":"Asmara","eSwatini":"Mbabane","Ethiopia":"Addis Abeba","Gabon":"Libreville","Gambia":"Banjul","Ghana":"Accra","Guinea":"Conakry","Guinea-Bissau":"Bissau","Kenya":"Nairobi","Lesotho":"Maseru","Liberia":"Monrovia","Libya":"Tripoli","Madagascar":"Antananarivo","Malawi":"Lilongwe","Mali":"Bamako","Mauritania":"Nouakchott","Morocco":"Rabat","Mozambique":"Maputo","Namibia":"Windhoek","Niger":"Niamey","Nigeria":"Abuja","Rwanda":"Kigali","Senegal":"Dakar","Sierra Leone":"Freetown","Somalia":"Mogadishu","South Africa":"Pretoria","S. Sudan":"Juba","Sudan":"Khartoum","Tanzania":"Dodoma","Togo":"Lomé","Tunisia":"Tunis","Uganda":"Kampala","Zambia":"Lusaka","Zimbabwe":"Harare",
"Afghanistan":"Kabul","Armenia":"Jerevan","Azerbaijan":"Baku","Bangladesh":"Dhaka","Bhutan":"Thimphu","Brunei":"Bandar Seri Begawan","Cambodia":"Phnom Penh","China":"Peking","Georgia":"Tbilisi","India":"New Delhi","Indonesia":"Jakarta","Iran":"Teheran","Iraq":"Bagdad","Israel":"Jerusalem","Japan":"Tokyo","Jordan":"Amman","Kazakhstan":"Astana","Kuwait":"Kuwait","Kyrgyzstan":"Bisjkek","Laos":"Vientiane","Lebanon":"Beirut","Malaysia":"Kuala Lumpur","Mongolia":"Ulaanbaatar","Myanmar":"Naypyidaw","Nepal":"Katmandu","North Korea":"Pyongyang","Oman":"Muskat","Pakistan":"Islamabad","Philippines":"Manila","Qatar":"Doha","Saudi Arabia":"Riyadh","South Korea":"Seoul","Sri Lanka":"Colombo","Syria":"Damaskus","Taiwan":"Taipei","Tajikistan":"Dusjanbe","Thailand":"Bangkok","Timor-Leste":"Dili","Turkey":"Ankara","Turkmenistan":"Asjchabad","United Arab Emirates":"Abu Dhabi","Uzbekistan":"Tasjkent","Vietnam":"Hanoi","Yemen":"Sanaa",
"Belize":"Belmopan","Canada":"Ottawa","Costa Rica":"San José","Cuba":"Havanna","Dominican Rep.":"Santo Domingo","El Salvador":"San Salvador","Guatemala":"Guatemala City","Haiti":"Port-au-Prince","Honduras":"Tegucigalpa","Jamaica":"Kingston","Mexico":"Mexico City","Nicaragua":"Managua","Panama":"Panama City","United States of America":"Washington D.C.",
"Argentina":"Buenos Aires","Bolivia":"Sucre","Brazil":"Brasília","Chile":"Santiago","Colombia":"Bogotá","Ecuador":"Quito","Guyana":"Georgetown","Paraguay":"Asunción","Peru":"Lima","Suriname":"Paramaribo","Uruguay":"Montevideo","Venezuela":"Caracas",
"Australia":"Canberra","New Zealand":"Wellington","Papua New Guinea":"Port Moresby","Fiji":"Suva","Solomon Is.":"Honiara"};
const iso=require("i18n-iso-countries"), path_=require("path"), usedFlags=new Set();
const W=1000,H=860, out={};
function labelPt(f){ // centroid of largest polygon
  const g=f.geometry; if(g.type==="Polygon") return d3.geoCentroid(f);
  let best=null,ba=-1; for(const p of g.coordinates){const pf={type:"Polygon",coordinates:p};const a=d3.geoArea(pf);if(a>ba){ba=a;best=pf;}} return d3.geoCentroid(best);}
for(const [key,cfg] of Object.entries(C)){
  const proj=d3.geoConicConformal().parallels(cfg.par).rotate(cfg.rot);
  proj.fitExtent([[14,14],[W-14,H-14]],{type:"MultiPoint",coordinates:cfg.pts});
  proj.clipExtent([[-20,-20],[W+20,H+20]]);
  const path=d3.geoPath(proj).digits(1);
  const cs=[],ctx=[];
  for(const f of feats){const n=f.properties.name; const d=path(f); if(!d)continue;
    if(cfg.c[n]){const area=path.area(f);
      const c=proj(cfg.fix[n]||labelPt(f)).map(v=>Math.round(v*10)/10);
      const o={k:n,n:cfg.c[n],d,c,m:(area<40||n==="Luxembourg")?1:0,a:Math.round(area)}; if(CAP[n]) o.h=CAP[n]; o.f=n==="Kosovo"?"xk":iso.numericToAlpha2(f.id).toLowerCase(); usedFlags.add(o.f); cs.push(o);}
    else ctx.push(d);}
  const miss=Object.keys(cfg.c).filter(k=>!cs.find(o=>o.k===k));
  console.log(key,cs.length,"nocap:",cs.filter(c=>!c.h).map(c=>c.k),"missing:",miss,"micro:",cs.filter(c=>c.m).map(c=>c.k+"("+c.a+")").join(","));
  cs.forEach(c=>delete c.a);
  out[key]={name:cfg.name,countries:cs,context:ctx.join("")};
}
const data=JSON.stringify({W,H,maps:out});
const page=fs.readFileSync(__dirname+"/template.html","utf8").replace("__DATA__",()=>data);
fs.writeFileSync(__dirname+"/../index.html",fs.readFileSync(__dirname+"/head.html","utf8")+page.split("\n").filter(l=>!l.includes("apple-mobile-web-app-capable")).join("\n")+"\n</body>\n</html>\n");
if(process.argv[2]) fs.writeFileSync(process.argv[2],page);

// copy the flags in use to /flags
const fdir=path_.join(__dirname,"..","flags"); fs.rmSync(fdir,{recursive:true,force:true}); fs.mkdirSync(fdir);
const srcDir=path_.join(path_.dirname(require.resolve("flag-icons/package.json")),"flags","4x3");
for(const f of usedFlags) fs.copyFileSync(path_.join(srcDir,f+".svg"),path_.join(fdir,f+".svg"));
console.log("flags",usedFlags.size);
