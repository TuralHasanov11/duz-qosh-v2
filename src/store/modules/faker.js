const categories = [
    {id:1, name:"category 1", numberOfTasks:2},
    {id:2, name:"category 2", numberOfTasks:3},
    {id:3, name:"category 3", numberOfTasks:4}
];

const tasks = [
    { id:1, caption:"Caption 1", category:{id:1, name:"Category 1"}, price:11, sharer:{firstName:"Sharer name", lastName:"Sharer lastname"}, deadline:"2021-08-08" },
    { id:2, caption:"Caption 2", category:{id:2, name:"Category 2"}, price:12, sharer:{firstName:"Sharer name 2", lastName:"Sharer lastname 2"}, deadline:"2021-08-08" },
    { id:3, caption:"Caption 3", category:{id:3, name:"Category 3"}, price:13, sharer:{firstName:"Sharer name 3", lastName:"Sharer lastname 3"}, deadline:"2021-08-08" },
    { id:4, caption:"Caption 4", category:{id:4, name:"Category 4"}, price:14, sharer:{firstName:"Sharer name 4", lastName:"Sharer lastname 4"}, deadline:"2021-08-08" },
    { id:5, caption:"Caption 5", category:{id:5, name:"Category 5"}, price:15, sharer:{firstName:"Sharer name 5", lastName:"Sharer lastname 5"}, deadline:"2021-08-08" },
    { id:6, caption:"Caption 6", category:{id:6, name:"Category 6"}, price:16, sharer:{firstName:"Sharer name 6", lastName:"Sharer lastname 6"}, deadline:"2021-08-08" },
];


export default {
    categories,
    tasks
}