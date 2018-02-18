var nextClass = []
 var nextID = []
 var submitClass = []
 var submitID = []
 var attrID = []
 var attrClass = []
 // var doc = document.getElementsByTagName("body")[0].innerHTML
 var posOfLabels = []
 var textOfLabel = []
//printLabels()


function setAttribute(type,nom,val,ind){
 //Type describes if its a date,input, etc.
 //Nom represents if its id class or name
 //val represents the name of the Nom
 //ind (only valid for name and class represent the positon the name or class appears in)
 if(type == "text"){
   if(nom == "id"){
     document.getElementById(val).value = "hi";
   }
   else if(nom == "class"){
     var obj = document.getElementsByClassName(val)[ind]
     obj.value = "hi"
   }
   else if(nom == "name"){
     (document.getElementsByName(val)[ind]).value = "hi"
   }
 }
 else if(type == "date"){
   if(nom == "id"){
     document.getElementById(val).value = "2017-01-01";
   }
   else if(nom == "class"){
     var obj = document.getElementsByClassName(val)[ind]
     obj.value = "2017-01-01"
   }
   else if(nom == "name"){
     (document.getElementsByName(val)[ind]).value = "2017-01-01"
   }
 }
}
 /**

Important!!! check if new page only after u fill label values
 **/
 function isNewPage(){
     if(doc == document.getElementsByTagName("body")[0].innerHTML){
 return false
 }
 var old = doc.length
 var newDoc = document.getElementsByTagName("body")[0].innerHTML.length
 if(old > newDoc)
 {
   console.log("Different by " + (1-(newDoc/old)))
 }
 else{
   console.log("Different by " + (1-(old/newDoc)))
 }
 doc = document.getElementsByTagName("body")[0].innerHTML
 return true
 }

 function getUniqueIndexOfClassOrName(className, surroundingText){
   var location = 0;
   for(var pos = doc.indexOf(className); pos !== -1; pos = doc.indexOf(className, pos + 1)) {
     var o =  getSurroundingOutput(pos)//doc.substring(pos,pos+200)
     o = o.substring(15,40)
     //console.log("\nFound: "+surroundingText+" \nLooking for \n"+o)
     if(surroundingText.includes(o)){
       //console.log(o)
         return location;
     }
     location++;
   }
   console.log("failed to return the index for className : "+className)
   return -1;
 }

 function getTypesOfAllLabels(t,textIdentifier,surroundingText){
   var text = t
   if(textIdentifier == "id")
   {
     console.log("Text: "+text+" "+"The type is : "+document.getElementById(text).type)
     setAttribute(document.getElementById(text).type,"id",text,0)
     return 0
   }
   else if(textIdentifier == "name"){
     var nameIndex = getUniqueIndexOfClassOrName(t,surroundingText)
   console.log("Text: "+text+" "+"The type is : "+document.getElementsByName(text)[nameIndex].type+" Element is [\'"+nameIndex+"\']")
   console.log("Called")
   setAttribute(document.getElementsByName(text)[nameIndex].type,"name",text,nameIndex)
   return 0
   }
   //Other wise mush be a class
   else if(textIdentifier == "class"){
     var classIndex = getUniqueIndexOfClassOrName(t,surroundingText)
     console.log("Text: "+text+" "+"The type is : "+document.getElementsByClassName(text)[classIndex].type+" Element is [\'"+classIndex+"\']")
     setAttribute(document.getElementsByClassName(text)[classIndex].type,"class",text,classIndex)
     return 0
   }

 }

 function getSurroundingOutput(index){
   var o = ""
   for(var x = index; x < index+300; x++){
      o+=document.getElementsByTagName("body")[0].innerHTML[x]
    }
    //console.log(o)
    return o;
 }


 function getItemID(index){
     doc = document.getElementsByTagName("body")[0].innerHTML
     var submit = doc.substring(index,index+300)
     var submitID = submit.indexOf(" id=")
     if(submitID > 0){
       //Get the substring surround id, we start at +4 so we can capture the begining of the id
       var submitIDValue = submit.substring(submitID+5,submitID+200)
       //Capture the index of the second quote
       var quote2 = submitIDValue.indexOf("\"")
       //Log the id
       console.log("ID: "+submitIDValue.substring(0,quote2))
     return submitIDValue.substring(0,quote2)
     }
     else{
       return -1
     }
 }

 function getItemName(index){
   doc = document.getElementsByTagName("body")[0].innerHTML
   var nameArea = doc.substring(index,index+300)
   var viewName = nameArea.indexOf("name=")
   if(viewName > 0){
   var viewFullName = nameArea.substring(viewName+6,viewName+200)
   var nameClosingQuote = viewFullName.indexOf("\"")
   console.log("Name: "+viewFullName.substring(0,nameClosingQuote))
   return viewFullName.substring(0,nameClosingQuote)
 }
 else{
   return -1;
 }
 }

 function getItemClassName(index){
   var classDoc = document.getElementsByTagName("body")[0].innerHTML
   var classTextArea = classDoc.substring(index,index+300)
   var classEquals = classTextArea.indexOf("<div class=")
   if(classEquals > 0){
     //Get the substring surround id, we start at +4 so we can capture the begining of the id
     var className = classTextArea.substring(classEquals+12,classEquals+70)
     //console.log(className)
     //Capture the index of the second quote
     var classNameClosingQuote = className.indexOf("\"")
     console.log("Class Name: "+className.substring(0,classNameClosingQuote))
     return className.substring(0,classNameClosingQuote)
 }
 else{
   return -1
   }
 }

 function getButton(index){
   var foundNext = false;
   var foundSubmit = false;
   var classDoc = document.getElementsByTagName("body")[0].innerHTML
   var buttonArea= classDoc.substring(index,index+700)
   var buttonEnclosing = buttonArea.substring(0,buttonArea.indexOf("</button>"))
   var idCap = buttonEnclosing.indexOf(" id=")
   var nameCap = buttonEnclosing.indexOf("name=")
   var classCap = buttonEnclosing.indexOf("class=")
   if(idCap > -1){
     var shrunk1 = buttonEnclosing.substring(idCap+4,idCap+200)
     //Capture the index of the second quote
     var endQ1 = shrunk1.indexOf("\"")
     //Log the id
     console.log("Button ID: "+shrunk1.substring(0,endQ1))
   }
   else if(nameCap > -1){
     var shrunk2 = buttonEnclosing.substring(nameCap+6,nameCap+200)
     var endQ2 = shrunk2.indexOf("\"")
     console.log("Button Name: "+shrunk2.substring(0,endQ2))
   }
   else if(classCap > -1){
     var shrunk3 = buttonEnclosing.substring(classCap+7,classCap+80)
     var endQ3 = shrunk3.indexOf("\"")
     console.log("Button Class Name: "+shrunk3.substring(0,endQ3))
   }
   else{
     console.log("Could not identify button id,name, or class.")
   }
   if(buttonEnclosing.includes("submit") || buttonEnclosing.includes("Submit")){
     console.log("This is the submit button")
   }
   else if(buttonEnclosing.includes("next") || buttonEnclosing.includes("Next")){
     console.log("This is a next button")
   }
 }

 function printButtons(){
   var buttons = []
   buttons.push("Apply Now")
   buttons.push("Send Application")
   buttons.push("Apply")
   buttons.push("Next")
   var distanceFromLabel = []
   var posOfLabels = []
   var textOfLabel = []
   var doc =  document.getElementsByTagName("body")[0].innerHTML
   //first check to see if there is a submit button
   // Else find all buttons
   for(var pos = doc.indexOf("<button"); pos !== -1; pos = doc.indexOf("<button", pos + 1)) {
     //If the text has the words submit, or apply near by go ahead and submit
     //Else if the text has next or continue near it, go ahead and continue
     //console.log("Found button at pos "+pos)
     //indexToIDAndClass(pos,"button")
     //console.log("<----------------------------")
     //getSurroundingOutput(pos)
     //console.log("----------------------------")
     getButton(pos)
     //console.log("----------------------------/>")
   }
   // var submitIndex = doc.indexOf("type=\"submit\"")
   // if(submitIndex > -1)
   // {
   //   var submitClass = indexToIDAndClass(submitIndex,"submit")
   // }
 }
 function printLabels(){
   var doc =  document.getElementsByTagName("body")[0].innerHTML
   var list =  ["First","Last","Email","phone","Phone number","Phone #","Cellphone","Home Phone","Address","City","State","Province", "Zip","Postal","Work Status","Work Authorization","Country","hear","Resume","Cover","How did you hear about us","Institution Type","avail"]
   list.push("Institution Name")
   list.push("Degree Type")
   list.push("Field of Study")
   list.push("Major")
   list.push("Graduated")
   list.push("GPA")
   list.push("Expected Graduation Date")
   list.push("When do you graduate?")
   list.push("SSN")
   list.push("Birth Month")
   list.push("Day of Birth")
   list.push("start date")
   list.push("How Did You Hear About Us?")
   var distanceFromLabel = []

   for(var pos = doc.indexOf("<label"); pos !== -1; pos = doc.indexOf("<label", pos + 1)) {
         var predictedListItemIndex = 99999
         var predictedListItemDistance = 99999
           for(var x = 0; x < list.length; x++) {
             //Gives us distance of attribute relative to label must be greater than 0
             var distance = doc.indexOf(list[x])-pos
             //console.log("Distance between "+list[x]+" and pos is "+distance)
             if(distance > 0  && distance < predictedListItemDistance){
               //onsole.log("predictedListItemIndex is now "+x)
               predictedListItemIndex = x
               predictedListItemDistance = distance
             }
           }
           //console.log("Lowest value found was "+distance)
         if(predictedListItemIndex != 99999){
         textOfLabel.push(list[predictedListItemIndex])
         posOfLabels.push(predictedListItemDistance+pos)

       }
         list.splice(predictedListItemIndex,1)
   }
   console.log("Labels found : ")
   console.log(textOfLabel)
   console.log("The position of the value of the labels : ")
   console.log(posOfLabels)
   //console.log(indexToIDAndClass(posOfLabels[0]))
   for(var i = 0; i < posOfLabels.length; i++){
     var itemID = getItemID(posOfLabels[i])
     var itemName = getItemName(posOfLabels[i])
     var itemClass = getItemClassName(posOfLabels[i])
     if(itemID != -1){
       getTypesOfAllLabels(itemID,"id",getSurroundingOutput(posOfLabels[i]))
       console.log("\n")
       console.log("\n")
     }
     else  if(itemName != -1){
       getTypesOfAllLabels(itemName,"name",getSurroundingOutput(posOfLabels[i]))
       console.log("\n")
       console.log("\n")
     }
     else if(itemClass != -1){
       getTypesOfAllLabels(itemClass,"class",getSurroundingOutput(posOfLabels[i]))
       console.log("\n")
       console.log("\n")
         }
     else{
             console.log("No id, name or class associated with "+textOfLabel[i])
         }
       }
         console.log("*Note date always reverts back to YYYY-MM-dd")
 }

