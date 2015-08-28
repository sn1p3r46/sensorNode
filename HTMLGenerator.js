
_begin = "<"
_end = ">"
_slash = "/"

function NEWTag(tag, HTMLclass, id, content) {
    this.tag = tag; 
    this.HTMLclass = HTMLclass;
    this.id = id;
    this.content = content;
    this.getFullTag = function () {
	if(this.tag){
		var finalString = _begin + this.tag
		if(this.HTMLclass){ finalString = finalString + " class=" + '"' + this.HTMLclass + '" ';}
		if(this.id){ finalString = finalString + " id=" + '"'+ this.id + '" '; }
		finalString = finalString + _end;

	if(content){ finalString = finalString + this.content; }
	finalString = finalString + _begin + _slash + this.tag + _end;
	return finalString;
	}
	else{
	return null;
	}
    }
}


var td   =  new NEWTag("td",null,null,"sensore").getFullTag()+new NEWTag("td",null,"sensore",null).getFullTag();
var tr   =  new NEWTag("tr","sensore",null,td).getFullTag();

console.log(tr)

ciaone = new NEWTag("h2","classedelCAZZO","IDdelCAZZO","contenutoDERCAZZO").getFullTag();

console.log(ciaone);
//console.log(ciaone.getFullTag());
