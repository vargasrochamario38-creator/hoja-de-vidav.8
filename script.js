const $=id=>document.getElementById(id),esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const LS="cvpro_v2",pasos=["Datos personales","Perfil profesional","Experiencia laboral","Formación y cursos","Habilidades e idiomas","Referencias y extras","Diseño y personalización"];
const vacio=()=>({nombre:"",cargo:"",correo:"",telefono:"",ubicacion:"",linkedin:"",nacimiento:"",nacionalidad:"",civil:"",perfil:"",habilidades:"",extras:"",foto:"",exp:[],edu:[],cursos:[],idi:[],refs:[]});
const cfg0=()=>({modelo:"modelo1",color:"#2563eb",fuente:"Arial, sans-serif",hab:"lista",calidad:"1",orden:["contacto","datos","habilidades","idiomas","extras","perfil","exp","edu","cursos","refs"],vis:{},tit:{}});
const SEC={contacto:["Contacto","l"],datos:["Datos personales","l"],habilidades:["Habilidades","l"],idiomas:["Idiomas","l"],extras:["Información adicional","l"],perfil:["Perfil profesional","r"],exp:["Experiencia laboral","r"],edu:["Formación académica","r"],cursos:["Cursos y certificaciones","r"],refs:["Referencias","r"]};
const LST={
exp:{f:[["cargo","Cargo","Ej: Auxiliar administrativo"],["empresa","Empresa","Ej: Farmacia Central"],["desde","Desde","Ene 2022"],["hasta","Hasta","Actual"],["desc","Funciones y logros (una por línea)","",1]]},
edu:{f:[["titulo","Título / Carrera","Ej: Bachiller / Técnico Medio"],["inst","Institución"],["desde","Desde","2018"],["hasta","Hasta","2023 / En curso"]]},
cursos:{f:[["nombre","Curso / Certificación"],["inst","Institución"],["anio","Año"]]},
idi:{f:[["n","Idioma","Ej: Inglés"],["nivel","Nivel","",0,["Básico","Intermedio","Avanzado","Nativo"]]]},
refs:{f:[["nombre","Nombre"],["cargo","Cargo / Relación"],["tel","Teléfono o correo"]]}};
const SUG={
perfil:[["Primer empleo","Bachiller responsable y con muchas ganas de aprender, busco mi primera oportunidad laboral como [cargo]. Tengo facilidad para el trabajo en equipo, buena atención al público y manejo básico de computación. Me comprometo a cumplir con puntualidad y dedicación."],["Administrativo","Profesional organizado con [X] años de experiencia en tareas administrativas, atención al cliente y manejo de documentos. Domino Word y Excel y destaco por mi puntualidad y orden. Busco aportar a una empresa donde pueda seguir creciendo."],["Ventas / Atención","Persona carismática con experiencia en ventas y atención al cliente, orientada a cumplir metas y generar relaciones de confianza. Capacidad para trabajar bajo presión y resolver problemas con rapidez."],["Tecnología","Técnico en Sistemas Informáticos con conocimientos en HTML, CSS y JavaScript, mantenimiento de computadoras y soporte técnico. Busco aplicar mis conocimientos en proyectos reales y seguir aprendiendo."]],
exp:["Atendí a clientes de forma amable y eficiente","Organicé y archivé documentos y registros","Manejé caja y realicé arqueos diarios","Apoyé en el control de inventario","Trabajé en equipo para cumplir las metas","Capacité a nuevos compañeros","Resolví reclamos y consultas de clientes","Elaboré reportes e informes en Excel"],
hab:["Comunicación","Trabajo en equipo","Responsabilidad","Puntualidad","Liderazgo","Resolución de problemas","Adaptabilidad","Atención al cliente","Organización","Word","Excel","PowerPoint","Internet y correo","Redes sociales","Diseño web","Soporte técnico","Manejo de caja"],
extras:["Licencia de conducir categoría B","Disponibilidad inmediata","Disponibilidad para viajar","Disponibilidad de horario completo","Movilidad propia"]};
const EJ={nombre:"María Fernanda López",cargo:"Asistente administrativa",correo:"maria.lopez@correo.com",telefono:"+591 77122272",ubicacion:"Santa Cruz, Bolivia",linkedin:"",nacimiento:"12/05/2003",nacionalidad:"Boliviana",civil:"Soltero/a",perfil:SUG.perfil[1][1].replace("[X]","2"),habilidades:"Excel, Word, Atención al cliente, Comunicación, Trabajo en equipo, Organización",extras:"Disponibilidad inmediata\nLicencia de conducir categoría B",foto:"",exp:[{cargo:"Auxiliar administrativa",empresa:"Comercial Central",desde:"Ene 2023",hasta:"Actual",desc:SUG.exp.slice(0,2).concat(SUG.exp[7]).join("\n")}],edu:[{titulo:"Bachiller en Humanidades",inst:"U.E. Maestro Pitágoras II",desde:"2016",hasta:"2021"}],cursos:[{nombre:"Ofimática avanzada",inst:"Instituto Técnico",anio:"2022"}],idi:[{n:"Español",nivel:"Nativo"},{n:"Inglés",nivel:"Básico"}],refs:[{nombre:"Lic. Carlos Rojas",cargo:"Jefe directo",tel:"70011223"}]};
let D=vacio(),C=cfg0(),pasoActual=1,lastTa=null,maxPaso=1;
try{const g=JSON.parse(localStorage.getItem(LS));if(g){D={...vacio(),...g.D};C={...cfg0(),...g.C}}}catch(e){}

