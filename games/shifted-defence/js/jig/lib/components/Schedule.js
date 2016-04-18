define([], function() {
  var Schedule = function() {
    this._schedule = {
      every: [],
      after: []
    };
  };
  
  /**
   * Execute once after time
   */
  Schedule.prototype.after = function(time, callback) {
    var task = {
      time: time,
      callback: callback
    };
    
    this._schedule['after'].push(task);
    
    return task;
  };
  
  /**
   * Create repeated task
   */
  Schedule.prototype.every = function(time, callback) {
    var task = {
      time: time,
      prevCall: 0,
      callback: callback
    };
    
    this._schedule['every'].push(task);
    
    return task;
  };
  
  /**
   * Kill scheduled task
   */
  Schedule.prototype.killTask = function(task) {
    for(var s in this._schedule) {
      var index;
      if((index = this._schedule[s].indexOf(task)) !== -1) {
        this._schedule[s].splice(index, 1);
      }
    }
  };
  
  /**
   * Update function
   */
  Schedule.prototype.update = function(delta) {
    var i;
    
    for(i in this._schedule['every']) {
      var task = this._schedule['every'][i];
      
      if(task.prevCall >= task.time) {
        task.callback.call(this);
        task.prevCall = 0;
      } else {
        task.prevCall += delta;
      }
    }
    
    for(i in this._schedule['after']) {
      var task =this._schedule['after'][i];
      
      if(task.time <= 0) {
        task.callback.call(this);
        this.killTask(task);
      } else {
        task.time -= delta;
      }
    }
  };
  
  return Schedule;
});
