Vue.createApp({

    methods: {

        createPieSlice(percentage, color, startAngle) {
            const svgNS = "http://www.w3.org/2000/svg";
            // Uträkningen för hur stora pajbitarna är i förhållande till varandra
            var path = document.createElementNS(svgNS, "path");
            var angle = (percentage * 360) / 100;
            // Sätter värdet för nästa pajbits genom att ta startvärdet, 90, + vinkeln på föregående pajbit
            var endAngle = startAngle + angle;
            // När värden överstiger 180 grader övergår ritandet av bitar från högersidan till vänstersidan
            var largeArc = angle > 180 ? 1 : 0;
            // Räknar varje bits gradtal enligt procenten vi fick tidigare från protein, sugar, carbs.
            var startX = 16 + Math.cos((startAngle * Math.PI) / 180) * 16;
            var startY = 16 + Math.sin((startAngle * Math.PI) / 180) * 16;
            var endX = 16 + Math.cos((endAngle * Math.PI) / 180) * 16;
            var endY = 16 + Math.sin((endAngle * Math.PI) / 180) * 16;

            // Magidelen. M16,16 är mitten av cirkeln som kommer skapas
            // L ritar en linje från M värdet i mitten ut till koordinaterna i startX och startY rakt ovanför M men 16 enheter upp
            // A ritar den elliptiska banan mellan startXY till endXY
            // Om largeArc har värdet 1 förstår programmet att det är en pajbit större än 180 grader och ritar pajbiten motsols
            // När totalvärdet når 360 är cirkeln sluten. Detta är även var Z befinner sig som säger åt programmet att sluta rita diagrammet.
            var pathData = `M16,16 L${startX},${startY} A16,16 0 ${largeArc},1 ${endX},${endY} Z`;
            path.setAttribute("d", pathData);
            path.setAttribute("fill", color);
            return path;
        },
        generatePieSVG(proteinPercentage, sugarPercentage, carbsPercentage) {
          
            // Tittar efter existerande cirkeldiagram och om där, tar bort befintlig
            const existingSVGs = document.querySelectorAll("#app svg");
            existingSVGs.forEach(svg => svg.remove());

            // Vad jag förstår nödvändiga steg för att SVG element ska fungera alls
            // Skapar ett nytt SVG element med namnet svg
            var svgNS = "http://www.w3.org/2000/svg";
            var svg = document.createElementNS(svgNS, "svg");

            // Ger värdet för storleken till själva cirkeldiagrammet
            svg.setAttribute("viewBox", "0 0 32 32");
            svg.setAttribute("width", "150");
            svg.setAttribute("height", "150");

       

            // tar värdena från måltiden när den väljs och ställer om dessa från noll till givet värde
            var protein = this.selectedMeal.protein || 0;
            var sugar = this.selectedMeal.sugar || 0;
            var carbs = this.selectedMeal.carbs || 0;

            // Räknar ut procenten av alla variabler istället för råa siffror
            // då detta gör ritandet av pajbitar oändligt mycket lättare
            var total = protein + sugar + carbs;
            var proteinPercentage = (protein / total) * 100;
            var sugarPercentage = (sugar / total) * 100;
            var carbsPercentage = (carbs / total) * 100;
            // Olika färger till pajbitarna. Sätt till motsvarande färg i kommande inforuta
            var colors = ["#ff6384", "#36a2eb", "#ffce56"];

            // Ser till att första pajbiten startar i vertikal linje uppåt
            let startAngle = -90;

            // Skapar själva pajbitarna
            const proteinSlice = this.createPieSlice(proteinPercentage, colors[0], startAngle);
            startAngle += (proteinPercentage * 360) / 100;
            const sugarSlice = this.createPieSlice(sugarPercentage, colors[1], startAngle);
            startAngle += (sugarPercentage * 360) / 100;
            const carbsSlice = this.createPieSlice(carbsPercentage, colors[2], startAngle);

            svg.appendChild(proteinSlice);
            svg.appendChild(sugarSlice);
            svg.appendChild(carbsSlice);

            const nutrientsAndSVGContainer = document.getElementById("nutrientsandsvg");
           
            nutrientsAndSVGContainer.appendChild(svg);

        },
      
  
        updateSelectedFood(category) {
            if (category !== 'Appetizers') this.selectedAppetizer = '';
            if (category !== 'Main Courses') this.selectedMainCourse = '';
            if (category !== 'Desserts') this.selectedDessert = '';

            //Får frälsares(euklides) spawn
            this.isOptionSelected = true;
        },

        toggleMealList(meal) {
            const clickedMealIndex = this.plannedMeals.findIndex(m => m === meal);
            this.plannedMeals.forEach((otherMeal, index) => {
              if (index !== clickedMealIndex) {
                otherMeal.isOpen = false;
              }
            });
        
            meal.isOpen = !meal.isOpen;
          
          },
        // togglePieRender() { 
        //     this.isPieActive = !this.isPieActive; 
        //     console.log;
        // },
        printPie(){
            this.isPieActive = true;
        },
        resetPlannedMeals() {
          this.plannedMeals.forEach((meal, index) => {
              if (meal.isOpen) {
                  this.plannedMeals.splice(index, 1);
              }
          });
          this.mealCounter = 0;
      },
    },

    computed: {
     
        hasPlannedMeals() {
            return this.plannedMeals.length > 0;
          },
        filteredAppetizers() {
            return this.foodData.filter(food => food.category === 'Appetizers');
        },
        filteredMainCourses() {
            return this.foodData.filter(food => food.category === 'Main Courses');
        },
        filteredDesserts() {
            return this.foodData.filter(food => food.category === 'Desserts');
        },
        selectedMeal() {
            const selected = this.selectedAppetizer || this.selectedMainCourse || this.selectedDessert;

            return this.foodData.find(food => food.meal === selected);
        },
        foodListOpacity() {
            return this.plannedMeals.length >= 1 ? 1 : 0;
        },
        // combineAllData() {
        //     let AllcombinedData = { protein: 0, sugar: 0, carbs: 0 };
        //     this.plannedMeals.forEach(meal => {
        //         meal.meals.forEach(mealName => {
        //             const selectedMeal = this.foodData.find(food => food.meal === mealName);
        //             if (selectedMeal) {
        //               AllcombinedData.protein += selectedMeal.protein || 0;
        //               AllcombinedData.sugar += selectedMeal.sugar || 0;
        //               AllcombinedData.carbs += selectedMeal.carbs || 0;
        //             }
        //         });
        //     });
        //     return combinedData;
        // },
        combinedDataAllMeals() {
            let combinedData = { protein: 0, sugar: 0, carbs: 0 };
            this.plannedMeals.forEach(meal => {
                meal.meals.forEach(mealName => {
                    const selectedMeal = this.foodData.find(food => food.meal === mealName);
                    if (selectedMeal) {
                        combinedData.protein += selectedMeal.protein || 0;
                        combinedData.sugar += selectedMeal.sugar || 0;
                        combinedData.carbs += selectedMeal.carbs || 0;
                    }
                });
            });
            return combinedData;
        },
        combinedData() {
          let combinedData = { protein: 0, sugar: 0, carbs: 0 };
      
          this.plannedMeals.forEach(meal => {
              if (meal.isOpen) { // Gamla combined data slängde ihop alla värden. nya slänger ihop värden om öppen.
                  meal.meals.forEach(mealName => {
                      const selectedMeal = this.foodData.find(food => food.meal === mealName);
                      if (selectedMeal) {
                          combinedData.protein += selectedMeal.protein || 0;
                          combinedData.sugar += selectedMeal.sugar || 0;
                          combinedData.carbs += selectedMeal.carbs || 0;
                      }
                  });
              }
          });
      
          return combinedData;
      },
        addMealToList() {
          let mealName = null;
        
          if (this.mealCounter === 0 || mealName === "" ){
            mealName = prompt("Choose a name for planned meal!");
          }
        
          const existingMeal = this.plannedMeals.find(meal => meal.meals.includes(this.selectedMeal.meal));
          if (existingMeal) {
            alert("Meal already exists in the list!");
            return;
          }
        
          const lastPlannedMeal = this.plannedMeals[this.plannedMeals.length - 1];
          if (lastPlannedMeal && lastPlannedMeal.meals.length < 3) {
            // Add meal to the last planned meal
            lastPlannedMeal.meals.push(this.selectedMeal.meal);
        } else {
          const isOpenMeal = this.plannedMeals.find(meal => meal.isOpen);
          if (isOpenMeal) {
            isOpenMeal.isOpen = false; // stäng
          }

            // Create a new planned meal if the last one is full or undefined
            const newPlannedMeal = {
                name: mealName,
                meals: [this.selectedMeal.meal],
                isOpen: true,
            };
        
            this.plannedMeals.push(newPlannedMeal);
        }
          console.log(this.plannedMeals);
          this.mealCounter = (this.mealCounter + 1) % 3;
      },
          combinedOnOpenPieSVG() {
            if(this.isPieActive === true){
                
            const svgNS = "http://www.w3.org/2000/svg";
            // Calculate percentages for combined chart
            var totalCombined = this.combinedData.protein + this.combinedData.sugar + this.combinedData.carbs;
        
            // Colors for combined chart
            var combinedColors = ["#ff9999", "#66b3ff", "#99ff99"];
        
            // Create SVG container for combined chart
            const combinedSVG = document.createElementNS(svgNS, "svg");
            combinedSVG.setAttribute("viewBox", "0 0 32 32");
            combinedSVG.setAttribute("width", "150");
            combinedSVG.setAttribute("height", "150");
        
            // Clear previous content
            const combinedPieChartContainer = document.getElementById("combinedPieChart");
            combinedPieChartContainer.innerHTML = '';
        
            // Create separate SVG elements for combined chart
            var combinedStartAngle = -90;
            for (let nutrient of ["protein", "sugar", "carbs"]) {
                let percentage = (this.combinedData[nutrient] / totalCombined) * 100;
                let slice = this.createPieSlice(percentage, combinedColors[["protein", "sugar", "carbs"].indexOf(nutrient)], combinedStartAngle); // Access color based on nutrient index
                combinedStartAngle += percentage * 360 / 100;
                combinedSVG.appendChild(slice); // Append to the combined SVG
            }
        
            // Append the combined SVG to the container
            combinedPieChartContainer.appendChild(combinedSVG);
             this.isPieActive =false; // av någon anledning behövs denna för att kunna använda generate Pie here knappen två gånger.
        }
    },
            // Same code as method above but
            combinedOnOpenPieAllMealsSVG() {
            if (this.isPieActive === true) {
          
              const svgNS = "http://www.w3.org/2000/svg";
          
              var totalCombined = this.combinedDataAllMeals.protein + this.combinedDataAllMeals.sugar + this.combinedDataAllMeals.carbs;
          
              var combinedColors = ["#ff9999", "#66b3ff", "#99ff99"];
          
              const combinedSVG = document.createElementNS(svgNS, "svg");
              combinedSVG.setAttribute("viewBox", "0 0 32 32");
              combinedSVG.setAttribute("width", "150");
              combinedSVG.setAttribute("height", "150");
          
              const combinedPieChartContainer = document.getElementById("combinedPieChart");
              combinedPieChartContainer.innerHTML = "";
        
              var combinedStartAngle = -90;
              for (let nutrient of ["protein", "sugar", "carbs"]) {
                let percentage = (this.combinedDataAllMeals[nutrient] / totalCombined) * 100;
                let slice = this.createPieSlice(percentage, combinedColors[["protein", "sugar", "carbs"].indexOf(nutrient)], combinedStartAngle); 
                combinedStartAngle += percentage * 360 / 100;
                combinedSVG.appendChild(slice); 
              }
          
              combinedPieChartContainer.appendChild(combinedSVG);
          
              this.isPieActive = false; 
            }
          },
//     combinedAllPieSVG() {
//       if(this.isPieActive === true){
          
//       const svgNS = "http://www.w3.org/2000/svg";
//       // Calculate percentages for combined chart
//       var totalCombined = this.combineAllData.protein + this.combineAllData.sugar + this.combineAllData.carbs;
  
//       // Colors for combined chart
//       var combinedColors = ["#ff9999", "#66b3ff", "#99ff99"];
  
//       // Create SVG container for combined chart
//       const allCombinedSVG = document.createElementNS(svgNS, "svg");
//       allCombinedSVG.setAttribute("viewBox", "0 0 32 32");
//       allCombinedSVG.setAttribute("width", "150");
//       allCombinedSVG.setAttribute("height", "150");
  
//       // Clear previous content
//       const AllPieChartContainer = document.getElementById("allCombinedData");
//       AllPieChartContainer.innerHTML = '';
  
//       // Create separate SVG elements for combined chart
//       var combinedStartAngle = -90;
//       for (let nutrient of ["protein", "sugar", "carbs"]) {
//           let percentage = (this.combineAllData[nutrient] / totalCombined) * 100;
//           let slice = this.createPieSlice(percentage, combinedColors[["protein", "sugar", "carbs"].indexOf(nutrient)], combinedStartAngle); // Access color based on nutrient index
//           combinedStartAngle += percentage * 360 / 100;
//           combinedSVG.appendChild(slice); // Append to the combined SVG
//       }
  
//       // Append the combined SVG to the container
//       AllPieChartContainer.appendChild(combinedSVG);
//       //  this.isPieActive = false; // av någon anledning behövs denna för att kunna använda generate Pie here knappen två gånger.
//   }
// },


    },

    data() {
        return {
            //Får frälsares (euklides) spawn
            
            isOptionSelected: false,
            isPieActive:false,
            title: "Euclidian Foods",
            selectedAppetizer: '',
            selectedMainCourse: '',
            selectedDessert: '',
            mealCounter: 0,
            foodData: [],   
            plannedMeals: [],
            selectedMealsForPie: [],
            foodListOpacity: 1,
            

        };
    },
    mounted() {

        fetch('food.json')
            .then(response => response.json())
            .then(data => {
                this.foodData = data.fooddata;


            })
            .catch(error => {
                console.error('Error loading food data:', error);
            });

    }
}).mount('#app');