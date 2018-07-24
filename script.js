$(function(){

    function today() {//we bring in today's history
        var time = new Date();
        var months = new Array('01','02','03','04','05','06','07','08','09','10','11','12');//list of months
        var date = ((time.getDate()<10) ? "0" : "")+ time.getDate();
        function convert(number) {//year translation
          return (number < 1000) ? number + 1900 : number;
        }
        var today = (convert(time.getYear()))+"-"+ months[time.getMonth()] + "-" +date ;//typing using hyphen
        return today;
      }


    function timeCalculation(){
        var totalTime=50;//total time

        var day = 1000*60*60*24;//how many seconds in a day
        date1 = new Date(today());
        date2 = new Date("2018-08-25");//the last day
    
    
        var diff = (date2.getTime()- date1.getTime())/day;//we find the difference as the day
        return diff/totalTime;//Number from 0.0 to 1.0
        

    }

    

    var barLine = new ProgressBar.Line(containerLine, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1400,//time
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'},
        text: {
          style: {
            // Text color.
            // Default: same as stroke color (options.color)
            color: '#999',
            position: 'absolute',
            right: '0',
            top: '30px',
            padding: 0,
            margin: 0,
            transform: null
          },
          autoStyleContainer: false
        },
        from: {color: '#FFEA82'},//color starter
        to: {color: '#ED6A5A'},//color finisher
        step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
            bar.setText(Math.round(bar.value() * 100) + ' %');
        }
      });
      
      barLine.animate(1-timeCalculation());  // Number from 0.0 to 1.0

      var appArray=[];

      $('#btnSubmit').click(function(){
        appArray = localStorage.getItem('app') ? JSON.parse(localStorage.getItem('app')) : []//localstorage control

        //assigning applications to an object
        var app={
            name:$('#inputName').val(),
            surname:$('#inputSurname').val(),
            mail:$('#inputEmail').val()
        }
        
        appArray.push(app);
        
        localStorage.setItem('app',JSON.stringify(appArray));

        addAppToList();
        location.reload();//refresh the page
      })

      function addAppToList(){
        var appArray=JSON.parse(localStorage.getItem('app'));//json parsing localStorage data
        $( "#ulList" ).empty();//clear <ul> tag
        appArray.forEach(element => {
            $('#ulList').append('<li class="list-group-item">'+element.name+' '+element.surname+'</li>')//Write the data to the <li> tag
        });
        
       }
       addAppToList();

       function solidityRatio(){
           var quota=50;

           appArray = localStorage.getItem('app') ? JSON.parse(localStorage.getItem('app')) : []

           var number=appArray.length;//find number of applications

           return number/quota;//find the application rate by quotac
       }

       var barCircle = new ProgressBar.Circle(containerCircle, {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        from: { color: '#aaa', width: 1 },
        to: { color: '#333', width: 4 },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
      
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }
      
        }
      });
      barCircle.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';//font family
      barCircle.text.style.fontSize = '2rem';//font size
      
      barCircle.animate(solidityRatio());  // Number from 0.0 to 1.0
})