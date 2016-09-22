import React from 'react';

class User {
    
    constructor(title, todo, height) {
        this.title = title;
        this.todo = todo;
        this.height = height;
    }
  
    addDays(nDays) {
    // Increase "this" date by n days
    // ...
  }

  getDay() {
    return this._day;
  }

}

export default User;