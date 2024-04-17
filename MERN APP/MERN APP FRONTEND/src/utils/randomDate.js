

/**

 * @param {Date} start 
 * @param {Date} end 
 * @returns {Date}random date between the start and end
 */
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export default randomDate;
