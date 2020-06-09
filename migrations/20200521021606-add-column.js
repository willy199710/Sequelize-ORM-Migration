'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
	return Promise.all([
		queryInterface.addColumn(
		  'Test',  // table name
		  'Todo',  // column name
		  {
			  type: Sequelize.BOOLEAN  // column type
		  }
		),
		queryInterface.addColumn(
		  'Test',
		  'grade',
		  {
			  type: Sequelize.STRING
		  }
		)
	]);
	
	
  },
  
  down: (queryInterface, Sequelize) => {
	return Promise.all([
		queryInterface.removeColumn('Test', 'grade'),
		queryInterface.removeColumn('Test', 'Todo')
	]);
  }
};