function msg(t,ms=2500){$("mensaje").textContent=t;if(ms)setTimeout(()=>{if($("mensaje").textContent===t)$("mensaje").textContent=""},ms)}
const fecha=e=>[e.desde,e.hasta].filter(Boolean).join(" – ");
const bullets=t=>{const l=(t||"").split("\n").map(x=>x.replace(/^\s*[-•*]\s*/,"").trim()).filter(Boolean);return l.length?`<ul>${l.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""};
function secHtml(id){switch(id){
case"contacto":return[D.correo,D.telefono,D.ubicacion,D.linkedin].filter(Boolean).map(x=>`<p>${esc(x)}</p>`).join("");
case"datos":return[["Nacimiento",D.nacimiento],["Nacionalidad",D.nacionalidad],["Estado civil",D.civil]].filter(x=>x[1]).map(x=>`<p><b>${x[0]}:</b> ${esc(x[1])}</p>`).join("");
case"habilidades":{const h=D.habilidades.split(",").map(s=>s.trim()).filter(Boolean);return h.length?`<ul class="${C.hab=="tags"?"tags":""}">${h.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}
case"idiomas":return D.idi.filter(i=>i.n).map(i=>`<p><b>${esc(i.n)}</b> — ${esc(i.nivel)}</p>`).join("");
case"extras":return D.extras.trim()?`<p class="pl">${esc(D.extras.trim())}</p>`:"";
case"perfil":return D.perfil.trim()?`<p>${esc(D.perfil.trim())}</p>`:"";
case"exp":return D.exp.filter(e=>e.cargo||e.empresa||e.desc).map(e=>`<div class="it"><b>${esc(e.cargo)}</b>${e.empresa?" · "+esc(e.empresa):""}<small>${esc(fecha(e))}</small>${bullets(e.desc)}</div>`).join("");
case"edu":return D.edu.filter(e=>e.titulo||e.inst).map(e=>`<div class="it"><b>${esc(e.titulo)}</b>${e.inst?" · "+esc(e.inst):""}<small>${esc(fecha(e))}</small></div>`).join("");
case"cursos":return D.cursos.filter(e=>e.nombre).map(e=>`<div class="it"><b>${esc(e.nombre)}</b>${e.inst?" · "+esc(e.inst):""}${e.anio?" ("+esc(e.anio)+")":""}</div>`).join("");
case"refs":return D.refs.filter(e=>e.nombre).map(e=>`<div class="it"><b>${esc(e.nombre)}</b>${e.cargo?" · "+esc(e.cargo):""}<small>${esc(e.tel)}</small></div>`).join("")}return""}
function renderCV(){const L=[],R=[];
C.orden.forEach(id=>{if(C.vis[id]===false)return;const h=secHtml(id);if(!h)return;const t=esc(C.tit[id]||SEC[id][0]);
SEC[id][1]=="l"?L.push(`<div class="sec"><h3>${t}</h3>${h}</div>`):R.push(`<div class="cv-section"><h3>${t}</h3>${h}</div>`)});
const cv=$("cvPreview");cv.className="cv-page "+C.modelo;cv.style.setProperty("--accent",C.color);cv.style.fontFamily=C.fuente;
cv.innerHTML=`<aside class="cv-left">${D.foto?`<img class="cv-photo" src="${D.foto}" alt="Foto">`:""}${L.join("")}</aside><section class="cv-right"><h1>${esc(D.nombre||"Tu Nombre Completo")}</h1><h2>${esc(D.cargo||"Profesión o cargo deseado")}</h2>${R.join("")}</section>`;
fit()}
function fit(){const cv=$("cvPreview");cv.style.minHeight="1056px";const n=Math.max(1,Math.ceil(cv.offsetHeight/1056));cv.style.minHeight=n*1056+"px";
const s=Math.min(1,($("stage").clientWidth-56)/816);cv.style.transform=`scale(${s})`;$("cvBox").style.width=816*s+"px";$("cvBox").style.height=n*1056*s+"px";$("pages").textContent=`Carta · ${n} pág.`}
function progreso(){const v=[D.nombre,D.cargo,D.correo,D.telefono,D.perfil,D.habilidades,D.foto,D.exp.length,D.edu.length,D.idi.length].filter(Boolean).length,p=Math.round(v/10*100);$("progressBar").style.width=p+"%";$("progressText").textContent=p+"% completo"}
function checklist(){const h=D.habilidades.split(",").filter(s=>s.trim()).length,pl=D.perfil.trim().length;
const c=[[D.foto,"Foto profesional (fondo claro, ropa formal)"],[D.nombre&&D.cargo,"Nombre y cargo deseado"],[/^\S+@\S+\.\S+$/.test(D.correo),"Correo válido y serio"],[D.telefono.replace(/\D/g,"").length>=7,"Teléfono de contacto"],[pl>=80&&pl<=600,"Perfil claro de 3–5 líneas (80–600 caracteres)"],[D.exp.length||D.cursos.length,"Experiencia o, si no tienes, cursos/prácticas"],[D.edu.length,"Formación académica"],[h>=5,"Al menos 5 habilidades"],[D.idi.length,"Idiomas (aunque sea tu idioma nativo)"],[D.refs.length,"Referencias (opcional, pero valorado)"]];
$("check").innerHTML=`<div class="chkscore">${c.filter(x=>x[0]).length} de ${c.length} recomendaciones cumplidas</div>`+c.map(x=>`<div class="chk ${x[0]?"":"no"}">${x[0]?"✅":"⬜"} ${x[1]}</div>`).join("")}
function guardar(){try{localStorage.setItem(LS,JSON.stringify({D,C}))}catch(e){}}
function cambio(){renderCV();progreso();checklist();syncUI();guardar()}
function syncUI(){document.querySelectorAll(".modelo-btn").forEach(b=>b.classList.toggle("active",b.dataset.modelo==C.modelo));document.querySelectorAll(".color-btn").forEach(b=>b.classList.toggle("active",b.dataset.color==C.color));document.documentElement.style.setProperty("--accent",C.color)}
function pintarListas(){for(const k in LST)$("l_"+k).innerHTML=D[k].map((it,i)=>`<div class="item"><div class="item-h"><b>#${i+1}</b><span><button type="button" data-mv="${k},${i},-1" title="Subir">↑</button><button type="button" data-mv="${k},${i},1" title="Bajar">↓</button><button type="button" data-del="${k},${i}" title="Eliminar">🗑</button></span></div><div class="grid">${LST[k].f.map(([f,l,p,ta,op])=>`<div class="field ${ta?"full":""}"><label>${l}</label>${op?`<select data-l="${k},${i},${f}">${op.map(o=>`<option${it[f]==o?" selected":""}>${o}</option>`).join("")}</select>`:ta?`<textarea rows="4" data-l="${k},${i},${f}" placeholder="${p||""}">${esc(it[f]||"")}</textarea>`:`<input data-l="${k},${i},${f}" value="${esc(it[f]||"")}" placeholder="${p||""}">`}</div>`).join("")}</div></div>`).join("")||`<p class="empty">Aún no agregaste nada. Usa el botón de abajo.</p>`}
function pintarSec(){$("secList").innerHTML=C.orden.map(id=>`<div class="srow"><input type="checkbox" data-vis="${id}" ${C.vis[id]!==false?"checked":""} title="Mostrar"><input data-tit="${id}" value="${esc(C.tit[id]||SEC[id][0])}"><em>${SEC[id][1]=="l"?"lateral":"principal"}</em><button type="button" data-sm="${id},-1">↑</button><button type="button" data-sm="${id},1">↓</button></div>`).join("")}
function pintarChips(){$("c_perfil").innerHTML=SUG.perfil.map((p,i)=>`<button type="button" class="chip" data-sug="perfil,${i}">${p[0]}</button>`).join("");
for(const[k,id]of[["exp","c_exp"],["hab","c_hab"],["extras","c_extras"]])$(id).innerHTML=SUG[k].map((t,i)=>`<button type="button" class="chip" data-sug="${k},${i}">＋ ${t}</button>`).join("")}
function sincCampos(){document.querySelectorAll("[data-k]").forEach(e=>e.value=D[e.dataset.k]||"");document.querySelectorAll("[data-c]").forEach(e=>e.value=C[e.dataset.c])}
function todo(){sincCampos();pintarListas();pintarSec();cambio()}
function mostrarPaso(n){pasoActual=Math.max(1,Math.min(7,n));maxPaso=Math.max(maxPaso,pasoActual);
document.querySelectorAll(".step").forEach(s=>s.classList.toggle("active",+s.dataset.step===pasoActual));$("stepNumber").textContent=pasoActual;$("stepTitle").textContent=pasos[pasoActual-1];
$("btnAnterior").classList.toggle("hidden",pasoActual===1);$("btnSiguiente").classList.toggle("hidden",pasoActual===7);
$("dots").innerHTML=pasos.map((p,i)=>`<button type="button" data-go="${i+1}" title="${p}" class="${i+1===pasoActual?"on":i+1<maxPaso?"ok":""}">${i+1}</button>`).join("")}

