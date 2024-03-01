Vue.createApp({
    methods: {
        //metod för att räkna cirkel
    },
    computed: {

    },
    data() {
        return {
            title: "Euclidian foods",
            appetizers:  [
                {
                    meal: 'Bruschetta',
                    carbs: 2,
                    protein: 5,
                    sugar: 10
                },
                {
                    meal: 'Chark',
                    carbs: 2,
                    protein: 5,
                    sugar: 10
                },
                {
                    meal: 'Teriyaki pineapple meatballs',
                    carbs: 2,
                    protein: 5,
                    sugar: 10
                },
            ],
            mainCourses:  [
                {
                    meal: 'Pizza',
                    carbs: 2,
                    protein: 5,
                    sugar: 10
                },
                {
                    meal: 'Palt',
                    carbs: 2,
                    protein: 5,
                    sugar: 10
                },
                {
                    meal: 'Pasta',
                    carbs: 2,
                    protein: 5,
                    sugar: 10
                },
            ],
            deserts:  [
                {
                    meal: 'Creme',
                    carbs: 2,
                    protein: 5,
                    sugar: 10
                },
                {
                    meal: 'Whole plum in champagne',
                    carbs: 2,
                    protein: 5,
                    sugar: 10
                },
                {
                    meal: 'Gelato',
                    carbs: 2,
                    protein: 5,
                    sugar: 10
                },
            ]

        };
    }
}).mount('#app');