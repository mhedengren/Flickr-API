$(document).ready(function() {
  
    //Toggle float on all images in wrapper
    $("#float").on('click', function(){
        $("#flexbox").removeClass('active');
        $("#float").addClass('active');
        $(".column-wrapper-flex").removeClass('column-wrapper-flex');
        $(".column-wrapper").addClass('column-wrapper-float');
        $(".column").addClass('column-float').removeClass('column');
    });

    //Toggle flexbox on all images in wrapper
    $("#flexbox").on('click', function(){
        $("#float").removeClass('active');
        $("#flexbox").addClass('active');
        $(".column-wrapper-float").removeClass('column-wrapper-float');
        $(".column-wrapper").addClass('column-wrapper-flex');
        $(".column-float").removeClass('column-float').addClass('column');
    });
    
    //Press enter to search
    $("#myInput").keypress(function(event) {
        if ( event.keyCode == 13) {
            if($(this).val() !== '' ) {
            var searchvalue = $(this).val();  
            apiCall(searchvalue);
        } else {
            alert("Value needed!")
        }
    }
    });

    //Virtual-keyboard search for mobile devices
    if (window.matchMedia('(max-width: 767px)').matches) {
        $('input').on('focusout', function(e) {
            var searchvalue = $("#myInput").val();
            apiCall(searchvalue);
        });        
    }
    
    //Runs the API-Call, value from input thrown in as parameter.
    function apiCall(searchvalue){
        //Empty wrapper after each new search.
        $('.column-wrapper').empty();
        //Show the loading animation
        $(".load").show();
        //Show flex/float buttons
        $(".buttons").show();
        $.getJSON("https://www.flickr.com/services/feeds/photos_public.gne?tags='"+searchvalue+"'&format=json&jsoncallback=?", function(data) { 
        $(".load").hide();
        //List is same things as data.items which contains the info needed.
        list = data.items;
            //Loop through items and display on screen.
            $.each(data.items, function(index, item){ 
                /*Column wrapper is flex by default, if float is toggled, it will print floated columns.
                 If column-wrapper-flex exists, print column, else print column-float. */
                if ($(".column-wrapper-flex").length){
                    var column = $('<div>').attr("id", index).addClass('column').appendTo('.column-wrapper');
                } else {
                    var column = $('<div>').attr("id", index).addClass('column-float').appendTo('.column-wrapper');
                }
                $('<img>').addClass('img-fluid').attr('src',item.media.m).appendTo(column);    
         });   

         //Action defined in handler
         $(".column, .column-float").on("click", {
         }, handler); 

        }  
    );}

    //Define empty variable list. Fills when apiCall function is called.
    var list = [];

     //Handler for the .column onclick in apiCall.
    function handler(e) {

    //id of the column that is clicked.
    let item = list[$(this).attr('id')];

    //Empty the dialog after each new onclick.
    $('#dialog').empty();
    //Dialog
    $( "#dialog" ).dialog({
        title: '',
        position: { my: 'top', at: 'top+75', of:window },
        closeOnEscape: true,
        width: 375,
        modal: true,
    });

    //Append stuff to dialog.
    $('<h2>').text(item.title).appendTo("#dialog");
    $('<img>').addClass('img-fluid').attr('src',item.media.m).appendTo("#dialog");

    }

});