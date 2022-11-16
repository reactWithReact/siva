# Spotlight

This Repository contains both the frontend and backend code for the Spotlight

## Preview

To start the server

```bash
  cd backend
```


```bash
  npm start
```


To start the client

```bash
  cd frontend
```

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

your mongodb access username in:
`MONGO_USER`

your mongodb access passoword in:
`MONGO_PASSWORD`

## FAQ regarding State management and MVVM architechure

#### Q1. Why is your code more complicated than it should be ?

Well I know I've made so many files and doing things in a very indirect manner.
And I completely understand the reason for why any of you would find it that way

But the reason for that is because I'm trying to make it easier for all of us to make changes, add features, remove things,
without breaking anything

#### Q2. Why so many files ?

There are mainly two reasons :

- I'm writing the whole components for table, the profile picture component, the dropdowns, the multiselect option and all that stuff (no libraries)

- The second reason is because I'm following this thing called "seperation of concerns" and the reason why is this important because as the app grows we might fetch the data in a different way, it could be aggregation pipline, maybe GraphQL who knows ? But If we write all the logic in one file we might end up breaking things that were not supposed to be touched like the table for showing data

#### Q3. Why not pass props instead of using Context API ?

Well that's a valid point, and I think I, myself have used it in places that I might have to change
     
But the Problem I'm trying to avoid here is of 'prop drilling'.
why ?

Because it can get really complicated when we have more components and even then we can only pass the props from parents to children what about pressing a button at one place and changing the data in a component that is way away in the hirerchy of components ?
(I know there are a few hacks to pass data from children to parents but that leads to undesirable bugs in long run, trust me)

With the help of context API we can easily access the data at any place with the help of useContext hook

We don't have to worry about propdrilling all the state like which page we're currently on, how many records are we showing, WAS THERE ANY PROBLEM WITH DATA FETCHING ?, all the things can be accessed anywhere we want with much ease

Note: There is a slight downside with Context that we need to do some optimizations but It's not a big deal compared to the problem it solves

#### Q4. Why useReducer Instead of useState ?

I know useState is extremely useful hook for managing state but it's not meant for handling complex data like a big object that only needs to be modified by a tiny bit at a time instead of whole

As a matter of fact useState uses useReducer under the hood for handling the state

What useReducer allows us to do is dispatch 'actions'  
dispatch is a function provided by useReducer ( you can call it the setState of useReducer hook).  
 but instead of taking the value for new state it takes an action, now an action can be practically anything we want, it could be an object containing information like what needs to be changed by what.

```javascript
For eg. dispatch({"type": "pageNo", "value": 2 })
```

This would mean we want to change the pageNo by 2

the reducer function in the useReducer hook can have a switch case
where

```javascript
 const reducer = (state,action) =>{
   switch(action.type){{
      case "pageNo":
        return {...state,pageNo:action.value};
      case "customerData":
        return {...state,customerData:action.value}
      default:
        return state;
   }
 }
```

the 'state' here is the previous value for the whole state and the 'action' is the 'argument' passed by the dispatch function

Now this switch case approach works just fine but as we add more state you can notice the switch statement getting longer and longer and eventually it'll become the very problem it was aiming to solve

#### Q5. What exactly are you passing as in the dispatch method right now ?

what I'm doing is kinda crazy and complicated but it scales beautifully

This is what I'm passing inside a dispatch:-

```javascript
dispatch(Action_SetPage(2));
```

I'm passing a function,  
what does this function do ? Notice carefully :-

```javascript
const Action_SetPage = (pageNo) => {
  return (state) => {
    return { ...state, pageNo: pageNo };
  };
};
```

I'm actually calling the Action_SetPage() function inside the disptach so the value passed in the dispatch is the return value of the Action_SetPage() function

And the return value is itself an anonymous function, this function has access to the value we wanted to change (pageNo) as it's inside the Action_SetPage()

Now look :-

```javascript
const reducer = (state, action) => {
  return action(state);
};
```

The important thing is the anonymous function has access to the "Entire Previous state" of the app as this function is passed by the dispatch it can be called inside the reducer by passing the previous state as the argument

And then whatever value it'll return will become the new state

#### Q6. what problems were solved above ?

There are a lot of things that have been solved here:-

