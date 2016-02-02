 var prompt = require('prompt');
 
 var numberToGuess = Math.floor(Math.random() * 10)
 console.log(numberToGuess)

 prompt.start();

 prompt.get("guess", function(err, result1) {
          var userGuess1 = result1.guess

          if (parseInt(userGuess1) === numberToGuess) {
             console.log("You win on the first try!");
             return;
          
          } else {   
                   prompt.get("guess", function(err, result2) {
                   var userGuess2 = result2.guess
                         
                         if (parseInt(userGuess2) === numberToGuess) {
                            console.log("You got it on the second try!");
                            return;
                          
                         } else {
            
                                  prompt.get('guess', function (err, result3) {
                                  var userGuess3 = result3.guess
                      
                                      if (parseInt(userGuess3) === numberToGuess) {
                                         console.log("Finally!");
                                         return;
                                     
                                      } else {
                                              console.log("Maybe next time. Here are the numbers you tried: " + userGuess1 + ", " + userGuess2 + " and "+ userGuess3);
                                              return;
                                      }
                                  });
                                 }
                    });

                 }
 });
 
 