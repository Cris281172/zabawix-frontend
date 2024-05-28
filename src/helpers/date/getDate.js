const getDate = (milliseconds = 0) => {
     if(milliseconds === 0){
          return new Date().toISOString();
     }
     let currentDate = new Date();
     currentDate.setTime(currentDate.getTime() + (milliseconds));
     return currentDate.toISOString();
}

export default getDate;