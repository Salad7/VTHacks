var myChart
function destroyChart(){
  if (myChart != null){
    myChart.destroy()
  }
}
function doubleGraph(um,jm){
  destroyChart()
  var ctx = document.getElementById("myChart").getContext('2d');
  var userMentions = JSON.parse("[" + um + "]");
  var jobMentions = JSON.parse("[" + jm + "]");
 myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Accolades", "Involvement", "Creative Nature", "Leadership", "Passion", "Previous Experience","Teamwork"],
          datasets: [{
              label: 'Your mentions',
              data: userMentions,
              backgroundColor: [
                  'rgba(68, 138, 255, 0.4)',
                  'rgba(68, 138, 255, 0.4)',
                  'rgba(68, 138, 255, 0.4)',
                  'rgba(68, 138, 255, 0.4)',
                  'rgba(68, 138, 255, 0.4)',
                  'rgba(68, 138, 255, 0.4)',
                  'rgba(68, 138, 255, 0.4)'
              ],
              borderColor: [
                'rgba(68, 138, 255, 0.2)',
                'rgba(68, 138, 255, 0.2)',
                'rgba(68, 138, 255, 0.2)',
                'rgba(68, 138, 255, 0.2)',
                'rgba(68, 138, 255, 0.2)',
                'rgba(68, 138, 255, 0.2)',
                'rgba(68, 138, 255, 0.2)'
              ],
              borderWidth: 1
          },{
              label: 'Application mentions',
              data: jobMentions,
              backgroundColor: [
                  'rgba(0, 209,178, 0.4)',
                  'rgba(0, 209,178, 0.4)',
                  'rgba(0, 209,178, 0.4)',
                  'rgba(0, 209,178, 0.4)',
                  'rgba(0, 209,178, 0.4)',
                  'rgba(0, 209,178, 0.4)',
                  'rgba(0, 209,178, 0.4)'
              ],
              borderColor: [
                'rgba(0, 209,178, 0.2)',
                'rgba(0, 209,178, 0.2)',
                'rgba(0, 209,178, 0.2)',
                'rgba(0, 209,178, 0.2)',
                'rgba(0, 209,178, 0.2)',
                'rgba(0, 209,178, 0.2)',
                'rgba(0, 209,178, 0.2)'
              ],
              borderWidth: 1
          }
        ]
      },
      options: {
          scales: {
              yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: '# Of Trait Mentions'
                  },
                  ticks: {
                      beginAtZero:true
                  }
              }],
              xAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Skill/Trait'
                  },
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });


}
