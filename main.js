Vue.createApp({

    methods: {
        generatePieSVG() {

            // Tittar efter existerande cirkeldiagram och om där, tar bort befintlig
            const existingSVGs = document.querySelectorAll("#app svg");
            existingSVGs.forEach(svg => svg.remove());
            
            // Vad jag förstår nödvändiga steg för att SVG element ska fungera alls
            // Skapar ett nytt SVG element med namnet svg
            var svgNS = "http://www.w3.org/2000/svg";
            var svg = document.createElementNS(svgNS, "svg");

            // Ger värdet för storleken till själva cirkeldiagrammet
            svg.setAttribute("viewBox", "0 0 32 32");
            svg.setAttribute("width", "100"); 
            svg.setAttribute("height", "100");

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

                // Uträkningen för hur stora pajbitarna är i förhållande till varandra
                var createPieSlice = (percentage, color, startAngle) => {
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
            };

            // Ser till att första pajbiten startar i vertikal linje uppåt
            let startAngle = -90; 

            // Skapar själva pajbitarna
            const proteinSlice = createPieSlice(proteinPercentage, colors[0], startAngle);
            startAngle += (proteinPercentage * 360) / 100;
            const sugarSlice = createPieSlice(sugarPercentage, colors[1], startAngle);
            startAngle += (sugarPercentage * 360) / 100;
            const carbsSlice = createPieSlice(carbsPercentage, colors[2], startAngle);

            svg.appendChild(proteinSlice);
            svg.appendChild(sugarSlice);
            svg.appendChild(carbsSlice);

            document.querySelector("body").appendChild(svg);
            document.querySelector("#app").appendChild(svg);
        },
        updateSelectedFood(category) {
            if (category !== 'Appetizers') this.selectedAppetizer = '';
            if (category !== 'Main Courses') this.selectedMainCourse = '';
            if (category !== 'Desserts') this.selectedDessert = '';

            //Plockar fram cirkeldiagrammet efter att ett alternativ valts
            this.isOptionSelected = true;
        }
        
    },
    computed: {
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
        }
    },

    data() {
        return {
            //Gömmer första cirkeldiagrammet
            isOptionSelected: false,

            title: "Euclidian foods",
            selectedAppetizer: '',
            selectedMainCourse: '',
            selectedDessert: '',
            foodData: [

                {
                    //Appetizers
                    category: 'Appetizers',
                    meal: 'Bruschetta',
                    description: "Pizza but bread form",
                    protein: 1,
                    sugar: 2,
                    carbs: 3
                },

                {
                    category: 'Appetizers',
                    meal: 'Chark',
                    description: "Chark is much meat sliced on tree",
                    protein: 4,
                    sugar: 7,
                    carbs: 3
                },
                {
                    category: 'Appetizers',
                    meal: 'Teriyaki pineapple meatballs',
                    description: "We don't really know what this is",
                    protein: 15,
                    sugar: 8,
                    carbs: 2
                },

                // Main Courses
                {
                    category: 'Main Courses',
                    meal: 'Pizza',
                    description: "Pizza is a round bliss",
                    protein: 5,
                    sugar: 10,
                    carbs: 15
                },

                {
                    category: 'Main Courses',
                    meal: 'Palt',
                    description: "Palt is a typical norbotten helvete",
                    protein: 9,
                    sugar: 4,
                    carbs: 9
                },

                {
                    category: 'Main Courses',
                    meal: 'Pasta',
                    description: "Pasta is good.",
                    protein: 5,
                    sugar: 10,
                    carbs: 20
                },

                // Desserts
                {
                    category: 'Desserts',
                    meal: 'Creme',
                    description: "Creme and sugar",
                    protein: 5,
                    sugar: 10,
                    carbs: 23
                },
                {
                    category: 'Desserts',
                    meal: 'Whole plum in champagne',
                    description: "Whole plum in champagne.",
                    protein: 0,
                    sugar: 10,
                    carbs: 2
                },

                {
                    category: 'Desserts',
                    meal: 'Gelato',
                    description: "Gelato is a ice cream",
                    protein: 5,
                    sugar: 50,
                    carbs: 20
                }, 
            ]


        };

    }
}).mount('#app');