let pokemonRepository=function(){let t=[];function e(e){"object"==typeof e&&"name"in e&&"detailsUrl"in e?t.push(e):console.log("pokemon is not correct")}function n(){return t}function o(t){return pokemonRepository.getAll().filter(function(e){return e.name.indexOf(t)>-1})}function a(t){pokemonRepository.loadDetails(t).then(function(){var e;let n,o,a,l,s,p,r,d;e=t,n=$(".modal-title"),o=$(".modal-body"),n.empty(),o.empty(),(a=$("<h1>"+e.name+"</h1>")).addClass("pokemon-name","pokemon-details"),(l=$('<img class="modal-img" style="width:50%">')).addClass("pokemon-image","pokemon-details"),l.attr("src",e.imageUrl),(s=$('<img class="modal-img" style="width:50%">')).addClass("pokemon-image","pokemon-details"),s.attr("src",e.imageUrlBack),(p=$("<p>Height: "+e.height+"m</p>")).addClass("pokemon-details"),(r=$("<p>weight: "+e.weight+"kg</p>")).addClass("pokemon-details"),(d=$("<p>Types: "+e.types+"</p>")).addClass("pokemon-details"),n.append(a),o.append(l),o.append(s),o.append(p),o.append(r),o.append(d),console.log(t)})}return{add:e,getAll:n,addListItem:function t(e){let n=document.querySelector(".pokemon-list"),o=document.createElement("li");o.classList.add("group-list-item","list-item");let l=document.createElement("button");l.innerText=e.name,l.setAttribute("data-toggle","modal"),l.setAttribute("data-target","#pokemon-details-modal"),l.classList.add("pokemonButton","btn","btn-primary"),l.addEventListener("click",function(){a(e)}),o.appendChild(l),n.appendChild(o)},showDetails:a,loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){let n={name:t.name,detailsUrl:t.url};e(n),console.log(n)})}).catch(function(t){console.error(t)})},loadDetails:function t(e){return fetch(e.detailsUrl).then(function(t){return t.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.imgUrlBack=t.sprites.back_default,e.height=t.height,e.weight=t.weight,e.types=t.types.map(function(e){for(i=0;i<t.types.length;i++)return e.type.name}).join(", ")}).catch(function(t){console.error(t)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});