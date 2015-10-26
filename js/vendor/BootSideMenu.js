(function ($) {
  'use strict';

  $.fn.BootSideMenu = function (options) {
    var oldCode,
      newCode = "",
      settings = $.extend({
        side: "left",
        autoClose: false
      },
      options),
      autoClose = settings.autoClose,
      side = settings.side;

    oldCode = this.html();

		  newCode += "<div class=\"row\">\n";
		  newCode += oldCode + "\n";
		  newCode += "</div>";
		  newCode += "<div class=\"toggler\">\n";
		  newCode += "	<span class=\"glyphicon glyphicon-chevron-right\">&nbsp;</span> <span class=\"glyphicon glyphicon-chevron-left\">&nbsp;</span>\n";
		  newCode += "</div>\n";

    this.html(newCode);

    if (autoClose) {
      $(this).find(".toggler").trigger("click");
    }
  };
  
  //Animation
  function doAnimation(container, containerWidth, sidebarSide, sidebarStatus) {
    var toggler = container.children()[1];
    if (sidebarStatus === "opened") {
      if (sidebarSide === "left") {
        container.animate({ left: -(containerWidth + 2) });
        toggleArrow(toggler, "left");
      } else if (sidebarSide === "right") {
        container.animate({ right: -(containerWidth + 2) });
        toggleArrow(toggler, "right");
      }
      container.attr('data-status', 'closed');
    } else {
      if (sidebarSide === "left") {
        container.animate({ left: 0 });
        toggleArrow(toggler, "right");
      } else if (sidebarSide === "right") {
        container.animate({ right: 0 });
        toggleArrow(toggler, "left");
      }
      container.attr('data-status', 'opened');
    }
  }

  function toggleArrow(toggler, side) {
    if (side === "left") {
      $(toggler).children(".glyphicon-chevron-right").css('display', 'block');
      $(toggler).children(".glyphicon-chevron-left").css('display', 'none');
    } else if (side === "right") {
      $(toggler).children(".glyphicon-chevron-left").css('display', 'block');
      $(toggler).children(".glyphicon-chevron-right").css('display', 'none');
    }
  }
    
	 //Decide which side menu is based.
	 function getSide(listClass) {
    var side;

    for (var i = 0; i < listClass.length; i++) {
      if (listClass[i] === 'sidebar-left') {
          side = "left";
          break;
      } else if (listClass[i] === 'sidebar-right') {
          side = "right";
          break;
      } else {
          side = null;
      }
    }
    return side;
  }
   
	 $(document).ready(function () {
	   $(document).on('click', '.toggler', function () {
	     var toggler = $(this),
        container = toggler.parent(),
        listClass = container[0].classList,
        side = getSide(listClass),
        containerWidth = container.width(),
        status = container.attr('data-status');

	     if (!status) {
	       status = "opened";
	     }
	     doAnimation(container, containerWidth, side, status);
	   });
	 });
}( jQuery ));

