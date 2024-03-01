Vue.createApp({

    methods: {
        updateSelectedFood(category) {
            if (category !== 'Appetizers') this.selectedAppetizer = '';
            if (category !== 'Main Courses') this.selectedMainCourse = '';
            if (category !== 'Desserts') this.selectedDessert = '';
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
                    protein: 5,
                    sugar: 10,
                    carbs: 2
                },

                {
                    category: 'Appetizers',
                    meal: 'Chark',
                    description: "Chark is much meat sliced on tree",
                    protein: 5,
                    sugar: 10,
                    carbs: 2
                },
                {
                    category: 'Appetizers',
                    meal: 'Teriyaki pineapple meatballs',
                    description: "We don't really know what this is",
                    protein: 5,
                    sugar: 10,
                    carbs: 2
                },

                // Main Courses
                {
                    category: 'Main Courses',
                    meal: 'Pizza',
                    description: "Pizza is a round bliss",
                    protein: 5,
                    sugar: 10,
                    carbs: 2
                },

                {
                    category: 'Main Courses',
                    meal: 'Palt',
                    description: "Palt is a typical norbotten helvete",
                    protein: 5,
                    sugar: 10,
                    carbs: 2
                },

                {
                    category: 'Main Courses',
                    meal: 'Pasta',
                    description: "Pasta is good.",
                    protein: 5,
                    sugar: 10,
                    carbs: 2
                },

                // Desserts
                {
                    category: 'Desserts',
                    meal: 'Creme',
                    description: "Creme and sugar",
                    protein: 5,
                    sugar: 10,
                    carbs: 2
                },
                {
                    category: 'Desserts',
                    meal: 'Whole plum in champagne',
                    description: "Whole plum in champagne.",
                    protein: 5,
                    sugar: 10,
                    carbs: 2
                },

                {
                    category: 'Desserts',
                    meal: 'Gelato',
                    description: "Gelato is a ice cream",
                    protein: 5,
                    sugar: 10,
                    carbs: 2
                }, 
            ]


        };

    }
}).mount('#app');