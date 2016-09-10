import {observable} from 'mobx';

// class Timer {
//     constructor() {
//         extendObservable(this, {
//             start: Date.now(),
//             current: Date.now(),
//             get elapsedTime() {
//                 return (this.current - this.start) + "seconds"
//             },
//             tick: action(function() {
//                 this.current = Date.now()
//             })
//         })
//     }
// }
// class Timer {
//     @observable start = Date.now();
//     @observable current = Date.now();

//     @computed get elapsedTime() {
//         return (this.current - this.start) + "seconds"
//     }

//     @action tick() {
//         this.current = Date.now()
//     }
// }

// export default Timer;


// @observable todos = [
//     { title: "Spoil tea", completed: true },
//     { title: "Make coffee", completed: false }
// ];

// class UserStore {

// var todos = observable([
//     { title: "Spoil tea", completed: true },
//     { title: "Make coffee", completed: false }
// ]);

//   constructor() {
//     this.me = null;
//   }

// }

// const userStore = new UserStore();

// export default userStore;
// export { UserStore };