//Helper function that will find the openeing and closing
//Tag. Ensures that we don't find a wrong or incorrect id, class or name tag.
 function findOpeningAndClosingTagNearIndex(index){
   var start = index;
   var end = index;
   while(doc[start] != "<"){
     start--;
   }
   //console.log("Found starting tag at "+start)
   while(doc[end] != ">"){
     end++;
   }
   //console.log("Found end tag at "+end)
return [start,end]
 }

//Not finished
 function getIdClassOrNameOfResume(text){
   var rid = text.indexOf(" id=")
   var rclass = text.indexOf(" class=")
   var rname = text.indexOf(" name=")

     if(rid > -1){
       //Get the substring surround id, we start at +4 so we can capture the begining of the id
       var resumeID = text.substring(rid+5,rid+-1)
       //Capture the index of the second quote
       var resumeIDCQ = resumeID.indexOf("\"")
       //Log the id
       //console.log("ID: "+resumeID.substring(0,resumeIDCQ))
     return ["id",resumeID.substring(0,resumeIDCQ)]
   }else if(rclass > -1){
     //Get the substring surround id, we start at +4 so we can capture the begining of the id
     var resumeClass = text.substring(rclass+8,rclass+text.length-15)
     //console.log("Substring: "+resumeClass)
     var resumeClassClosingQuote = resumeClass.indexOf("\"")
     return ["class",resumeClass.substring(0,resumeClassClosingQuote)]
   }else if (rname > -1) {
     var resumeName = text.substring(rname+6,rname+text.length-6)
     var rnameClosingQuote = resumeName.indexOf("\"")
     //console.log("Name of resume: "+resumeName.substring(0,rnameClosingQuote))
     return ["name",resumeName.substring(0,rnameClosingQuote)]
   }
   else{
     console.log("found nothing")
     return "getIdClassOrNameOfResume","fail"
   }
}

 function findResumeTag(){
   var startAndEnd = [];
   var subtext = ""
   var command = ""
   var result = []
   var unique = 0
   console.log(indexOfDataFileType)
   for(var indexOfFileType = doc.indexOf("type=\"file\""); indexOfFileType !== -1; indexOfFileType = doc.indexOf("type=\"file\"", indexOfFileType + 1)) {
   if(indexOfFileType > -1){
     //We found a file upload area
     //Check to see if the surrounding text includes
     startAndEnd = findOpeningAndClosingTagNearIndex(indexOfFileType);
     subtext = "";
     for(i = startAndEnd[0]; i < startAndEnd[1]; i++){
       subtext+= doc[i]
     }
     if(subtext.includes("resume")){
     //console.log("Found resume at the following tag \n")
     //console.log(subtext)
     //console.log("Cmon cuh"+getIdClassOrNameOfResume(subtext))
     result = getIdClassOrNameOfResume(subtext)
     result[1] = result[1].replace(/\s/g, '');
     if(result[0] == "id"){
       command = "eventFire(document.getElementsById(\'"+result[1]+"\'), 'click')"
       console.log("id of resume: "+result[1])
        saveResume("resume",command)
        //return 0;
     }
     //If name, then we can save to text, the command for posting a resume
     else if(result[0] == "name"){
       unique = findResumeFromGroupOfNameAndClass(result[1],subtext)
      command = "eventFire(document.getElementsByName(\'"+result[1]+"\')["+unique+"], 'click')"
      console.log("name of resume: "+result[1])
       saveResume("resume",command)
       //return 0;
     }
     else if(result[0] == "class"){
       unique = findResumeFromGroupOfNameAndClass(result[1],subtext)
       console.log("Unique index of class is "+unique)
       command = "eventFire(document.getElementsByClassName(\'"+result[1]+"\')["+unique+"], 'click')"
       //console.log("class of resume: "+result[1])
        saveResume("resume",command)
       // return 0;
     }
   }
   if(subtext.includes("cover")){
     //console.log("Found resume at the following tag \n")
     //console.log(subtext)
     //console.log("Cmon cuh"+getIdClassOrNameOfResume(subtext))
     result = getIdClassOrNameOfResume(subtext)
     result[1] = result[1].replace(/\s/g, '');
     if(result[0] == "id"){
       command = "eventFire(document.getElementsById(\'"+result[1]+"\'), 'click')"
       console.log("id of cover: "+result[1])
        saveResume("cover",command)
        //return 0;
     }
     //If name, then we can save to text, the command for posting a resume
     else if(result[0] == "name"){
       unique = findOccurencesFromGroupOfNameAndClass(result[1],subtext)
      command = "eventFire(document.getElementsByName(\'"+result[1]+"\')["+unique+"], 'click')"
      console.log("name of cover: "+result[1])
       saveResume("cover",command)
     //  return 0;
     }
     else if(result[0] == "class"){
       unique = findOccurencesFromGroupOfNameAndClass(result[1],subtext)
       console.log("Unique index of class is "+unique)
       command = "eventFire(document.getElementsByClassName(\'"+result[1]+"\')["+unique+"], 'click')"
       //console.log("class of resume: "+result[1])
        saveResume("cover",command)
        //return 0;
     }
   }
   }
 }
 for(var indexOfDataFileType = doc.indexOf("data-file-types"); indexOfDataFileType !== -1; indexOfDataFileType = doc.indexOf("data-file-types", indexOfDataFileType + 1)) {
     startAndEnd = findOpeningAndClosingTagNearIndex(indexOfDataFileType);
     subtext = "";
     for(i = startAndEnd[0]; i < startAndEnd[1]; i++){
       subtext+= doc[i]
     }
     if(subtext.includes("resume")){
     //console.log("Found resume at the following tag \n")
     //console.log(subtext)
     //console.log("Cmon cuh"+getIdClassOrNameOfResume(subtext))
     result = getIdClassOrNameOfResume(subtext)
     result[1] = result[1].replace(/\s/g, '');
     if(result[0] == "id"){
       command = "eventFire(document.getElementsById(\'"+result[1]+"\'), 'click')"
       console.log("id of resume: "+result[1])
        saveResume("resume",command)
        //return 0;
     }
     //If name, then we can save to text, the command for posting a resume
     else if(result[0] == "name"){
       unique = findOccurencesFromGroupOfNameAndClass(result[1],subtext)
      command = "eventFire(document.getElementsByName(\'"+result[1]+"\')["+unique+"], 'click')"
      console.log("name of resume: "+result[1])
       saveResume("resume",command)
       //return 0;
     }
     else if(result[0] == "class"){
       unique = findOccurencesFromGroupOfNameAndClass(result[1],subtext)
       console.log("Unique index of class is "+unique)
       command = "eventFire(document.getElementsByClassName(\'"+result[1]+"\')["+unique+"], 'click')"
       //console.log("class of resume: "+result[1])
        saveResume("resume",command)
        //return 0;
     }
   }
   if(subtext.includes("cover")){
     //console.log("Found resume at the following tag \n")
     //console.log(subtext)
     //console.log("Cmon cuh"+getIdClassOrNameOfResume(subtext))
     result = getIdClassOrNameOfResume(subtext)
     result[1] = result[1].replace(/\s/g, '');
     if(result[0] == "id"){
       command = "eventFire(document.getElementsById(\'"+result[1]+"\'), 'click')"
       console.log("id of cover: "+result[1])
        saveResume("cover",command)
        //return 0;
     }
     //If name, then we can save to text, the command for posting a resume
     else if(result[0] == "name"){
       unique = findOccurencesFromGroupOfNameAndClass(result[1],subtext)
      command = "eventFire(document.getElementsByName(\'"+result[1]+"\')["+unique+"], 'click')"
      console.log("name of cover: "+result[1])
       saveResume("cover",command)
     //  return 0;
     }
     else if(result[0] == "class"){
       unique = findOccurencesFromGroupOfNameAndClass(result[1],subtext)
       console.log("Unique index of class is "+unique)
       command = "eventFire(document.getElementsByClassName(\'"+result[1]+"\')["+unique+"], 'click')"
       //console.log("class of resume: "+result[1])
        saveResume("cover",command)
        //return 0;
     }
   }
 }
   console.log("Done searching for Resume/Cover")
 }

 function findOccurencesFromGroupOfNameAndClass(div,text){
   var index = 0;
   for(var pos = doc.indexOf(div); pos !== -1; pos = doc.indexOf(div, pos + 1)) {
     var temp = findOpeningAndClosingTagNearIndex(pos)
     var tempText = ""
     for(var i = temp[0]; i < temp[1]; i++){
       tempText += doc[i]
     }
     console.log("Comparing temp: " + tempText + "\n")
     console.log("To target: "+text)
     if(tempText == text)
     {
       return index
     }
     index++
   }
   return -1
 }


