$(function () {

  $('#keyPad').live('mousemove',function(){
    //Make the DIV element draggagle:
    dragElement(document.getElementById("keyPad"));
  });
});

$("#closeButton").live("click", function () {
   let clsBtn = document.getElementById("keyPad");
    if (clsBtn.style.display === "none") {
      clsBtn.style.display = "block";
    } else {
      clsBtn.style.display = "none";
    }
});
/** new help changes **/
$("#keyPad_Help").on("click", function () {
  $(this).hide();
  $("#keyPad_Helpback").show();
  $(".text_container").hide();
  $(".left_sec").hide();
  $("#keyPad_UserInput1").hide();
  $("#helpContent").show();
});

$("#keyPad_Helpback").on("click", function () {
  $(this).hide();
  $("#keyPad_Help").show();
  $(".text_container").show();
  $(".left_sec").show();
  $("#keyPad_UserInput1").show();
  $("#helpContent").hide();
});

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/** new help changes **/