- We can make changes to the entire state of the app from anywhere we want as we can just pass the disptach method to any components and perform any action
- The reducer function doesn't get bloated unlike the switch case statement, we can add any number of actions we want like sorting the data filtering the data, removing the data or anything it'll still remain just three lines of code !
- Easy to debug, any problem that we might have with changing the data can be very easily be tracked down just by looking at the actions
- Easy to write test for, as for now our app is pretty simple but as it'll grow we need to write unit test, e2e test, integreation tests as manually testing the app every time we add a new feature can lead to hidden bugs
- Declerative UI : The UI components will become extremely light weight and it'll become easier to see "what the UI is doing ?" instead of "how it's doing that ?"
- Easy to collaborate: With this approach one person can be working on handling the APIs, other could be handling Graphs, someone else could be handling the styling, someone could be hanlding the logic for sorting, and modifying the data. And all of us can work peacefully without breaking each other's work !

#### Q7. when to not use the Context API and useReducer ?

Now yes not every tool needs to do every single job, It's a good idea to avoid making something a global state if : -

- The state doesn't affects other components like, the opening the closing of a dropdown needs a state but that state doesn't needs to be passed around everywhere like It's very unlikely to toggle a button for any where outside the children or the dropdown itself. BUT clicking on any options can lead to changes outside the dropdown and that needs to be done via a dispatch
- When we're making reusable components, when we're making components like tables, dropdowns (things that we'll use more than one place), we need to pass props, AND YES I'VE MADE THIS MISTAKE, but the right thing would be to avoid using the data directly from the context as now we cannot use this table to show some different data. so I'll fix my mistake and pass the actions as props. BUT for components like selectManager or selectPage we're only going to use those components only for once so it would be a prefect place to get the data from context and import the Actions directly

### At the end of the day I'm trying my best to create the perfect codebase for our team to collaborate properly to add new features without any headaches of debugging. And the MVVM architechure is the best way to achieve that.

## Handling APIs ?

#### I'm using axios instead of fetch as there isn't really that much of a differnce compared to longer syntax and it seems like everyone is using this so that's fine.

#### Q1. How am I handling APIs ?

Now most of the changes in the state of our app will be done by the data that comes from the APIs so It's really important to understand how they work with useReducer and context API

As I mentioned earlier that any changes to the shared state can be done by dispatching an action but any API request made using fetch or axios or anything is asynchronous,

And there is a slight problem that the dispatch (just like setState) cannot take an asynchronous functions or promises as arguments as the reducer doesn't awaits for them and what will end up happening, is the axios request will simply return a promise in pending state, and all the data that was being accessed via the useContext will become undefined.

To avoid this issue we need a seperate asnyc function for calling the API and when we get a response (or when the promise is either resolved or rejected) only then we'll dispatch the action for setting the data accordingly.

## Styling ?

### I'm using styled components instead of plain CSS, Why ?

Because

- styled components allow us to avoid the problem of classes and conditional styling
- with styled-components we can just pass props! and with the help of props we can use those props as a boolean to do one styling over the other or directly take things like width or gradient and anything we want
- Easier to understand JSX: it might have happend to all of you once as you're writing divs with classes card, card-container, card-cover and what not but at the end of the day they are divs and difficult to keep track of but with styled components we can just write them like JSX components

#### CSS

```html
<div className="card-container">
  <div className="card-cover">
    <div className="card">Card Data</div>
  </div>
</div>
```

#### Styled-Components

```html
<CardContainer>
  <CardCover>
    <Card> Card Data </Card>
  </CardCover>
</CardContainer>
```

- it also comes with sass like syntax which makes it very easy to use pseudo selectors and classes

#### CSS

```css
.button {
  color: "red";
  font-size: "1.2rem";
  border-radius: "0.5rem";
}
.button:hover {
  color: "white";
}
.button::after {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: "50%";
}
```

#### Styled-components

```css
const Button = styled.button`
  color:"red";
  font-size:"1.2rem";
  border-radius:"0.5rem";

  &: hover {
    color:"white";
  }
  &::after{
    content:"";
    width:10px;
    height:10px;
    border-radius:"50%";
  }

`
```

#### I think I'm sounding like a salesman right now 😅 forcing you to use styled-components but at the end you should use what you're comfortable with.

But even if you're using just css, I'd adivise to use css modules as they come along with 'create-react-app' so you don't have to install anything and they also prevent side-effects caused by the cascading nature of the CSS
