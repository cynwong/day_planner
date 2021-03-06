"use strict"

$(document).ready(function(){

    const currentMoment = new Calendar();
    const renderer= new DayViewRenderer(currentMoment);
    let secondsLeft; 
    
    /**
     * reset calendar view
     */
    function resetDisplay() {
        const presentDescription = $(".present");
        const nextDescription = presentDescription.parent().next(".row").children(".description");
        
        nextDescription.removeClass(renderer._CLASSNAME_FUTURE).addClass(renderer._CLASSNAME_PRESENT);
        presentDescription.removeClass(renderer._CLASSNAME_PRESENT).addClass(renderer._CLASSNAME_PAST);

        setNextTimer();
    }

    function setNextTimer (){
        if(currentMoment.isToday === true && moment().hour() > renderer._startHour && moment().hour() < renderer._endHour) {
            // if same day, re-render the page every hours
            currentMoment.resetCalendar();
            secondsLeft = currentMoment.getTimeLeft;
            console.log("Next refresh in ", secondsLeft);
            setTimeout(resetDisplay,secondsLeft);
        }
    }
    
    //init
    renderer.displayDate();
    renderer.renderDayView();
    setNextTimer();

    function saveEvent(element){
        const hour = element.siblings(".hour").attr("data-hour");
        let description;
        if(element.hasClass("description")){
            //if element is description box
            description = element.children("textarea").val();
        }else {
            //if element is save button
            description = element.siblings(".description").children("textarea").val();
        }
        
        currentMoment.saveEvent(hour, description);
    }
    // =====================
    //  Event Listeners
    // =====================
    $(".saveBtn").click( function(){
        saveEvent($(this));
    });
    
    $(".description").keydown(function(event){
        // command key + s or ctrl + s
        if((event.metaKey && event.key === "s")||(event.ctrlKey && event.key === "s")){
            event.preventDefault();
            saveEvent($(this));
        }
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