$("cvForm").addEventListener("input",e=>{const t=e.target,d=t.dataset;
if(d.k!==undefined)D[d.k]=t.value;else if(d.l){const[k,i,f]=d.l.split(",");D[k][i][f]=t.value}else if(d.c)C[d.c]=t.value;else if(d.tit)C.tit[d.tit]=t.value;else if(d.vis)C.vis[d.vis]=t.checked;else return;cambio()});
$("cvForm").addEventListener("focusin",e=>{if(e.target.tagName=="TEXTAREA"&&e.target.dataset.l)lastTa=e.target});
document.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const d=b.dataset;
if(d.add){D[d.add].push(d.add=="idi"?{nivel:"Intermedio"}:{});pintarListas();cambio()}
else if(d.del){const[k,i]=d.del.split(",");D[k].splice(+i,1);pintarListas();cambio()}
else if(d.mv){const[k,i,s]=d.mv.split(",").map((x,j)=>j?+x:x),j=i+s;if(j<0||j>=D[k].length)return;[D[k][i],D[k][j]]=[D[k][j],D[k][i]];pintarListas();cambio()}
else if(d.sm){const[id,s]=d.sm.split(","),o=C.orden;let i=o.indexOf(id),j=i+ +s;while(o[j]&&SEC[o[j]][1]!=SEC[id][1])j+=+s;if(!o[j])return;[o[i],o[j]]=[o[j],o[i]];pintarSec();cambio()}
else if(d.modelo){C.modelo=d.modelo;cambio()}else if(d.color){C.color=d.color;cambio()}else if(d.go)mostrarPaso(+d.go)
else if(d.sug){const[k,i]=d.sug.split(","),v=SUG[k][i];
if(k=="perfil"){D.perfil=v[1];sincCampos()}
else if(k=="hab"){const a=D.habilidades.split(",").map(s=>s.trim()).filter(Boolean);if(!a.includes(v))a.push(v);D.habilidades=a.join(", ");sincCampos()}
else if(k=="extras"){D.extras=(D.extras.trim()?D.extras.trim()+"\n":"")+v;sincCampos()}
else{if(!lastTa||!document.body.contains(lastTa))return msg("Primero haz clic dentro de «Funciones y logros» de una experiencia 👆",3500);lastTa.value=(lastTa.value.trim()?lastTa.value.trim()+"\n":"")+v;const[kk,ii,ff]=lastTa.dataset.l.split(",");D[kk][ii][ff]=lastTa.value}
cambio()}});
$("btnSiguiente").onclick=()=>mostrarPaso(pasoActual+1);$("btnAnterior").onclick=()=>mostrarPaso(pasoActual-1);
$("themeToggle").onclick=()=>{document.body.classList.toggle("dark");$("themeToggle").textContent=document.body.classList.contains("dark")?"☀️":"🌙"};
$("btnQuitarFoto").onclick=()=>{D.foto="";cambio()};
$("btnEjemplo").onclick=()=>{if(confirm("Se reemplazarán tus datos actuales por un ejemplo. ¿Continuar?")){D={...vacio(),...JSON.parse(JSON.stringify(EJ))};todo()}};
$("btnReset").onclick=()=>{if(confirm("¿Borrar TODOS tus datos?")){D=vacio();C=cfg0();todo();mostrarPaso(1)}};
$("btnExport").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify({D,C})],{type:"application/json"}));a.download="mi-cv-datos.json";a.click();msg("Archivo guardado ✓")};
$("btnImport").onclick=()=>$("fileImport").click();
$("fileImport").onchange=function(){const f=this.files[0];if(!f)return;const r=new FileReader();r.onload=e=>{try{const g=JSON.parse(e.target.result);D={...vacio(),...g.D};C={...cfg0(),...g.C};todo();msg("Datos cargados ✓")}catch(x){msg("El archivo no es válido")}};r.readAsText(f);this.value=""};
window.addEventListener("resize",fit);
$("btnGaleria").addEventListener("click",()=>$("fotoGaleria").click()); $("btnCamara").addEventListener("click",()=>$("fotoCamara").click());
$("fotoGaleria").addEventListener("change",manejarFoto); $("fotoCamara").addEventListener("change",manejarFoto);
function manejarFoto(){const file=this.files[0]; if(!file)return; const reader=new FileReader(); reader.onload=e=>abrirRecorte(e.target.result); reader.readAsDataURL(file);}

