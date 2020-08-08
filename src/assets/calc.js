$(function () {
  $("#keyPad").draggable({
    start: function () {
      $(this).css({ height: "auto", width: "463px" });
    },
    stop: function () {
      $(this).css({ height: "auto", width: "463px" });
    },
  });

  $(".calc_min").live("click", function () {
    $("#mainContentArea").toggle();
    $("#keyPad_Help").hide();
    $("#keyPad_Helpback").hide();
    $(".help_back").hide();
    $("#keyPad").addClass("reduceWidth");
    $("#helptopDiv span").addClass("reduceHeader");
    //		$('#calc_min').toggleClass("reduceHeader");
    $(this).removeClass("calc_min").addClass("calc_max");
  });
  $(".calc_max").live("click", function () {
    $(this).removeClass("calc_max").addClass("calc_min");
    $("#mainContentArea").toggle();
    if ($("#helpContent").css("display") == "none") {
      $("#keyPad_Help").show();
    } else {
      $("#keyPad_Helpback").show();
    }
    $("#keyPad_Help").show();
    $("#keyPad").removeClass("reduceWidth");
    $("#helptopDiv span").removeClass("reduceHeader");
  });
});
$("#closeButton").click(function () {
  $("#loadCalc").hide();
});
/** new help changes **/
$("#keyPad_Help").live("click", function () {
  $(this).hide();
  $("#keyPad_Helpback").show();
  $(".text_container").hide();
  $(".left_sec").hide();
  $("#keyPad_UserInput1").hide();
  $("#helpContent").show();
});

$("#keyPad_Helpback").live("click", function () {
  $(this).hide();
  $("#keyPad_Help").show();
  $(".text_container").show();
  $(".left_sec").show();
  $("#keyPad_UserInput1").show();
  $("#helpContent").hide();
});

/** new help changes **/
