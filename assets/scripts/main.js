

$(document).ready(function(){

    let secondLeftToNextHour;
    let currentMoment = new Calendar();
    let currentRenderer= new dayCalendarRenderer(currentMoment);
    
    //init
    currentRenderer.resetDisplay();


    // =====================
    //  Event Listeners
    // =====================
    $(".saveBtn").click( function(){
        const hour = $(this).siblings(".hour").attr("data-hour");
        const description = $(this).siblings(".description").children("textarea").val();
        currentMoment.saveEvent(hour, description);
    });
    

});


/* User interaction with calendar
// user click in description box to add event description 
// then click "save button" to save the event => modify the events object and save the events to localstorage
// If the day is today, Calendar should have a function that 
//              * get the current minutes and seconds 
//              * and calculate secondremaining to next hour
                * use setTimeout to fire up the callback function to re-render the calendar. 
                * calendar need to change the color that show current hour. 

*/