//Function that saves a file to text (useful for resume)
function saveResume(fileName,text){
 var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
 saveAs(blob, fileName+".txt");
}

//Called by saveResume to actually download file
//function downloadFile(){
var saveAs = saveAs || (function(view) {
 "use strict";
 // IE <10 is explicitly unsupported
 if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
   return;
 }
 var
     doc = view.document
     // only get URL when necessary in case Blob.js hasn't overridden it yet
   , get_URL = function() {
     return view.URL || view.webkitURL || view;
   }
   , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
   , can_use_save_link = "download" in save_link
   , click = function(node) {
     var event = new MouseEvent("click");
     node.dispatchEvent(event);
   }
   , is_safari = /constructor/i.test(view.HTMLElement) || view.safari
   , is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
   , throw_outside = function(ex) {
     (view.setImmediate || view.setTimeout)(function() {
       throw ex;
     }, 0);
   }
   , force_saveable_type = "application/octet-stream"
   // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
   , arbitrary_revoke_timeout = 1000 * 40 // in ms
   , revoke = function(file) {
     var revoker = function() {
       if (typeof file === "string") { // file is an object URL
         get_URL().revokeObjectURL(file);
       } else { // file is a File
         file.remove();
       }
     };
     setTimeout(revoker, arbitrary_revoke_timeout);
   }
   , dispatch = function(filesaver, event_types, event) {
     event_types = [].concat(event_types);
     var i = event_types.length;
     while (i--) {
       var listener = filesaver["on" + event_types[i]];
       if (typeof listener === "function") {
         try {
           listener.call(filesaver, event || filesaver);
         } catch (ex) {
           throw_outside(ex);
         }
       }
     }
   }
   , auto_bom = function(blob) {
     // prepend BOM for UTF-8 XML and text/* types (including HTML)
     // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
     if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
       return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
     }
     return blob;
   }
   , FileSaver = function(blob, name, no_auto_bom) {
     if (!no_auto_bom) {
       blob = auto_bom(blob);
     }
     // First try a.download, then web filesystem, then object URLs
     var
         filesaver = this
       , type = blob.type
       , force = type === force_saveable_type
       , object_url
       , dispatch_all = function() {
         dispatch(filesaver, "writestart progress write writeend".split(" "));
       }
       // on any filesys errors revert to saving with object URLs
       , fs_error = function() {
         if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
           // Safari doesn't allow downloading of blob urls
           var reader = new FileReader();
           reader.onloadend = function() {
             var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
             var popup = view.open(url, '_blank');
             if(!popup) view.location.href = url;
             url=undefined; // release reference before dispatching
             filesaver.readyState = filesaver.DONE;
             dispatch_all();
           };
           reader.readAsDataURL(blob);
           filesaver.readyState = filesaver.INIT;
           return;
         }
         // don't create more object URLs than needed
         if (!object_url) {
           object_url = get_URL().createObjectURL(blob);
         }
         if (force) {
           view.location.href = object_url;
         } else {
           var opened = view.open(object_url, "_blank");
           if (!opened) {
             // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
             view.location.href = object_url;
           }
         }
         filesaver.readyState = filesaver.DONE;
         dispatch_all();
         revoke(object_url);
       }
     ;
     filesaver.readyState = filesaver.INIT;

     if (can_use_save_link) {
       object_url = get_URL().createObjectURL(blob);
       setTimeout(function() {
         save_link.href = object_url;
         save_link.download = name;
         click(save_link);
         dispatch_all();
         revoke(object_url);
         filesaver.readyState = filesaver.DONE;
       });
       return;
     }

     fs_error();
   }
   , FS_proto = FileSaver.prototype
   , saveAs = function(blob, name, no_auto_bom) {
     return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
   }
 ;
 // IE 10+ (native saveAs)
 if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
   return function(blob, name, no_auto_bom) {
     name = name || blob.name || "download";

     if (!no_auto_bom) {
       blob = auto_bom(blob);
     }
     return navigator.msSaveOrOpenBlob(blob, name);
   };
 }

 FS_proto.abort = function(){};
 FS_proto.readyState = FS_proto.INIT = 0;
 FS_proto.WRITING = 1;
 FS_proto.DONE = 2;

 FS_proto.error =
 FS_proto.onwritestart =
 FS_proto.onprogress =
 FS_proto.onwrite =
 FS_proto.onabort =
 FS_proto.onerror =
 FS_proto.onwriteend =
   null;

 return saveAs;
}(
    typeof self !== "undefined" && self
 || typeof window !== "undefined" && window
 || this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
 module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd !== null)) {
 define("FileSaver.js", function() {
   return saveAs;
 });
}
//}
