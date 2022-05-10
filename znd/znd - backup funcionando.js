
const sUrl = [
    "home",
    "sobre",
    "info"
]

//// znd sys ////
//// cria atalhos para objtos direto ////
//// os nomes dos atalhos são os IDs ////

var _select, _input, _div, _a, _ul, _i, _root, _section;
_select = {}; _input = {}; _div = {}; _a = {}; _ul = {}; _i = {}; _root = {}; _section = {}

_root.root = document;

var selects = document.querySelectorAll("select");
var inputs = document.querySelectorAll("input");
var divs = document.querySelectorAll("div");
var section = document.querySelectorAll("section");

var aHrefs = [...document.getElementsByTagName("a")] ;
var uls = [...document.getElementsByTagName("ul")] ;
var is = [...document.getElementsByTagName("i")] ;

Object.entries(inputs).map(function(e)
{
    var nn = e[1].id
    _input[nn] = e[1];
});

Object.entries(selects).map(function(e)
{
    var nn = e[1].id
    _select[nn] = e[1];
});

Object.entries(divs).map(function(e)
{
    var nn = e[1].id.split("#")[1]
    _div[ nn ]= e[1];
});

Object.entries(section).map(function(e)
{
    var nn = e[1].id.split("#")[1]
    _section[ nn ]= e[1];
});



//////
function __updateDomHrefs()
{
    aHrefs.map(function(e)
    {
        var nn = e.id
        _a[nn] = e;
    })
}
__updateDomHrefs();

uls.map(function(e)
{
   var nn = e.id
    _ul[nn] = e.getElementsByTagName("li");
})

is.map(function(e)
{
    var nn = e.id
    _i[nn] = e;
})
//////

function trace(e, where) 
{
    var h = document.createElement("H3");
    var t = document.createTextNode("» " + e);
    h.appendChild(t);
    document.body.appendChild(h);
    !where? "" : _element(where).appendChild(h);
}   


function _elements(element) { return document.querySelectorAll(element); }
function _element(element){ return document.querySelector(element); }
function _class(elClass) {return document.getElementsByClassName(elClass)[0];}


if(document.querySelectorAll('.dropdown-trigger') == true){

    var initializeDropdowns = document.querySelectorAll('.dropdown-trigger')
    for (var i = 0; i < dropdowns.length; i++){
        M.Dropdown.init(dropdowns[i]);
    }
}

if(document.querySelectorAll('.parallax') == true)
{
    var initializeParallax = document.querySelectorAll('.parallax')
    for (var i = 0; i < parallax.length; i++){
        M.Parallax.init(parallax[i]);
    }

}

/// form ////
var tForm = !_element("form")? "none" : _element("form") ;
var tInputs = _elements("input");

tForm.onsubmit = (e) => 
{
  e.preventDefault();
 
  var data = new FormData();
  var validation = [];
  
  Object.entries(tForm).map( function(v)
  {
    // pulando botoes //
    if (v[1].name != "" && v[1].name != undefined) 
    { 
      if( v[1].value !== "" )
      { 
        data.append( v[1].name, v[1].value );
        validation.push(1)
      }
      else{validation.push(0)}
    }
  })

  if( validation.find( e => e === 0) == 0 ) 
  {

    tInputs.forEach( function(_this) { _this.style.border = ".5px solid red" } )

  } 
  else
  { 
    _element("#formSendOk").classList.remove("off"); tForm.classList.add("off"); 

    var tformSender = new XMLHttpRequest();
    tformSender.open("POST", "https://script.google.com/macros/s/AKfycbzprWBLRqbZK1fNQb4wxwGHlb4HxiCDmLCi7FXIvZvwQu4MJyAdO2B7TSOjRDGOUHg/exec")
    tformSender.send(data);
  }
  return false;
}
/// form ////