const cropModal=$("cropModal"), cropCanvas=$("cropCanvas"), ctx=cropCanvas.getContext("2d"), zoomRange=$("zoomRange");
let cropImg=new Image(), scale=1,posX=0,posY=0,isDragging=false,startX=0,startY=0;
function abrirRecorte(src){cropImg=new Image(); cropImg.onload=()=>{scale=Math.max(cropCanvas.width/cropImg.width,cropCanvas.height/cropImg.height); zoomRange.value=1; posX=(cropCanvas.width-cropImg.width*scale)/2; posY=(cropCanvas.height-cropImg.height*scale)/2; cropModal.classList.remove("hidden"); dibujarCrop();}; cropImg.src=src;}
function dibujarCrop(){ctx.clearRect(0,0,cropCanvas.width,cropCanvas.height);ctx.fillStyle="#0f172a";ctx.fillRect(0,0,cropCanvas.width,cropCanvas.height);ctx.drawImage(cropImg,posX,posY,cropImg.width*scale,cropImg.height*scale);}
zoomRange.addEventListener("input",()=>{const baseScale=Math.max(cropCanvas.width/cropImg.width,cropCanvas.height/cropImg.height), previousScale=scale;scale=baseScale*parseFloat(zoomRange.value);const cx=cropCanvas.width/2,cy=cropCanvas.height/2;posX=cx-(cx-posX)*(scale/previousScale);posY=cy-(cy-posY)*(scale/previousScale);dibujarCrop();});
function getPointer(e){const rect=cropCanvas.getBoundingClientRect(),touch=e.touches?e.touches[0]:e;return{x:(touch.clientX-rect.left)*(cropCanvas.width/rect.width),y:(touch.clientY-rect.top)*(cropCanvas.height/rect.height)}}
function iniciarArrastre(e){e.preventDefault();isDragging=true;const p=getPointer(e);startX=p.x-posX;startY=p.y-posY} function moverArrastre(e){if(!isDragging)return;e.preventDefault();const p=getPointer(e);posX=p.x-startX;posY=p.y-startY;dibujarCrop()} function terminarArrastre(){isDragging=false}
cropCanvas.addEventListener("mousedown",iniciarArrastre);cropCanvas.addEventListener("mousemove",moverArrastre);window.addEventListener("mouseup",terminarArrastre);cropCanvas.addEventListener("touchstart",iniciarArrastre,{passive:false});cropCanvas.addEventListener("touchmove",moverArrastre,{passive:false});window.addEventListener("touchend",terminarArrastre);
function cerrarCrop(){cropModal.classList.add("hidden");$("fotoGaleria").value="";$("fotoCamara").value=""}
$("cancelCrop").addEventListener("click",cerrarCrop); $("closeCrop").addEventListener("click",cerrarCrop); cropModal.addEventListener("click",e=>{if(e.target===cropModal)cerrarCrop()});
$("applyCrop").addEventListener("click",()=>{const output=document.createElement("canvas");output.width=220;output.height=220;const octx=output.getContext("2d");octx.fillStyle="#fff";octx.fillRect(0,0,220,220);octx.save();octx.beginPath();octx.arc(110,110,110,0,Math.PI*2);octx.clip();const circleSize=260,sourceX=(cropCanvas.width-circleSize)/2,sourceY=(cropCanvas.height-circleSize)/2;octx.drawImage(cropCanvas,sourceX,sourceY,circleSize,circleSize,0,0,220,220);octx.restore();D.foto=output.toDataURL("image/jpeg",.75);cambio();cerrarCrop();});

