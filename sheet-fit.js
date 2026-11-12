/* One viewport per sheet. Long catalogues turn pages; they never scroll. */
(function(g){'use strict';
let source='',page=0,host=null,resizeJob=0;
function show(n){const pages=[...host.querySelectorAll('.sheet-page')];page=Math.max(0,Math.min(n,pages.length-1));pages.forEach((el,i)=>el.hidden=i!==page);const nav=host.querySelector('.sheet-pager');nav.hidden=pages.length<2;nav.querySelector('output').textContent=`${page+1} / ${pages.length}`;nav.querySelector('[data-sheet-turn="-1"]').disabled=page===0;nav.querySelector('[data-sheet-turn="1"]').disabled=page===pages.length-1;}
function mount(html,reset=true){source=html;if(reset)page=0;pack();}
function pack(){host=document.querySelector('#sheet-body');if(!host||!document.querySelector('#sheet').open)return;
 const input=document.createElement('template');input.innerHTML=source;
 const actions=[],blocks=[],compact=innerHeight<600;
 for(const el of [...input.content.children]){
  if(el.matches('button.primary')){actions.push(el);continue;}
  if(el.matches('.flavors,.food-grid,.preset-list')){
   const count=el.matches('.food-grid')?(compact?3:6):el.matches('.flavors')?4:3;
   const children=[...el.children];for(let i=0;i<children.length;i+=count){const group=el.cloneNode(false);group.append(...children.slice(i,i+count));blocks.push(group);}continue;
  }
  if(el.matches('ul,ol')){let number=Number(el.getAttribute('start')||1);for(const child of [...el.children]){const group=el.cloneNode(false);if(el.matches('ol'))group.start=number++;group.append(child);blocks.push(group);}continue;}
  blocks.push(el);
 }
 host.innerHTML='<div class="sheet-content"></div><footer class="sheet-footer"><nav class="sheet-pager" aria-label="내용 페이지"><button class="secondary" data-sheet-turn="-1" aria-label="이전 페이지">‹ 이전</button><output aria-live="polite"></output><button class="secondary" data-sheet-turn="1" aria-label="다음 페이지">다음 ›</button></nav><div class="sheet-primary"></div></footer>';
 const content=host.querySelector('.sheet-content'),footer=host.querySelector('.sheet-primary');footer.append(...actions);footer.hidden=!actions.length;
 const pages=[];function next(){const p=document.createElement('section');p.className='sheet-page';content.append(p);pages.push(p);return p;}let current=next();
 const queue=[...blocks];while(queue.length){const block=queue.shift();current.append(block);
  if(current.scrollHeight>current.clientHeight+1){
   if(current.children.length>1){current.removeChild(block);current.hidden=true;current=next();queue.unshift(block);continue;}
   if(block.matches('.flavors,.food-grid,.preset-list')&&block.children.length>1){current.removeChild(block);const children=[...block.children],mid=Math.ceil(children.length/2),a=block.cloneNode(false),b=block.cloneNode(false);a.append(...children.slice(0,mid));b.append(...children.slice(mid));queue.unshift(a,b);}
  }
 }
 // Pagination reserves space before measuring, so later pages cannot cover actions.
 show(page);
 host.querySelectorAll('[data-sheet-turn]').forEach(b=>b.addEventListener('click',()=>show(page+Number(b.dataset.sheetTurn))));
}
window.addEventListener('resize',()=>{cancelAnimationFrame(resizeJob);resizeJob=requestAnimationFrame(pack);});
document.fonts?.ready.then(()=>pack());
g.KombuSheets={mount,refresh:pack};
})(window);