/*
//// smooth scroll ////
const body = document.body,
scrollWrap = document.getElementsByClassName("wrapper")[0],
scrollHeight = scrollWrap.getBoundingClientRect().height - 1,
speed = 0.05;
var offset = 0;

_element('body').style.height = window.innerHeight + "px";
function smoothScroll() 
{
    offset += ( window.pageYOffset - offset) * speed;

    var scroll = "translateY(-" + offset + "px) translateZ(0)";
    scrollWrap.style.transform = scroll;

    callScroll = requestAnimationFrame(smoothScroll);
}
smoothScroll();


//document.addEventListener('DOMContentLoaded', function(){  _root._load_first_(); } );
//// smooth scroll ////

*/

/* menu de nabegação. colocar direto ou appendar? */



//

var cc = 0;
var hashRefs = _elements("section a")
hashRefs?.forEach( function(_this) { _this.pageLoad = sUrl[cc]; cc++; } )

var tModal  = _element("#modal_window")

document.addEventListener('click', e =>  
{
    var tTgt = e.target;
    var tHref = tTgt.getAttribute("href");
    
    var tCloseModal = _element("#close_modal")

    if( tTgt.dataset.modal != null) 
    {
        tCloseModal.onclick = () => tModal.classList.remove("modal_on");
        e.preventDefault();
        loadPage( null, tTgt.dataset.modal, () =>
        {
            tModal.classList.add("modal_on")
        })
    }
    else if(tHref == "#") 
    {

        e.preventDefault();
        if(!tTransition.await) 
        { 
            _transitionOpenClose( () => loadPage(tTgt.pageLoad + ".html") ); 
        }
       
    }
});

function loadPage(url, element, callBack) 
{
    var hereElement;
    callBack = !callBack ? "" : callBack;


    if(!element) hereElement = element = "section";
    else{ hereElement = "#modal" ; element = "#" + element; }
    
    var cached = sessionStorage[url];
    //if(cached){return _element("section").innerHTML = cached;}// qdo usa, ele recarrega toda a pagina.

    var xhr = new XMLHttpRequest();


    if(!url) url = "modal.html"; 

    if ( url.startsWith('http') ) 
    { 
        xhr.onload= function() 
        { 
            const _jSon =  JSON.parse(xhr.response);
            trace(Object.keys(_jSon[0]), "section")
        }
    }
    else 
    {        
        xhr.responseType='document'; 
        xhr.onload= function() 
        { 
           sessionStorage[url] = _element(hereElement).innerHTML = xhr.response.querySelector(element).innerHTML;
        }
    }


    xhr.open('GET', url);
    xhr.send('');
    xhr.onloadend = callBack;
}

const tTransition = _div.transition_layer
//tTransition.await = false;
const _transitionOpenClose = (callBack) => 
{
    tTransition.await = true;

    tTransition.classList.add("_topen");
    tTransition.ontransitionrun = () => _element("body").oclick = e => e.preventDefault();
    tTransition.ontransitionend = () => 
    {
        callBack();
        setTimeout( () => {
           tTransition.await = false;
        }, 500) 
        tTransition.classList.remove("_topen");
    }

}
//tTransition.classList.add("_topen");


/// Json ///
var _tDb = "https://script.googleusercontent.com/macros/echo?user_content_key=T_OEbKsz2VwHMkMcHkIjyw98ZcRzS8ct5UlmLzIemFACMz4i9ef9SOLMbv1vV1assqU2scCMeHs06QthVwcrITrEqEc1vVCsm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFhAinZjEeA6K5mYAt38P5jzNSY7ptGq5XJrId6WY5ibia_V6TkEJ_bC0AyMbEE87UGFi7kbYjPBmd5uiexxlqFKoSOdad6tfw&lib=M_fiL4S8FIGkxcl50QSKDV-Q_-htrIq-J"
var _testeDB = "https://script.google.com/macros/s/AKfycbxdCZ8jN0ISXc6pg9o3GwqXLY5RmIXJxtDT61ytvvMyxl4S51YKXr-iNK0T2Z2r18v7/exec"
//loadPage(_tDb)

//loadPage(_testeDB)



/// Json ///
// json ja funciona no loadPage. - fazer agora duplicação de templates para montar página.
 