$("btnPDF").onclick=async()=>{
if(!window.html2canvas||!window.jspdf)return msg("No cargaron las librerías del PDF. Revisa tu conexión a internet.",4000);
if(!D.nombre.trim()){mostrarPaso(1);return msg("Escribe al menos tu nombre para generar el PDF.",3500)}
const b=$("btnPDF"),cv=$("cvPreview"),q=+C.calidad,tf=cv.style.transform;b.disabled=true;b.textContent="Generando PDF...";msg("Preparando PDF...",0);
cv.style.transform="none";cv.classList.add("cap");
try{await new Promise(r=>setTimeout(r,180));
const cn=await html2canvas(cv,{scale:q,useCORS:true,backgroundColor:"#fff",scrollX:0,scrollY:0}),{jsPDF}=window.jspdf,pdf=new jsPDF({unit:"mm",format:"letter",compress:true}),ph=Math.round(cn.width*279.4/215.9),n=Math.max(1,Math.round(cn.height/ph)),cal=q==1?.68:q==2?.9:.8;
for(let i=0;i<n;i++){const pc=document.createElement("canvas");pc.width=cn.width;pc.height=ph;const g=pc.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,pc.width,ph);g.drawImage(cn,0,-i*ph);if(i)pdf.addPage();pdf.addImage(pc.toDataURL("image/jpeg",cal),"JPEG",0,0,215.9,279.4,undefined,"FAST")}
const nom=(D.nombre||"curriculum").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-").replace(/[^a-z0-9\-]/g,"");
pdf.save(`${nom}-cv.pdf`);msg("PDF descargado correctamente ✓",3500)}
catch(e){console.error(e);msg("No se pudo generar el PDF. Prueba desde GitHub Pages o Live Server.",5000)}
finally{cv.style.transform=tf;cv.classList.remove("cap");b.disabled=false;b.textContent="⬇ Descargar PDF"}};
pintarChips();todo();mostrarPaso(1);
