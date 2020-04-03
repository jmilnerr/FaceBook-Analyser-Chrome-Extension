function clearUserInput() {
   document.getElementById('usr_txt').value = ""
}

//Sæt nødvendige variabler
var usr_txt = ""
var arr = []
var arr_size = 0

async function process_query() {

   //Gammelt UI
   //usr_txt = document.getElementById('usr_txt').value;
   //document.getElementById('usr_txt').disabled = true
   //document.getElementById('usr_txt').style.backgroundColor = "lightgrey"

   if (usr_txt != "") {

     //Forbered brugerinput: små bogstaver, fjern specialtegn og del ved mellemrum
     lowered = usr_txt.toLowerCase()
     lowered = lowered.replace(/(\.|\,|\!)/g, '');
     var str = lowered.split(" ")

     if (str.length > 100) {
        str = str.splice(Math.max(str.length - 100, 0)) // maxlen = 100
     }

     //Tokenize brugerinput
     for (var i = 0; i < str.length; i++){
        for (var key in obj) {
           if (obj.hasOwnProperty(key)) {
              if (key == str[i]) {
                 arr.push(obj[key])
              }
           }
        }
     }

     arr_size = arr.length
     while (arr_size < 100) {
        arr.push(0)
        arr_size++;
     }

     //Sørg for det rigtige format
     var padded = [arr]

     const model = await tf.loadLayersModel('http://127.0.0.1:8080/model.json');
     const input = tf.tensor(padded)
     const prediction = model.predict(input)
     const score = prediction.dataSync()[0];

     const results = document.getElementById("res");

     results.innerHTML = "Resultat: <b>" + score + "</b>";

     /* WHAT TO DO NEXT? */
     if (score > 0.5) {
       document.getElementById('res_bg').style.backgroundColor = "green";
     } else {
       document.getElementById('res_bg').style.backgroundColor = "red";
     }

     //Klargør til ny forespørgsel
     arr = []
      
     //Gammelt UI
     //document.getElementById('usr_txt').disabled = false
     //document.getElementById('usr_txt').style.backgroundColor = "white";

   } else { 
      alert('Tekstfeltet er tomt!') 
   }
}
